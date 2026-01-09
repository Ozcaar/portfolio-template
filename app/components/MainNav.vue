<template>
  <nav :class="navShell">

    <!-- Desktop -->
    <div :class="[container, 'hidden md:flex items-center justify-between py-4']">
      <NuxtLink :to="{ path: localePath('/') }" :class="brandLink">
        {{ cfg.public.name }}
      </NuxtLink>

      <div class="flex items-center gap-8">
        <NuxtLink v-for="item in navItems" :key="item.key" :to="item.to" :aria-label="t(item.labelKey)"
          :class="navLink">
          {{ t(item.labelKey) }}
        </NuxtLink>

        <LanguageSwitcher />
      </div>
    </div>

    <!-- Mobile -->
    <div :class="[container, 'navbar py-4 md:hidden']">

      <!-- Menu button -->
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <Icon name="lucide:menu" size="24" />
          </div>

          <ul tabindex="-1" :class="mobileMenu">
            <li v-for="item in navItems" :key="item.key">
              <NuxtLink :to="item.to" :class="mobileLink">
                {{ t(item.labelKey) }}
              </NuxtLink>
            </li>

            <li>
              <a :href="switchLocalePath(locale === 'en' ? 'es' : 'en')" :class="mobileLang">
                <Icon name="lucide:languages" size="20" />
                <span class="ml-2">
                  {{ locale === 'en' ? 'ESPAÑOL' : 'ENGLISH' }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <NuxtLink :to="{ path: localePath('/') }" :class="brandLink" class="navbar-center text-center">
        {{ cfg.public.name }}
      </NuxtLink>

      <!-- Hidden (balance) -->
      <div class="navbar-end invisible">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <Icon name="lucide:menu" size="24" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const cfg = useRuntimeConfig()

// Tailwind presets
const navShell =
  'fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md'

const container = 'mx-auto max-w-7xl px-6'

const logoClass = 'text-2xl font-bold font-poppins text-gradient'

const brandLink =
  'text-2xl font-bold font-poppins text-foreground transition-smooth hover:text-primary'

const navLink = 'text-sm font-medium transition-smooth hover:text-primary'

const mobileMenu =
  'menu menu-md dropdown-content z-1 mt-3 w-40 rounded-box bg-background/95 p-2 text-right text-base-100 shadow'

const mobileLink = 'text-right hover:bg-base-100/5'

const mobileLang =
  'mt-0.5 flex w-full items-center justify-start rounded-(--radius-field) ' +
  'border-2 border-base-100/70 px-2.5 py-1.5 text-md text-base-100 ' +
  'transition-smooth hover:bg-base-100/5 hover:shadow-lg hover:shadow-base-100/10'


const navItems = computed(() => [
  {
    key: 'projects',
    labelKey: 'common.nav.projects',
    to: { path: localePath('/'), hash: '#projects' },
  },
  {
    key: 'about',
    labelKey: 'common.nav.about',
    to: { path: localePath('/about') },
  },
  {
    key: 'contact',
    labelKey: 'common.nav.contact',
    to: { path: localePath('/contact') },
  },
])
</script>
