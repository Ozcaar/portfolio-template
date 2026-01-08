import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "../../modules/nuxt-invirtual-ui/components/**/*.{js,vue,ts}"
  ],
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
} satisfies Config