<template>
  <a :href="switchLocalePath(locale === 'en' ? 'es' : 'en')" :class="langSwitchClass">
    <Icon name="lucide:languages" size="20" />
    <span class="text-xs font-semibold tracking-wide">
      {{ locale === 'en' ? 'ES' : 'EN' }}
    </span>
  </a>
</template>

<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()

const langSwitchClass =
  'mt-0.5 inline-flex w-[66px] items-center justify-between rounded-(--radius-field) ' +
  'border-2 border-current px-2.5 py-1.5 text-sm font-semibold font-poppins text-base-100 ' +
  'transition-smooth hover:bg-base-100/5 hover:shadow-lg hover:shadow-base-100/10'
</script>
