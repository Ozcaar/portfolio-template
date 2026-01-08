<template>
  <div class="overflow-y-auto">

    <!-- Card Header -->
    <div class="mb-2 flex items-center justify-between font-poppins">
      <h3 class="text-base font-semibold text-primary">
        {{ t('home.hero.openSource.title') }}
      </h3>

      <NuxtLink :to="socialLinksContent.github" target="_blank" :class="headerLink">
        {{ t('common.buttons.viewOnGitHub') }}
        <Icon name="lucide:external-link" size="12" />
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center">
      <span class="loading loading-dots loading-xl text-secondary"></span>
    </div>

    <!-- Error -->
    <div v-else-if="error" :class="errorBox">
      {{ t('home.hero.openSource.error') || 'Cannot load GitHub.' }}
    </div>

    <!-- Ready -->
    <div v-else-if="ready">

      <!-- Stats -->
      <div class="mb-4 grid grid-cols-2 gap-3">
        <div v-for="stat in statsItems" :key="stat.key" :class="statCard">
          <p :class="statLabel">
            <Icon v-if="stat.icon" :name="stat.icon" size="12" />
            {{ stat.label }}
          </p>

          <p :class="[statValue, stat.valueClass]">
            {{ stat.value }}
          </p>
        </div>
      </div>

      <!-- Top Languages -->
      <div class="flex-1 space-y-2">
        <p :class="subHeader">
          <Icon name="lucide:code-xml" size="12" />
          {{ t('home.hero.openSource.topLanguages') }}
        </p>

        <p v-if="topLanguages.length === 0" class="text-xs text-muted-foreground">
          {{ t('home.hero.openSource.noLanguages') || 'Sin datos de lenguajes.' }}
        </p>

        <div v-else class="space-y-2">
          <div v-for="lang in topLanguages" :key="lang.name" class="space-y-1">
            <div class="flex justify-between text-xs">
              <span class="text-foreground">{{ lang.name }}</span>
              <span class="text-muted-foreground">{{ lang.percent }}%</span>
            </div>

            <div class="h-1.5 overflow-hidden rounded-full bg-card/50">
              <div class="h-full rounded-full transition-all duration-500" :class="getLangColorClass(lang.name)"
                :style="{ width: barWidth(lang.percent * 2) }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- fallback -->
    <div v-else class="text-xs text-muted-foreground">
      {{ t('home.hero.openSource.loading') || 'Loading...' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SocialLinks as SocialLinksType } from '~/content/content.schema'

const { socialLinks: socialLinksContent } = useContent<{ socialLinks: SocialLinksType }>()

const { t } = useI18n()
const { data, pending, error } = useGithubSummary()

// Tailwind class presets
const headerLink =
  'flex items-center gap-1 text-xs text-primary transition-smooth hover:underline'

const errorBox =
  'mt-6 rounded-lg border border-border/50 bg-card/50 p-3 text-center text-sm text-red-400'

const subHeader =
  'mb-2 flex items-center gap-1 text-xs text-muted-foreground'

const statCard =
  'rounded-lg border border-border/50 bg-card/50 p-3'

const statLabel =
  'mb-1 flex items-center gap-1 text-xs text-muted-foreground'

const statValue =
  'text-xl font-bold font-poppins'

// Colors
const languageColors: Record<string, string> = {
  Java: 'bg-orange-500/70',
  TypeScript: 'bg-blue-500/70',
  JavaScript: 'bg-yellow-400/70',
  'C#': 'bg-purple-500/70',
  Python: 'bg-emerald-500/70',
  Go: 'bg-cyan-500/70',
  Kotlin: 'bg-pink-500/70',
  Rust: 'bg-amber-600/70',
  Vue: 'bg-green-500/70',
}

const getLangColorClass = (lang: string) =>
  languageColors[lang] ?? 'bg-primary/80'

const barWidth = (percent: number) =>
  `${Math.max(0, Math.min(100, percent))}%`

// Data
const ready = computed(() => !!data.value && !pending.value && !error.value)

const yearsSinceCreated = computed(() => {
  const created = data.value?.user?.createdAt
  if (!created) return 0
  const createdDate = new Date(created)
  const now = new Date()
  const diffMs = now.getTime() - createdDate.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365))
})

const publicRepos = computed(() => data.value?.stats?.publicRepos ?? 0)
const totalStars = computed(() => data.value?.stats?.totalStars ?? 0)
const recentActivity = computed(() => data.value?.activity?.totalEvents ?? 0)
const topLanguages = computed(() => data.value?.languages?.top ?? [])

// Stats array
const statsItems = computed(() => [
  {
    key: 'years',
    label: t('home.hero.openSource.years'),
    value: yearsSinceCreated.value,
    valueClass: 'text-primary',
  },
  {
    key: 'repos',
    label: t('home.hero.openSource.repos'),
    value: publicRepos.value,
    valueClass: 'text-secondary',
  },
  {
    key: 'stars',
    label: t('home.hero.openSource.stars'),
    value: totalStars.value,
    valueClass: 'text-accent',
    icon: 'lucide:star',
  },
  {
    key: 'activity',
    label: t('home.hero.openSource.recientActivity'),
    value: recentActivity.value,
    valueClass: 'text-primary',
    icon: 'lucide:activity',
  },
])
</script>
