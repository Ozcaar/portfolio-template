<script setup lang="ts">
import AddButton from './AddButton.vue'
import ArrowButton from './ArrowButton.vue'
import InputBase from './InputBase.vue'
import RemoveButton from './RemoveButton.vue'
import type { ContentModel } from '~/content/content.schema'
import type { Section } from '../../../types/types'

defineProps<{
  addCategory: () => void
  model: ContentModel
  cardBase: string
  moveItem: <T>(arr: T[] | undefined, from: number, to: number) => T[] | undefined
  removeAt: <T>(arr: T[], idx: number) => T[]
  labelClass: string
  inputClass: string
  getFieldError: (prefix: string) => string | null
}>()

const section = defineModel<Section>('section', { required: true })
</script>

<template>
  <section v-if="section === 'categories'" class="space-y-6 m-5">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Categories</h2>
      <AddButton @click="addCategory" label="+ Add Category"></AddButton>
    </div>

    <div v-for="(item, idx) in model.categories" :key="idx" :class="[cardBase]">
      <div class="card-body p-4 space-y-3">
        <div class="flex items-center justify-between gap-2">
          <p class="font-semibold">
            {{ item.label.es || item.label.en || item.id || `Category #${idx + 1}` }}
          </p>
          <div class="flex gap-2">
            <ArrowButton @click="model.categories = moveItem(model.categories, idx, idx - 1) ?? model.categories" />

            <ArrowButton @click="model.categories = moveItem(model.categories, idx, idx + 1) ?? model.categories"
              :downArrow="true" />
            <RemoveButton @click="model.categories = removeAt(model.categories, idx)" />
          </div>
        </div>

        <InputBase v-model="item.id" name="category-id" label="Category ID" placeholder="e.g. frontend"
          :labelClass="labelClass" :inputClass="inputClass" />

        <span v-if="getFieldError(`categories.${idx}.id`)" class="text-xs text-warning">
          {{ getFieldError(`categories.${idx}.id`) }}
        </span>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputBase v-model="item.label.es" name="category-label-es" label="Label (ES)"
            placeholder="Etiqueta en Español" :labelClass="labelClass" :inputClass="inputClass" />

          <InputBase v-model="item.label.en" name="category-label-en" label="Label (EN)" placeholder="Label in English"
            :labelClass="labelClass" :inputClass="inputClass" />
        </div>

        <span v-if="getFieldError(`categories.${idx}.label`)" class="text-xs text-warning">
          {{ getFieldError(`categories.${idx}.label`) }}
        </span>
      </div>
    </div>
  </section>
</template>
