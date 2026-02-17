// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    formspreeEndpoint: process.env.FORMSPREE_ENDPOINT,
    public: {
      name: process.env.NAME || 'Your Name',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      contentEditorEnabled: process.env.NUXT_PUBLIC_CONTENT_EDITOR_ENABLED === 'true',
      sentry: {
        dsn: process.env.SENTRY_DSN,
      },

    }
  },

  compatibilityDate: '2025-07-15',
  ssr: false,

  app: {
    baseURL: '/',
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
  },

  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/**',
          '/api',
          '/api/**',
          '/_nuxt',
        ]
      }
    ],
    sitemap: `${process.env.NUXT_PUBLIC_SITE_URL}/sitemap.xml`,
  },

  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    gzip: true,
    autoLastmod: true,
    urls: async () => {
      return [
        {
          loc: '/',
          priority: 1.0,
          changefreq: 'weekly'
        },
        {
          loc: '/about',
          priority: 0.9,
          changefreq: 'weekly'
        },
        {
          loc: '/contact',
          priority: 0.8,
          changefreq: 'monthly'
        }
      ]
    }
  }
  ,

  routeRules: {
    // '/': { redirect: '/x' },
  },

  devtools: { enabled: true },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: ['./app/assets/styles/app.css'],

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@sentry/nuxt/module',
  ],

  fonts: {
    families: [{ name: 'Inter', provider: 'google' }, { name: 'Geist Mono', provider: 'google' }, { name: 'Poppins', provider: 'google' }],
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    }
  },

  nitro: {
    preset: 'cloudflare_pages',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix',
    seo: true,
    lazy: true,
    langDir: 'locales/',
    locales: [
      { code: 'es', iso: 'es-MX', file: 'es.json', name: 'Español' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    vueI18n: './i18n.config.ts'
  },
})