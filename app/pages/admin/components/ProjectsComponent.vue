<script setup lang="ts">
import AddButton from './AddButton.vue'
import InputBase from './InputBase.vue'
import RemoveButton from './RemoveButton.vue'
import ArrowButton from './ArrowButton.vue'
import type { ContentModel, ProjectItem } from '~/content/content.schema'
import type { Section } from '../../../types/types'

defineProps<{
  addProject: () => void
  model: ContentModel
  cardBase: string
  moveItem: <T>(arr: T[] | undefined, from: number, to: number) => T[] | undefined
  removeAt: <T>(arr: T[], idx: number) => T[]
  labelClass: string
  inputClass: string
  getFieldError: (prefix: string) => string | null
}>()

const section = defineModel<Section>('section', { required: true })

// Ensure optional fields are initialized

const ensureLongDescription = (p: ProjectItem) => {
  if (!p.longDescription) p.longDescription = { es: '', en: '' }
  return p.longDescription
}

const ensureFeatures = (item: ProjectItem) => {
  if (!item.features) item.features = [{ es: '', en: '' }]
  return item.features
}

const ensureTechStack = (item: ProjectItem) => {
  if (!item.techStack) item.techStack = [{ name: { es: '', en: '' }, description: { es: '', en: '' } }]
  return item.techStack
}


</script>

