export type GithubSummary = {
  user: {
    login: string
    name: string | null
    avatarUrl: string
    url: string
    createdAt: string
  }
  stats: {
    followers: number
    following: number
    publicRepos: number
    totalStars: number
    totalForks: number
    yearsCoding: number
  }
  languages: {
    sampledRepos: number
    totalBytes: number
    top: Array<{
      name: string
      bytes: number
      percent: number
    }>
  }
  activity: {
    windowDays: number
    totalEvents: number
    commits: number
    pullRequests: number
    issues: number
  }
  topRepos: Array<{
    name: string
    url: string
    description: string | null
    language: string | null
    stars: number
    forks: number
    issues: number
    updatedAt: string
  }>
}

export const useGithubSummary = () => {
  return useFetch<GithubSummary>("/api/github/summary", {
    server: true,
    retry: 0,
  })
}
