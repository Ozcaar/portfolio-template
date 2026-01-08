<template>
  <nav :class="navShell">
    <div :class="container">
      <NuxtLink :to="{ path: localePath('/') }" :class="brandLink">
        Oscar López
      </NuxtLink>

      <NuxtLink :to="{ path: localePath('/') }" :aria-label="t('common.nav.backToHome')" :class="backLink">
        <Icon name="lucide:arrow-left" size="16" />
        {{ t('common.nav.backToHome') }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Tailwind presets
const navShell =
  'fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md'

const container =
  'mx-auto flex max-w-6xl items-center justify-between px-6 py-4'

const brandLink =
  'text-2xl font-bold font-poppins text-foreground transition-smooth hover:text-primary'

const backLink =
  'flex items-center gap-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground'
</script>
