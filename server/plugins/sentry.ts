import * as Sentry from "@sentry/node"

export default defineNitroPlugin(() => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  })
})
