<template>
  <div class="flex justify-center items-center">
    <button v-if="!props.iconOnly" class="btn btn-sm btn-error text-error-content border">
      <div>{{ props.label }}</div>
    </button>

    <button v-else class="bg-error text-error-content border p-1.5 max-h-8.5 max-w-8.5 rounded-md hover:bg-error/90 hover:cursor-pointer transition-colors">
      <div class="flex justify-center items-center">
        <Icon name="lucide:x" size="20" />
      </div>

    </button>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string,
  iconOnly?: boolean
}>(), {
  label: 'Remove',
  iconOnly: false
})

</script>

<style></style>