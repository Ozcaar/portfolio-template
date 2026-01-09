<template>
  <Html data-theme="light">

  <Body>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>

  </Html>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const canonical = computed(() => config.public.siteUrl + route.fullPath)
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title', { name: config.public.name }),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title', { name: config.public.name }),
  ogDescription: () => t('seo.home.description'),
})

useHead({
  link: [{ rel: 'canonical', href: canonical.value }],
})
</script>