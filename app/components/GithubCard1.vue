<template>
  <div :class="[cardBase, cardHover]">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4">
      <div class="min-w-0">
        <p :class="kicker">GitHub</p>
        <h3 class="truncate text-xl font-semibold">
          {{ displayName }}
        </h3>
      </div>

      <a v-if="profileUrl" :href="profileUrl" target="_blank" rel="noreferrer" class="btn btn-primary btn-sm">
        Ver perfil <span class="ml-1">↗</span>
      </a>
    </div>

    <!-- States -->
    <p v-if="pending" :class="stateText">Cargando GitHub…</p>
    <p v-else-if="error" :class="[stateText, 'text-red-400']">No se pudieron cargar los datos.</p>

    <!-- Content -->
    <div v-else-if="ready" class="mt-6 space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Repos" :value="stats.publicRepos" />
        <Stat label="Followers" :value="stats.followers" />
        <Stat label="Stars" :value="stats.totalStars" />
        <Stat label="Forks" :value="stats.totalForks" />
      </div>

      <!-- Top repos -->
      <section>
        <header class="flex items-center justify-between">
          <p class="text-sm font-medium">Repos destacados</p>
          <span class="text-xs text-muted-foreground">Top por ⭐</span>
        </header>

        <div class="mt-3 grid gap-3">
          <a v-for="r in topRepos" :key="r.url" :href="r.url" target="_blank" rel="noreferrer" :class="repoCard">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="truncate font-semibold">{{ r.name }}</p>

                <p class="line-clamp-2 text-sm text-muted-foreground">
                  {{ r.description || 'Sin descripción' }}
                </p>

                <p v-if="r.language" class="mt-2 text-xs text-muted-foreground">
                  {{ r.language }}
                </p>
              </div>

              <div :class="repoMeta">
                <span>⭐ {{ r.stars }}</span>
                <span>🍴 {{ r.forks }}</span>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = useGithubSummary()

// Base card
const cardBase =
  'relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between font-poppins bg-card border-border'

const cardHover = 'transition-smooth hover:border-primary/50'

const kicker = 'text-xs font-medium uppercase tracking-wide text-muted-foreground'
const stateText = 'mt-6 text-sm text-muted-foreground'

const repoCard =
  'rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10'

const repoMeta = 'shrink-0 flex gap-2 text-xs text-muted-foreground'

// Derived
const ready = computed(() => !!data.value)

const displayName = computed(() => {
  const u = data.value?.user
  return u?.name ?? u?.login ?? 'GitHub'
})

const profileUrl = computed(() => data.value?.user?.url || '')

const stats = computed(() => data.value!.stats)
const topRepos = computed(() => data.value!.topRepos)
</script>
