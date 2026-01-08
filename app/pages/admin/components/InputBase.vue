<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  name: string
  placeholder?: string
  type?: string
  required?: boolean
  labelClass?: string
  inputClass?: string
  textarea?: boolean
  rows?: number
}>(), {
  type: 'text',
  textarea: false,
  rows: 4,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement | HTMLTextAreaElement).value)
}
</script>

<template>
  <div class="space-y-1">
    <label :for="name" :class="labelClass" class="block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>

    <textarea v-if="textarea" :id="name" :name="name" :rows="rows" :placeholder="placeholder" :required="required"
      :value="modelValue" @input="onInput" :class="inputClass" />

    <input v-else :id="name" :name="name" :type="type" :placeholder="placeholder" :required="required"
      :value="modelValue" @input="onInput" :class="inputClass" />
  </div>
</template>
