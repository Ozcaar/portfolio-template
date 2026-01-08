<template>
  <main :class="pageShell">

    <!-- Navigation -->
    <ThinNav />

    <!-- About Content -->
    <div :class="contentShell">
      <div :class="container">

        <!-- Header -->
        <header class="mb-16">
          <div :class="badgeWrap">
            <p :class="badgeText">{{ t('about.header.badge') }}</p>
          </div>

          <h1 :class="pageTitle">Óscar López</h1>

          <p class="max-w-2xl text-xl text-muted-foreground">
            {{ t('about.header.subtitle') }}
          </p>
        </header>

        <!-- Story Section -->
        <section class="mb-16 grid gap-12 md:grid-cols-2" aria-labelledby="about-resume-title">
          <div>
            <h2 id="about-resume-title" :class="sectionTitle">
              {{ t('about.resume.title') }}
            </h2>

            <div class="space-y-4 text-muted-foreground">
              <p>{{ t('about.resume.paragraph1', { years: 5 }) }}</p>
              <p>{{ t('about.resume.paragraph2') }}</p>
              <p>{{ t('about.resume.paragraph3') }}</p>
            </div>
          </div>

          <div :class="[cardBase, 'p-8 rounded-2xl']">
            <h3 class="mb-6 text-lg font-bold">
              {{ t('about.coreExpertise.title') }}
            </h3>

            <div class="space-y-4">
              <div v-for="item in CORE_EXPERTISE" :key="item.title"
                class="border-b border-border pb-4 last:border-0 last:pb-0">
                <p class="mb-1 text-sm font-semibold">{{ item.title }}</p>
                <p class="text-xs text-muted-foreground">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Experience Timeline -->
        <section class="mb-16">
          <h2 :class="[sectionTitle, 'mb-8']">
            {{ t('about.experienceTimeline.title') }}
          </h2>

          <div class="space-y-8">
            <div v-for="experience in EXPERIENCE_TIMELINE" :key="experience.year" class="flex gap-6">
              <div class="w-32 shrink-0">
                <p class="text-sm font-semibold text-primary">
                  {{ experience.year }}
                </p>
              </div>

              <div :class="[cardBase, 'flex-1 rounded-xl p-4']">
                <h3 class="mb-1 font-semibold">{{ experience.role }}</h3>
                <p class="mb-2 text-sm text-secondary">{{ experience.company }}</p>
                <p class="text-sm text-muted-foreground">{{ experience.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Core Values -->
        <section :class="valuesShell">
          <h2 :class="[sectionTitle, 'mb-6']">
            {{ t('about.coreValues.title') }}
          </h2>

          <div class="grid gap-6 md:grid-cols-3">
            <div v-for="value in CORE_VALUES" :key="value.title" class="text-center">
              <p class="mb-3 text-4xl">{{ value.icon }}</p>
              <p class="mb-2 font-semibold">{{ value.title }}</p>
              <p class="text-sm text-muted-foreground">{{ value.desc }}</p>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <footer class="flex flex-col items-center text-center">
          <p class="mb-6 text-lg text-muted-foreground">
            {{ t('about.cta.kicker') }}
          </p>

          <NuxtLink :to="localePath('/contact')" :class="ctaBtn">
            {{ t('about.cta.button') }}
            <Icon name="lucide:external-link" size="14" class="transition-transform group-hover:translate-x-1" />
          </NuxtLink>
        </footer>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CORE_EXPERTISE, EXPERIENCE_TIMELINE, CORE_VALUES } from '~/constants/experience'
const { t } = useI18n()
const localePath = useLocalePath()

// Presets
const pageShell =
  'font-poppins min-h-screen bg-linear-to-br from-background via-background to-background'

const contentShell = 'px-6 pt-32 pb-20'
const container = 'mx-auto max-w-4xl'

const badgeWrap = 'mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1'
const badgeText = 'text-xs font-semibold text-primary uppercase tracking-wider'
const pageTitle = 'mb-6 text-5xl font-bold md:text-6xl'

const sectionTitle = 'mb-4 text-2xl font-bold'

const cardBase = 'bg-card border border-border'

const valuesShell =
  'mb-16 rounded-2xl border border-border bg-linear-to-br from-primary/5 to-secondary/5 p-8'

const ctaBtn =
  'group mt-4 w-xs btn btn-accent border-0 shadow-none flex items-center justify-center gap-1 text-sm text-accent-foreground'
</script>
