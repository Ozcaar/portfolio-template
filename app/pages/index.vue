<template>
  <main :class="pageShell">
    <MainNav />
    <HeroSection />
    <ProjectsGrid />
    <!-- TODO: <DevlogSection /> -->
  </main>
</template>

<script setup lang="ts">
// Preset
const pageShell =
  'min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-background font-poppins'
</script>