<script setup lang="ts">
import { CONTENT } from '~/content/content.data'
import type { ContentModel, I18nText } from '~/content/content.schema'
import { ContentModelSchema, formatZodErrors } from '~/content/content.zod'
import SectionNav from './components/SectionNav.vue'
import TechStackComponent from './components/TechStackComponent.vue'
import type { Section } from '../../types/types'
import ExperienceComponent from './components/ExperienceComponent.vue'
import CoreExpertiseComponent from './components/CoreExpertiseComponent.vue'
import TimelineComponent from './components/TimelineComponent.vue'
import CoreValuesComponent from './components/CoreValuesComponent.vue'
import FaqComponent from './components/FaqComponent.vue'
import SocialLinksComponent from './components/SocialLinksComponent.vue'
import CategoriesComponent from './components/CategoriesComponent.vue'
import ProjectsComponent from './components/ProjectsComponent.vue'

const cfg = useRuntimeConfig()
if (!cfg.public.contentEditorEnabled) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
}

const model = ref<ContentModel>(structuredClone(CONTENT))

model.value.projects = model.value.projects.map((project) => ({
  ...project,
  longDescription: project.longDescription ?? project.description,
  images: project.images ?? [],
  features: project.features ?? [],
  techStack: project.techStack ?? [],
  hasDetails: project.hasDetails ?? false,
}))

const section = ref<Section>('experience')
const errors = ref<{ path: string; message: string }[]>([])
const lastValidatedAt = ref<number | null>(null)

const sections = [
  { key: 'experience', label: 'Experience' },
  { key: 'techStack', label: 'Tech Stack' },
  { key: 'coreExpertise', label: 'Core Expertise' },
  { key: 'experienceTimeline', label: 'Experience Timeline' },
  { key: 'coreValues', label: 'Core Values' },
  { key: 'faqItems', label: 'FAQ' },
  { key: 'socialLinks', label: 'Social Links' },
  { key: 'categories', label: 'Categories' },
  { key: 'projects', label: 'Projects' },
]

function validate() {
  const res = ContentModelSchema.safeParse(model.value)
  errors.value = res.success ? [] : formatZodErrors(res.error)
  lastValidatedAt.value = Date.now()
  return res.success
}

function getFieldError(prefix: string) {
  // Show the first error that "starts" with that path
  return errors.value.find(e => e.path.startsWith(prefix))?.message ?? null
}

// i18n helper
function mkI18nText(es = '', en = ''): I18nText {
  return { es, en }
}

// Array helpers
function moveItem<T>(arr: T[] = [], from: number, to: number): T[] | undefined {
  if (to < 0 || to >= arr.length || from < 0 || from >= arr.length) return

  const clone = [...arr]
  const item = clone.splice(from, 1)[0]!
  clone.splice(to, 0, item)

  return clone
}

function removeAt<T>(arr: T[], idx: number) {
  const clone = [...arr]
  clone.splice(idx, 1)
  return clone
}

// Add templates
function addTech() {
  model.value.techStack = [...model.value.techStack, '']
}

function addExperience() {
  model.value.experience = [
    ...model.value.experience,
    {
      company: '',
      role: mkI18nText('', ''),
      duration: mkI18nText('', ''),
      description: mkI18nText('', ''),
    },
  ]
}

function addCoreExpertise() {
  model.value.coreExpertise = [
    ...model.value.coreExpertise,
    { title: mkI18nText('', ''), desc: mkI18nText('', '') },
  ]
}

function addTimeline() {
  model.value.experienceTimeline = [
    ...model.value.experienceTimeline,
    {
      year: mkI18nText('', ''),
      role: mkI18nText('', ''),
      company: '',
      description: mkI18nText('', ''),
    },
  ]
}

function addCoreValue() {
  model.value.coreValues = [
    ...model.value.coreValues,
    { icon: '✨', title: mkI18nText('', ''), desc: mkI18nText('', '') },
  ]
}

function addFaq() {
  model.value.faqItems = [...model.value.faqItems, { q: mkI18nText('', ''), a: mkI18nText('', '') }]
}

function addCategory() {
  model.value.categories = [
    ...model.value.categories,
    { id: '', label: mkI18nText('', '') },
  ]
}

function addProject() {
  model.value.projects = [
    ...model.value.projects,
    {
      id: model.value.projects.length + 1,
      title: mkI18nText('', ''),
      description: mkI18nText('', ''),
      longDescription: mkI18nText('', ''),
      tags: [],
      category: model.value.categories[0]?.id ?? '',
      image: '',
      images: [],
      features: [],
      techStack: [],
      demo: '',
      github: '',
      hasDetails: false,
    },
  ]
}

// Clipboard / Export
async function copyJSON() {
  if (!validate()) return
  await navigator.clipboard.writeText(JSON.stringify(model.value, null, 2))
}