<template>
  <section v-if="section === 'projects'" class="space-y-6 m-5">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Projects</h2>
      <AddButton @click="addProject" label="+ Add Project" />
    </div>

    <div v-for="(item, idx) in model.projects" :key="idx" :class="[cardBase]">
      <div class="card-body p-4 space-y-10">
        <div class="flex items-center justify-between gap-2">
          <p class="font-semibold">
            {{ item.title.es || item.title.en || `Project #${idx + 1}` }}
          </p>
          <div class="flex gap-2">
            <ArrowButton @click="model.projects = moveItem(model.projects, idx, idx - 1) ?? model.projects" />

            <ArrowButton @click="model.projects = moveItem(model.projects, idx, idx + 1) ?? model.projects"
              :downArrow="true" />
            <RemoveButton @click="model.projects = removeAt(model.projects, idx)" />
          </div>
        </div>

        <div class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="form-control">
              <span :class="labelClass">Project ID</span>
              <input v-model.number="item.id" type="number" min="1" placeholder="e.g. 1" :class="inputClass" />
            </label>

            <label class="form-control">
              <span :class="labelClass">Category</span>
              <select v-model="item.category" :class="inputClass">
                <option value="" disabled>Select category</option>
                <option v-for="category in model.categories" :key="category.id" :value="category.id">
                  {{ category.label.en || category.label.es || category.id }}
                </option>
              </select>
            </label>
          </div>

          <div class="flex items-center gap-2">
            <input :id="`project-details-${item.id}`" v-model="item.hasDetails" type="checkbox"
              class="toggle toggle-primary checkbox" />
            <label :for="`project-details-${item.id}`" class="text-sm">Has details modal</label>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputBase v-model="item.title.es" name="project-title-es" label="Title (ES)"
              placeholder="Título en Español" :labelClass="labelClass" :inputClass="inputClass" />

            <InputBase v-model="item.title.en" name="project-title-en" label="Title (EN)" placeholder="Title in English"
              :labelClass="labelClass" :inputClass="inputClass" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputBase v-model="item.description.es" name="project-description-es" label="Short Description (ES)"
              textarea :rows="4" placeholder="Descripción corta" :labelClass="labelClass" :inputClass="inputClass" />

            <InputBase v-model="item.description.en" name="project-description-en" label="Short Description (EN)"
              textarea :rows="4" placeholder="Short description" :labelClass="labelClass" :inputClass="inputClass" />
          </div>

          <div v-if="item.hasDetails" class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputBase v-model="ensureLongDescription(item).es" name="project-long-es" label="Long Description (ES)"
              textarea :rows="6" placeholder="Descripción extensa" :labelClass="labelClass" :inputClass="inputClass" />

            <InputBase v-model="ensureLongDescription(item).en" name="project-long-en" label="Long Description (EN)"
              textarea :rows="6" placeholder="Long description" :labelClass="labelClass" :inputClass="inputClass" />
          </div>

          <InputBase v-model="item.image" name="project-image" label="Main Image" placeholder="/image.jpg"
            :labelClass="labelClass" :inputClass="inputClass" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputBase v-model="item.demo" name="project-demo" label="Demo URL" placeholder="https://..."
              :labelClass="labelClass" :inputClass="inputClass" />

            <InputBase v-model="item.github" name="project-github" label="GitHub URL"
              placeholder="https://github.com/..." :labelClass="labelClass" :inputClass="inputClass" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-8">
            <h3 class="font-semibold">Tags</h3>
            <AddButton @click="item.tags = [...item.tags, '']" label="+ Add Tag" />
          </div>

          <div v-for="(tag, tagIdx) in item.tags" :key="tagIdx" class="flex items-center gap-2 mb-1">
            <InputBase :modelValue="item.tags[tagIdx] ?? ''" @update:modelValue="val => item.tags[tagIdx] = val"
              name="project-tag" label="" placeholder="e.g. Nuxt" :labelClass="labelClass" :inputClass="inputClass" />
            <RemoveButton @click="item.tags = removeAt(item.tags, tagIdx)" :iconOnly="true" />
          </div>
        </div>

        <div v-if="item.hasDetails">
          <div class="flex items-center justify-between mb-8">
            <h3 class="font-semibold">Gallery Images</h3>
            <AddButton @click="item.images = [...(item.images ?? []), '']" label="+ Add Image" />
          </div>

          <div v-for="(img, imgIdx) in item.images" :key="imgIdx" class="flex items-center gap-2 mb-1">
            <InputBase :modelValue="item.images![imgIdx] ?? ''" @update:modelValue="val => item.images![imgIdx] = val"
              name="project-image-item" label="" placeholder="/image.jpg" :labelClass="labelClass" class="w-full"
              :inputClass="inputClass" />
            <RemoveButton @click="item.images = removeAt(item.images ?? [], imgIdx)" :iconOnly="true" />
          </div>
        </div>

        <div v-if="item.hasDetails">
          <div class="flex items-center justify-between mb-8">
            <h3 class="font-semibold">Features</h3>
            <AddButton @click="item.features = [...(item.features ?? []), { es: '', en: '' }]" label="+ Add Feature" />
          </div>

          <div class="flex gap-2 mb-3 md:mb-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <p class="font-semibold">Feature (ES)</p>
              <p class="font-semibold">Feature (EN)</p>
            </div>

            <!-- Hidden (balance) -->
            <div class="flex justify-end">
              <RemoveButton @click="" :iconOnly="true" class="invisible" />
            </div>
          </div>

          <div v-for="(feature, featureIdx) in ensureFeatures(item)" :key="featureIdx" class="flex mb-5 md:mb-1 gap-2">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 w-full">
              <InputBase v-model="feature.es" name="project-feature-es" label="" placeholder="Característica en Español"
                :labelClass="labelClass" :inputClass="inputClass" />
              <InputBase v-model="feature.en" name="project-feature-en" label="" placeholder="Feature in English"
                :labelClass="labelClass" :inputClass="inputClass" />
            </div>
            <div class="flex justify-end">
              <RemoveButton @click="item.features = removeAt(item.features ?? [], featureIdx)" :iconOnly="true" />
            </div>
          </div>
        </div>

        <div v-if="item.hasDetails" class="space-y-1">
          <div class="flex items-center justify-between mb-8">
            <h3 class="font-semibold">Tech Stack</h3>
            <AddButton
              @click="item.techStack = [...(item.techStack ?? []), { name: { es: '', en: '' }, description: { es: '', en: '' } }]"
              label="+ Add Tech Stack" />
          </div>

          <div v-for="(tech, techIdx) in ensureTechStack(item)" :key="techIdx" class="space-y-2 mb-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputBase v-model="tech.name.es" name="project-tech-name-es" label="Name (ES)"
                placeholder="Nombre en Español" :labelClass="labelClass" :inputClass="inputClass" />
              <InputBase v-model="tech.name.en" name="project-tech-name-en" label="Name (EN)"
                placeholder="Name in English" :labelClass="labelClass" :inputClass="inputClass" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputBase v-model="tech.description.es" name="project-tech-desc-es" label="Description (ES)" textarea
                :rows="3" placeholder="Descripción" :labelClass="labelClass" :inputClass="inputClass" />
              <InputBase v-model="tech.description.en" name="project-tech-desc-en" label="Description (EN)" textarea
                :rows="3" placeholder="Description" :labelClass="labelClass" :inputClass="inputClass" />
            </div>
            <div class="flex justify-end">
              <RemoveButton @click="item.techStack = removeAt(item.techStack ?? [], techIdx)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
