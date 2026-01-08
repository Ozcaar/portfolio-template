<template>
  <div class="rounded-xl border border-white/10 bg-white/5 p-3">
    <p class="text-xs text-muted-foreground">{{ label }}</p>
    <p class="text-lg font-semibold">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: number }>()
</script>