function exportTS() {
  if (!validate()) return
  const ts =
    `import type { ContentModel } from './content.schema'\n\n` +
    `export const CONTENT: ContentModel = ${JSON.stringify(model.value, null, 2)}\n`

  const blob = new Blob([ts], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'content.data.ts'
  a.click()
  URL.revokeObjectURL(url)
}

// Auto-validate on model changes
watch(
  () => model.value,
  () => {
    if (!lastValidatedAt.value) return
    validate()
  },
  { deep: true }
)

// Tailwind presets
const pageShell =
  'min-h-screen overflow-hidden bg-linear-to-br from-accent/5 via-background to-secondary/10 font-poppins'

const cardBase =
  'relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between font-poppins'

const labelClass = 'mb-2 block text-sm font-medium text-foreground'

const inputClass =
  'w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground ' +
  'placeholder:text-muted-foreground transition-smooth ' +
  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'

</script>

<template>
  <div :class="pageShell">

    <div class="max-w-6xl mx-auto p-6 space-y-4">

      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-3 mt-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold">Content Editor (UI)</h1>
          <p class="text-sm opacity-80">Section-based editing (es/en). Export TS or copy JSON.</p>
        </div>

        <div class="flex gap-2 mx-5">
          <button class="btn btn-outline border" @click="validate">Validate</button>
          <button class="btn btn-outline border" @click="copyJSON">Copy JSON</button>
          <button class="btn btn-accent text-accent-foreground border" @click="exportTS">Export TS</button>
        </div>
      </div>

      <!-- Global errors -->
      <div v-if="errors.length" class="alert alert-warning">
        <div class="space-y-2">
          <p class="font-semibold">Validation Errors:</p>
          <ul class="list-disc ml-5 text-sm">
            <li v-for="(e, i) in errors.slice(0, 10)" :key="i">
              {{ e.path }} &rarr; {{ e.message }}
            </li>
          </ul>
          <p v-if="errors.length > 10" class="text-xs opacity-70">
            Showing 10 of {{ errors.length }} errors.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Sidebar -->
        <SectionNav v-model="section" :sections="sections" :hasError="getFieldError" :cardBase="cardBase" />

        <!-- Main -->
        <main class="lg:col-span-9 space-y-4">

          <!-- EXPERIENCE -->
          <ExperienceComponent :addExperience="addExperience" :model="model" :cardBase="cardBase" :moveItem="moveItem"
            :removeAt="removeAt" :labelClass="labelClass" :inputClass="inputClass" :getFieldError="getFieldError"
            v-model:section="section" />

          <!-- TECH STACK -->
          <TechStackComponent :cardBase="cardBase" :addTech="addTech" :model="model" :inputClass="inputClass"
            :moveItem="moveItem" :removeAt="removeAt" :getFieldError="getFieldError" v-model:section="section" />

          <!-- CORE EXPERTISE -->
          <CoreExpertiseComponent :addCoreExpertise="addCoreExpertise" :model="model" :cardBase="cardBase"
            :moveItem="moveItem" :removeAt="removeAt" :labelClass="labelClass" :inputClass="inputClass"
            v-model:section="section" />

          <!-- TIMELINE -->
          <TimelineComponent :addTimeline="addTimeline" :model="model" :cardBase="cardBase" :moveItem="moveItem"
            :removeAt="removeAt" :labelClass="labelClass" :inputClass="inputClass" v-model:section="section" />

          <!-- CORE VALUES -->
          <CoreValuesComponent :addCoreValue="addCoreValue" :model="model" :cardBase="cardBase" :moveItem="moveItem"
            :removeAt="removeAt" :labelClass="labelClass" :inputClass="inputClass" v-model:section="section" />

          <!-- FAQ -->
          <FaqComponent :addFaq="addFaq" :model="model" :cardBase="cardBase" :moveItem="moveItem" :removeAt="removeAt"
            :labelClass="labelClass" :inputClass="inputClass" v-model:section="section" />

          <!-- SOCIAL LINKS -->
          <SocialLinksComponent :cardBase="cardBase" :model="model" :labelClass="labelClass" :inputClass="inputClass"
            :getFieldError="getFieldError" v-model:section="section" />
            
          <!-- CATEGORIES -->
          <CategoriesComponent :addCategory="addCategory" :model="model" :cardBase="cardBase" :moveItem="moveItem"
            :removeAt="removeAt" :labelClass="labelClass" :inputClass="inputClass" :getFieldError="getFieldError"
            v-model:section="section" />

          <!-- PROJECTS -->
          <ProjectsComponent :addProject="addProject" :model="model" :cardBase="cardBase" :moveItem="moveItem"
            :removeAt="removeAt" :labelClass="labelClass" :inputClass="inputClass" :getFieldError="getFieldError"
            v-model:section="section" />
        </main>
      </div>
    </div>
  </div>
</template>
