<template>
  <aside class="lg:col-span-3">
    <div :class="[cardBase]">
      <div class="card-body p-4 space-y-1">
        <p class="font-semibold text-base opacity-80 mb-5">{{ title }}</p>

        <button v-for="s in sections" :key="s.key" class="btn btn-md border justify-start"
          :class="modelValue === s.key ? activeClass : inactiveClass" @click="$emit('update:modelValue', s.key)">
          {{ s.label }}
          <span v-if="hasError && hasError(s.key)" class="badge badge-warning ml-auto">!</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SectionNav',
  props: {
    modelValue: { type: String, required: true },
    sections: { type: Array, required: true },
    hasError: { type: Function, default: null },

    // estilos
    cardBase: { type: [String, Array, Object], default: '' },
    title: { type: String, default: 'SECTIONS' },
    activeClass: { type: String, default: 'btn-primary' },
    inactiveClass: { type: String, default: 'btn-ghost' },
  },
}
</script>
