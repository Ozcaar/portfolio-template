<template>
  <div class="px-6 pt-24 pb-4 md:pb-16">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[minmax(300px,auto)]">

        <!-- Hero Intro -->
        <div :class="[cardBase, heroCard, 'md:col-span-2 md:row-span-2']">
          <div :class="heroOverlay">
            <div class="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5" />
          </div>

          <div class="relative z-10">
            <p class="mb-2 text-sm font-medium text-primary">
              {{ t('home.hero.intro.role') }}
            </p>

            <h1 :class="heroTitle">
              {{ t('home.hero.intro.title') }}
            </h1>

            <p class="max-w-md text-muted-foreground md:text-lg">
              {{ t('home.hero.intro.subtitle') }}
            </p>
          </div>

          <div class="relative z-10 mt-12 flex justify-center md:mt-0 md:justify-start">
            <NuxtLink :to="{ path: localePath('/'), hash: '#projects' }" :aria-label="t('common.nav.projects')"
              :class="[btnBase, btnPrimary, 'md:w-3xs']">
              {{ t('common.buttons.viewMyWork') }}
              <Icon name="lucide:arrow-right" size="16"
                class="ml-2 transition-transform group-hover/btn:translate-x-1" />
            </NuxtLink>
          </div>
        </div>

        <!-- Tech Stack -->
        <div :class="[cardBase, cardHover]">
          <div>
            <h3 :class="cardTitle">
              {{ t('home.hero.techStack.title') }}
            </h3>

            <div class="flex flex-wrap gap-2">
              <span v-for="tech in techStack" :key="tech" :class="techChip">
                {{ tech }}
              </span>
            </div>
          </div>

          <p class="mt-8 text-xs text-muted-foreground md:mt-0">
            {{ t('home.hero.techStack.footer') }}
          </p>
        </div>

        <!-- GitHub Stats -->
        <GithubCard :class="[cardBase, cardHover]" />

        <!-- Experience -->
        <div :class="[cardBase, expCard, 'md:col-span-2']">
          <h2 :class="expTitle">
            {{ t('home.hero.experience.title') }}
          </h2>

          <div class="h-fit space-y-5 pr-2 md:overflow-y-auto">
            <div v-for="exp in experience" :key="exp.company" class="space-y-1">
              <p class="text-sm font-semibold text-secondary">
                {{ exp.role }}
                <span class="text-xs text-muted-foreground">
                  &middot; {{ exp.company }}
                </span>
              </p>

              <p class="text-xs text-muted-foreground">{{ exp.duration }}</p>
              <p class="text-xs">{{ exp.description }}</p>
            </div>
          </div>
        </div>

        <!-- CTA Card -->
        <div :class="[cardBase, ctaCard]">
          <div class="flex items-start justify-between gap-4">
            <p class="mb-4 text-center text-base font-semibold md:text-left">
              {{ t('home.hero.cta.kicker') }}
            </p>

            <div :class="badgeWrap">
              <p :class="badgeText">{{ t('home.hero.cta.availability') }}</p>
            </div>
          </div>

          <div class="mb-6 space-y-6 text-sm text-base-100/70">
            <p>
              {{ t('home.hero.cta.paragraph') }}
            </p>

            <ul class="space-y-1">
              <li v-for="item in ctaBullets" :key="item" :class="bulletItem">
                <Icon name="lucide:check" class="text-success text-xl" />
                <span class="ml-1">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-5 md:mt-0">
            <NuxtLink :to="{ path: localePath('/contact') }" :aria-label="t('common.nav.contact')"
              :class="[btnBase, btnAccent, 'text-sm']">
              {{ t('common.buttons.getInTouch') }}
              <Icon name="lucide:arrow-right" size="16"
                class="ml-2 transition-transform group-hover/btn:translate-x-1" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Floating Social Icons -->
      <div class="mt-12 flex justify-center gap-4">
        <NuxtLink v-for="item in socialLinks" :key="item.icon" :to="item.to" target="_blank"
          :class="[iconBtn, item.hover]" :aria-label="item.label">
          <Icon :name="item.icon" class="text-xl md:text-lg" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SocialLinks as SocialLinksType } from '~/content/content.schema'

const { techStack, experience, socialLinks: socialLinksContent } = useContent<{ socialLinks: SocialLinksType }>()

const { t } = useI18n()
const localePath = useLocalePath()

// Content arrays
const ctaBullets = computed(() => [
  t('home.hero.cta.bullet1'),
  t('home.hero.cta.bullet2'),
  t('home.hero.cta.bullet3'),
  t('home.hero.cta.bullet4'),
])

const socialLinks = computed(() => [
  {
    icon: 'lucide:github',
    label: 'GitHub',
    to: socialLinksContent.value.github,
    hover: 'hover:text-accent hover:border-accent/50',
  },
  {
    icon: 'lucide:linkedin',
    label: 'LinkedIn',
    to: socialLinksContent.value.linkedin,
    hover: 'hover:text-primary hover:border-primary/50',
  },
  {
    icon: 'lucide:mail',
    label: 'Email',
    to: `mailto:${socialLinksContent.value.email}`,
    hover: 'hover:text-secondary hover:border-secondary/50',
  },
])

// Presets
const badgeWrap =
  'inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1'

const badgeText =
  'text-xs font-semibold text-accent uppercase tracking-wider'

const cardBase =
  'relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between font-poppins'

const cardHover =
  'transition-smooth hover:border-primary/50'

const heroCard =
  'group bg-linear-to-br from-primary/10 to-secondary/10 border-primary/20 p-8'

const heroOverlay =
  'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'

const heroTitle =
  'mb-4 text-3xl font-bold leading-tight md:text-5xl'

const cardTitle =
  'mb-4 text-base font-semibold text-primary'

const techChip =
  'rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs text-secondary'

const expCard =
  'bg-linear-to-br from-secondary/5 to-primary/5 transition-smooth hover:border-secondary/50'

const expTitle =
  'mb-4 text-lg font-bold text-primary'

const ctaCard =
  'select-none bg-linear-to-br from-primary/5 to-accent/30 transition-all duration-300 ' +
  'hover:border-accent/80 hover:shadow-[0_0_15px_-1px_var(--color-accent)] hover:shadow-accent/40'

const bulletItem =
  'flex items-center'

const btnBase =
  'btn border-0 shadow-none flex items-center gap-1 group/btn'

const btnPrimary =
  'bg-primary text-primary-foreground hover:bg-primary/90 font-semibold'

const btnAccent =
  'bg-accent text-accent-foreground hover:bg-accent/90'

const iconBtn =
  'flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card transition-smooth md:h-10 md:w-10'
</script>
