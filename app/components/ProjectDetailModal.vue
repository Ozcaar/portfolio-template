<template>
  <div :class="overlay">
    <div :class="modal">

      <!-- Close Button -->
      <button @click="onClose()" :class="closeBtn" aria-label="Close modal">
        <Icon name="lucide:x" size="20" />
      </button>

      <div class="p-8">

        <!-- Header -->
        <header class="mb-8">
          <span :class="chip">
            {{ project.category }}
          </span>

          <h2 class="mb-4 text-4xl font-bold">
            {{ project.title }}
          </h2>

          <p class="mb-6 text-lg text-muted-foreground">
            {{ project.longDescription || project.description }}
          </p>

          <!-- Tags -->
          <div class="mb-6 flex flex-wrap gap-2">
            <span v-for="tag in project.tags" :key="tag" :class="chip">
              {{ tag }}
            </span>
          </div>

          <!-- CTA Buttons -->
          <div class="flex gap-3">
            <a v-for="cta in ctas" :key="cta.key" :href="cta.href" target="_blank" rel="noopener noreferrer"
              :class="[btnBase, cta.class]">
              <Icon :name="cta.icon" size="16" />
              {{ cta.label }}
            </a>
          </div>
        </header>

        <!-- Main Image -->
        <div :class="imageFrame">
          <NuxtImg :src="project.image || '/placeholder.svg'" :alt="project.title" class="h-auto w-full" />
        </div>

        <!-- Additional Images Gallery -->
        <section v-if="hasImages" class="mb-8">
          <h3 :class="sectionTitle">Galería</h3>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div v-for="(img, idx) in project.images" :key="idx" :class="[imageFrame, frameHover]">
              <NuxtImg :src="img || '/placeholder.svg'" :alt="`${project.title} screenshot ${idx + 1}`"
                class="h-auto w-full" />
            </div>
          </div>
        </section>

        <!-- Features -->
        <section v-if="hasFeatures" class="mb-8">
          <h3 :class="sectionTitle">Características Principales</h3>

          <ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <li v-for="(feature, idx) in project.features" :key="idx" :class="featureItem">
              <span :class="featureIndex">
                {{ idx + 1 }}
              </span>
              <span class="text-sm">{{ feature }}</span>
            </li>
          </ul>
        </section>

        <!-- Tech Stack -->
        <section v-if="hasTechStack">
          <h3 :class="sectionTitle">Stack Tecnológico</h3>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div v-for="(tech, idx) in project.techStack" :key="idx" :class="[techCard, frameHover]">
              <h4 class="mb-2 font-semibold">{{ tech.name }}</h4>
              <p class="text-sm text-muted-foreground">{{ tech.description }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import type { Project } from '~/types/project'

const props = defineProps<{
  project: Project
  onClose: () => void
}>()

const { project, onClose } = props

// Presets
const overlay =
  'fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm font-poppins'

const modal =
  'relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl'

const closeBtn =
  'sticky top-4 float-right z-10 m-4 flex items-center justify-center rounded-lg bg-secondary/10 p-3 ' +
  'cursor-pointer transition-smooth hover:bg-secondary/20'

const chip =
  'mb-4 inline-flex rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground'

const sectionTitle = 'mb-4 text-2xl font-bold'

const imageFrame = 'mb-8 overflow-hidden rounded-xl border border-border'
const frameHover = 'transition-smooth hover:border-primary/50'

const btnBase =
  'inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-smooth'

const btnPrimary =
  'bg-primary text-primary-foreground hover:bg-primary/90'

const btnGhost =
  'border border-secondary/30 bg-secondary/10 text-secondary hover:border-secondary/50'

const featureItem =
  'flex items-start gap-3 rounded-lg border border-border bg-secondary/5 p-4'

const featureIndex =
  'shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary'

const techCard =
  'rounded-lg border border-border bg-card p-4'

// Data
const ctas = computed(() => [
  { key: 'demo', href: project.demo, icon: 'lucide:external-link', label: 'Ver Demo', class: btnPrimary },
  { key: 'code', href: project.github, icon: 'lucide:github', label: 'Ver Código', class: btnGhost },
].filter(x => !!x.href))

const hasImages = computed(() => (project.images?.length ?? 0) > 0)
const hasFeatures = computed(() => (project.features?.length ?? 0) > 0)
const hasTechStack = computed(() => (project.techStack?.length ?? 0) > 0)

// Escape close
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') onClose()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>
