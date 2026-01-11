import * as Sentry from "@sentry/nuxt"

const config = useRuntimeConfig()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const translations = {
  es: {
    required: "El {field} es requerido.",
    invalid: "El {field} no es válido.",
    tooLong: "El {field} es demasiado largo.",
    validationErr: "Validación fallida.",
    statusMessage: "Error al enviar el mensaje.",

  },
  en: {
    required: "The {field} is required.",
    invalid: "The {field} is invalid.",
    tooLong: "The {field} is too long.",
    validationErr: "Validation failed.",
    statusMessage: "Error sending the message.",
  },
};

type Language = 'es' | 'en';
type TranslationKeys = 'required' | 'invalid' | 'tooLong' | 'validationErr' | 'statusMessage';
type ContactBody = {
  lang: Language
  name: string
  email: string
  subject: string
  message: string
  website?: string
  startedAt: number
}

export async function logError(payload: Record<string, any>, err?: unknown) {
  Sentry.withScope((scope) => {
    scope.setTag("source", "contact-form")

    if (payload?.errorId) {
      scope.setTag("trackId", payload.errorId)
    }

    scope.setContext("contact", payload)

    if (err instanceof Error) {
      Sentry.captureException(err)
    } else {
      Sentry.captureMessage("Contact form error")
    }
  })
}

function normalizeString(v: unknown) {
  if (typeof v !== "string") return ""
  return v.trim().replace(/\s+/g, " ")
}

async function hashEmail(email: string): Promise<string> {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.trim().toLowerCase()))
    .then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    });
}

function getTranslation(lang: Language = 'en', key: TranslationKeys, field: string): string {
  let translation = translations[lang][key];
  return translation?.replace("{field}", field);
}

function validate(body: ContactBody) {
  const errors: Record<string, string> = {}
  const lang: Language = body.lang === 'es' ? 'es' : 'en';

  const name = normalizeString(body.name)
  const email = normalizeString(body.email).toLowerCase()
  const subject = normalizeString(body.subject)
  const message = normalizeString(body.message)

  if (!name) errors.name = getTranslation(lang, 'required', lang === 'es' ? 'nombre' : 'name')
  if (!email) errors.email = getTranslation(lang, 'required', lang === 'es' ? 'email' : 'email')
  else if (!EMAIL_RE.test(email)) errors.email = getTranslation(lang, 'invalid', lang === 'es' ? 'email' : 'email')

  if (!subject) errors.subject = getTranslation(lang, 'required', lang === 'es' ? 'asunto' : 'subject')
  if (!message) errors.message = getTranslation(lang, 'required', lang === 'es' ? 'mensaje' : 'message')

  if (name.length > 120) errors.name = getTranslation(lang, 'tooLong', lang === 'es' ? 'nombre' : 'name')
  if (email.length > 254) errors.email = getTranslation(lang, 'tooLong', lang === 'es' ? 'email' : 'email')
  if (subject.length > 150) errors.subject = getTranslation(lang, 'tooLong', lang === 'es' ? 'asunto' : 'subject')
  if (message.length > 6000) errors.message = getTranslation(lang, 'tooLong', lang === 'es' ? 'mensaje' : 'message')

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: { name, email, subject, message },
  }
}

export default defineEventHandler(async (event) => {

  const body = (await readBody<ContactBody>(event)) ?? {}
  const lang: Language = body.lang === 'es' ? 'es' : 'en';

  const result = validate(body)
  if (!result.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: getTranslation(lang, 'validationErr', ''),
      data: { errors: result.errors },
    })
  }

  // Honeypot
  if (body.website) {
    return { ok: true }
  }
  if (Date.now() - body.startedAt < 3000) {
    return { ok: true }
  }

  const endpoint = config.formspreeEndpoint as string;

  try {
    // throw new Error("Simulated error for testing.");
    await $fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        ...result.value,
        source: "portfolio",
      },
      timeout: 10_000,
    })

    return { ok: true }
  } catch (err: any) {
    const errorId = crypto.randomUUID()

    const status = err?.response?.status ?? err?.status ?? 0
    const statusText = err?.response?.statusText ?? err?.statusText

    await logError({
      ts: new Date().toISOString(),
      errorId,
      route: event.path,
      upstream: "formspree",
      upstreamStatus: status,
      upstreamStatusText: statusText,
      message: err?.message,
      ip:
        getRequestHeader(event, "x-forwarded-for") ??
        getRequestHeader(event, "x-real-ip"),
      ua: getRequestHeader(event, "user-agent"),
      email: await hashEmail(result.value.email),
    },
      err
    );

    await Sentry.flush(2000)

    throw createError({
      statusCode: 502,
      statusMessage: getTranslation(lang, 'statusMessage', ''),
      data: { trackId: errorId },
    })
  }
})
// TODO: Implement sentry