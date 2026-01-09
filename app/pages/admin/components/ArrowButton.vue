<template>
  <div>
    <button v-if="props.upArrow && !props.downArrow"
      class="bg-primary text-primary-foreground border p-1.5 max-h-8.5 max-w-8.5 rounded-md hover:bg-primary/90 hover:cursor-pointer transition-colors">
      <Icon name="lucide:arrow-up" size="20" />
    </button>

    <button v-else
      class="bg-primary text-primary-foreground border p-1.5 max-h-8.5 max-w-8.5 rounded-md hover:bg-primary/90 hover:cursor-pointer transition-colors">
      <Icon name="lucide:arrow-down" size="20" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  upArrow?: boolean,
  downArrow?: boolean
}>(), {
  upArrow: true,
  downArrow: false
})
</script>

<style></style>