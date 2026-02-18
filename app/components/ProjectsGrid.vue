<template>
  <section id="projects" :class="sectionShell" aria-labelledby="projects-title">
    <div :class="container">

      <!-- Section Header -->
      <header class="mb-12">
        <div :class="badgeWrap">
          <p :class="badgeText">PORTFOLIO</p>
        </div>

        <h2 id="projects-title" :class="headerTitle">
          {{ t('home.projects.title') }}
        </h2>
        <p class="max-w-2xl text-muted-foreground">
          {{ t('home.projects.description') }}
        </p>
      </header>


      <!-- Category pills -->
      <div class="mb-12 flex gap-2 overflow-x-auto pb-2">
        <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
          :class="[pillBase, isActiveCategory(category) ? pillActive : pillIdle]">
          {{ category.label }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="project in filteredProjects" :key="project.id" :class="projectCard">

          <!-- Project Image -->
          <div class="relative h-48 overflow-hidden bg-muted">
            <NuxtImg :src="project.image || '/placeholder.svg'" :alt="project.title" width="384" height="192"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div :class="imageOverlay" />
          </div>

          <!-- Project Content -->
          <div class="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 :class="projectTitle">
                {{ project.title }}
              </h3>

              <p class="mb-4 text-sm text-muted-foreground line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="mb-4 flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag" :class="chip">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex gap-2">
              <button v-if="project.hasDetails" @click="selectedProject = project"
                :class="[btnBase, btnGhostAccent, btnIcon]" aria-label="Ver detalles">
                <Icon name="lucide:info" size="16" />
              </button>

              <NuxtLink :to="project.demo" :class="[btnBase, btnPrimary, btnFill]" aria-label="Ver demo">
                <Icon name="lucide:external-link" size="16" />
                Demo
              </NuxtLink>

              <NuxtLink :to="project.github" :class="[btnBase, btnGhostSecondary, btnFill]" aria-label="Ver código">
                <Icon name="lucide:github" size="16" />
                Code
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>

    <ProjectDetailModal v-if="selectedProject" :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Project } from '~/types/project'

const { t } = useI18n()
const { projects, categories } = useContent()

const selectedCategory = ref('')
const selectedProject = ref<Project | null>(null)
const allCategoryId = computed(
  () => categories.value.find((category) => category.id === 'all')?.id ?? categories.value[0]?.id ?? 'all'
)

watch(
  allCategoryId,
  (value) => {
    if (!selectedCategory.value) selectedCategory.value = value
  },
  { immediate: true }
)

// Presets
const sectionShell =
  'font-poppins bg-linear-to-b from-transparent to-secondary/5 py-24 px-6'

const container = 'mx-auto max-w-7xl'

const badgeWrap = 'mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1'
const badgeText = 'text-xs font-semibold text-primary uppercase tracking-wider'
const headerTitle = 'mb-4 text-4xl font-bold md:text-5xl'

const pillBase =
  'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-smooth'

const pillActive = 'bg-primary text-primary-foreground'
const pillIdle = 'bg-card border border-border hover:border-primary/50'

const projectCard =
  'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-smooth ' +
  'hover:border-primary/50 hover:shadow-lg'

const imageOverlay =
  'absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100'

const projectTitle =
  'mb-2 text-xl font-bold transition-smooth group-hover:text-primary'

const chip =
  'rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground'

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-smooth'

const btnPrimary = 'bg-primary text-primary-foreground hover:bg-primary/90'
const btnGhostSecondary = 'bg-secondary/10 text-secondary border border-secondary/30 hover:border-secondary/50'
const btnGhostAccent = 'bg-accent/10 text-accent border border-accent/30 hover:border-accent/50'

const btnFill = 'flex-1 px-4 py-2'
const btnIcon = 'px-3 py-2 cursor-pointer'

// Helpers
const isActiveCategory = (category: { id: string }) => selectedCategory.value === category.id

const filteredProjects = computed(() =>
  selectedCategory.value === allCategoryId.value
    ? projects.value
    : projects.value.filter((p) => p.category === selectedCategory.value || p.category === 'full-stack')
)
</script>
