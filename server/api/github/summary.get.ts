type GhUser = {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
  created_at: string
}

type GhRepo = {
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  updated_at: string
  pushed_at: string
  archived: boolean
  fork: boolean
  languages_url: string
}

type GhLangs = Record<string, number>

type GhEvent = {
  type: string
  created_at: string
  payload?: any
}

type GhFetchError = {
  url: string
  statusCode: number
  message: string
  data?: any
  rateLimit?: {
    limit?: string
    remaining?: string
    reset?: string
  }
}


const GH_API = "https://api.github.com"

const ALLOWED_LANGUAGES = new Set([
  "Java",
  // "TypeScript",
  "JavaScript",
  "C#",
  // "Python",
  "Vue",
])

const EXCLUDED_LANGUAGES = new Set([
  "CSS",
  "SCSS",
  "HTML",
])

async function ghFetch<T>(url: string, token?: string): Promise<T> {
  try {
    return await $fetch<T>(url, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
  } catch (e: any) {
    throw toGhFetchError(url, e)
  }
}

function toGhFetchError(url: string, e: any): GhFetchError {
  const statusCode =
    e?.statusCode ||
    e?.response?.status ||
    e?.status ||
    500

  const message =
    e?.message ||
    e?.response?.statusText ||
    e?.message ||
    "GitHub request failed"

  const headers = e?.response?.headers
  const rateLimit = headers
    ? {
      limit: headers.get?.("x-ratelimit-limit"),
      remaining: headers.get?.("x-ratelimit-remaining"),
      reset: headers.get?.("x-ratelimit-reset"),
    }
    : undefined

  return {
    url,
    statusCode,
    message,
    data: e?.data,
    rateLimit,
  }
}

function throwUpstream(step: string, err: any) {
  const e = err as GhFetchError

  const isAuth = e.statusCode === 401
  const isForbidden = e.statusCode === 403
  const isNotFound = e.statusCode === 404

  const message =
    isAuth ? "GitHub: token inválido o faltante" :
      isForbidden ? "GitHub: acceso denegado (rate limit o permisos)" :
        isNotFound ? "GitHub: recurso no encontrado" :
          "No se pudo consultar GitHub"

  throw createError({
    statusCode: 502,
    message,
    data: {
      step,
      upstream: e,
    },
  })
}

// Concurrency limiter
function createLimiter(concurrency = 6) {
  let active = 0
  const queue: Array<() => void> = []

  const next = () => {
    active--
    queue.shift()?.()
  }

  return async function limit<T>(fn: () => Promise<T>): Promise<T> {
    if (active >= concurrency) {
      await new Promise<void>((resolve) => queue.push(resolve))
    }
    active++
    try {
      const res = await fn()
      return res
    } finally {
      next()
    }
  }
}

function daysBetween(a: Date, b: Date) {
  const ms = Math.abs(a.getTime() - b.getTime())
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

export default defineEventHandler(async (event) => {
  const {
    username = process.env.GH_USERNAME,
    top = "4",
    langRepos = "20",
    activityDays = "30",
  } = getQuery(event) as {
    username?: string
    top?: string
    langRepos?: string
    activityDays?: string
  }

  const topN = clamp(parseInt(top, 10) || 6, 1, 12)
  const langReposN = clamp(parseInt(langRepos, 10) || 20, 5, 50)
  const activityWindowDays = clamp(parseInt(activityDays, 10) || 30, 7, 90)

  const token = process.env.GH_TOKEN
  const limit = createLimiter(6)

  const warnings: Array<{ step: string; repo?: string; error: any }> = []

  try {

    let user: GhUser = {} as GhUser
    try {
      user = await ghFetch<GhUser>(`${GH_API}/user`, token)
    } catch (e) {
      throwUpstream("user", e)
    }

    // Repos
    const perPage = 100
    const pages = 2

    let allRepos: GhRepo[] = []

    try {
      const repoPages = await Promise.all(
        Array.from({ length: pages }, (_, i) =>
          ghFetch<GhRepo[]>(
            `${GH_API}/user/repos?per_page=${perPage}&page=${i + 1}&sort=updated`,
            token
          )
        )
      )

      allRepos = repoPages.flat().filter((r) => !r.fork && !r.archived)
    } catch (e) {
      throwUpstream("repos", e)
    }

    const totalStars = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
    const totalForks = allRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0)

    // Top repos
    const topRepos = [...allRepos]
      .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (b.forks_count - a.forks_count))
      .slice(0, topN)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.updated_at,
        issues: r.open_issues_count,
      }))

    // Languages
    const langReposPick = [...allRepos]
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, langReposN)

    const langTotals: GhLangs = {}

    const results = await Promise.allSettled(
      langReposPick.map((repo) =>
        limit(async () => {
          const langs = await ghFetch<GhLangs>(repo.languages_url, token)
          return { repo: repo.full_name, langs }
        })
      )
    )

    for (const r of results) {
      if (r.status === "rejected") {
        warnings.push({ step: "languages", error: r.reason })
        continue
      }

      const { langs } = r.value
      for (const [lang, bytes] of Object.entries(langs)) {
        // if (EXCLUDED_LANGUAGES.has(lang)) continue
        if (!ALLOWED_LANGUAGES.has(lang)) continue
        langTotals[lang] = (langTotals[lang] || 0) + (bytes || 0)
      }
    }

    const totalLangBytes = Object.values(langTotals).reduce((a, b) => a + b, 0) || 0

    const topLanguages = Object.entries(langTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, bytes]) => ({
        name: lang,
        bytes,
        percent: totalLangBytes ? Math.round((bytes / totalLangBytes) * 100) : 0,
      }))

    // Recent activity
    let events: GhEvent[] = {} as GhEvent[]
    try {
      events = await ghFetch<GhEvent[]>(
        `${GH_API}/users/${username}/events?per_page=100`,
        token
      )
    } catch (e) {
      throwUpstream("events", e)
    }

    const now = new Date()
    const windowStart = new Date(now.getTime() - activityWindowDays * 24 * 60 * 60 * 1000)

    const recent = events.filter((e) => new Date(e.created_at) >= windowStart)

    const activity = {
      windowDays: activityWindowDays,
      totalEvents: recent.length,
      commits: 0,
      pullRequests: 0,
      issues: 0,
    }

    for (const e of recent) {
      if (e.type === "PushEvent") {
        const size = e.payload?.size ?? 0
        activity.commits += size
      } else if (e.type === "PullRequestEvent") {
        activity.pullRequests += 1
      } else if (e.type === "IssuesEvent") {
        activity.issues += 1
      }
    }

    // Years coding
    const yearsCoding = Math.max(
      0,
      Math.floor(daysBetween(now, new Date(user.created_at)) / 365)
    )

    // Cache CDN for 5 minutes, edge for 30 minutes
    setHeader(event, "Cache-Control", "public, max-age=300, s-maxage=1800")

    return {
      user: {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        url: user.html_url,
        createdAt: user.created_at,
      },
      stats: {
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        totalStars,
        totalForks,
        yearsCoding,
      },
      languages: {
        sampledRepos: langReposPick.length,
        totalBytes: totalLangBytes,
        top: topLanguages,
      },
      activity,
      topRepos,
    }
  } catch (e: any) {
    throw createError({
      statusCode: 502,
      message: e.message,
      data: e?.data || String(e),
    })
  }
})
