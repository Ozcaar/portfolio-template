<template>
    <div class="font-poppins min-h-screen flex items-center justify-center">
        <div class="max-w-2xl w-full text-center space-y-6 -mt-16 md:mt-0">

            <!-- Navigation -->
            <MainNav />

            <!-- 404 Icon -->
            <div class="flex justify-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-secondary/20 blur-3xl rounded-full" />
                    <div class="relative h-32 w-32 bg-card border border-border rounded-full p-8">
                        <Icon v-if="error?.statusCode === 404" name="lucide:ban" size="64" class="text-secondary" />
                        <Icon v-else name="lucide:cloud-alert" size="64" class="text-secondary" />
                    </div>
                </div>
            </div>

            <!-- 404 Message -->
            <div class="space-y-4 text-base-100">
                <div class="space-y-2">
                    <h1 class="text-6xl md:text-7xl font-bold">{{ error?.statusCode }}</h1>
                    <h2 class="text-3xl md:text-3xl font-bold">{{ title }}</h2>
                </div>

                <p class="text-lg text-muted-foreground max-w-lg mx-auto">
                    {{ description }}
                </p>
            </div>

            <!-- Actions -->
            <div class="text-primary flex flex-col sm:flex-row gap-6 justify-center items-center mt-20">
                <button class="flex justify-center items-center gap-2">
                    <Icon name="lucide:home" size="16" />
                    <NuxtLink :to="{ path: localePath('/') }">
                        Volver al inicio
                    </NuxtLink>
                </button>

                <button @click="goBack" class="flex justify-center items-center gap-2 bg-transparent cursor-pointer ">
                    <Icon name="lucide:arrow-left" size="16" />
                    Página anterior
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

type Locale = 'en' | 'es'

const { locale } = useI18n()
const errorsList: Record<Locale, {
    "400": string
    "400Desc": string
    "404": string
    "404Desc": string
}> = {
    en: {
        "400": "An error occurred",
        "400Desc": "An error occurred",
        "404": "Page not found",
        "404Desc": "Page not found",
    },
    es: {
        "400": "Ocurrió un error",
        "400Desc": "Ocurrió un error",
        "404": "Página no encontrada",
        "404Desc": "Página no encontrada",
    }
}

const currentLocale = computed<Locale>(() =>
    locale.value.startsWith('es') ? 'es' : 'en'
)

const localePath = useLocalePath()
const props = defineProps<{ error: any }>()
const title = computed(() =>
    props.error?.statusCode === 404
        ? errorsList[currentLocale.value]["404"]
        : errorsList[currentLocale.value]["400"]
)
const router = useRouter()
const goBack = () => { router.back() }
const description = computed(() =>
    props.error?.statusCode === 404
        ? errorsList[currentLocale.value]["404Desc"]
        : errorsList[currentLocale.value]["400Desc"]
)

</script>