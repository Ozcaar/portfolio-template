<template>
  <div>
    <button class="btn btn-sm btn-secondary text-secondary-foreground border">{{ props.label }}</button>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string
}>(), {
  label: '+ Add',
})

</script>

<style></style>