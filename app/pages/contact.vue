<template>
  <main :class="pageShell">
    <ThinNav />

    <div :class="contentShell">
      <div :class="container">

        <!-- Header -->
        <header class="mb-20 max-w-3xl">
          <div :class="badgeWrap">
            <p :class="badgeText">{{ t('contact.header.badge') }}</p>
          </div>

          <h1 :class="pageTitle">
            {{ t('contact.header.title') }}
          </h1>

          <p class="text-xl leading-relaxed text-muted-foreground">
            {{ t('contact.header.description') }}
          </p>
        </header>

        <div class="mb-16 grid gap-8 lg:grid-cols-3">

          <!-- Contact Form -->
          <section class="lg:col-span-2">
            <div :class="[cardBase, 'h-full p-8']">
              <h2 :class="sectionTitle">{{ t('contact.form.title') }}</h2>

              <form @submit.prevent="handleSubmit" class="h-full space-y-5">
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label for="name" :class="labelClass">
                      {{ t('contact.form.name.label') }} *
                    </label>
                    <input id="name" v-model.trim="formData.name" type="text" name="name" required :class="inputClass"
                      :placeholder="t('contact.form.name.placeholder')" />
                  </div>

                  <div>
                    <label for="email" :class="labelClass">
                      {{ t('contact.form.email.label') }} *
                    </label>
                    <input id="email" v-model.trim="formData.email" type="email" name="email" required
                      :class="inputClass" :placeholder="t('contact.form.email.placeholder')" />
                  </div>
                </div>

                <div>
                  <label for="subject" :class="labelClass">
                    {{ t('contact.form.subject.label') }} *
                  </label>
                  <input id="subject" v-model.trim="formData.subject" type="text" name="subject" required
                    :class="inputClass" :placeholder="t('contact.form.subject.placeholder')" />
                </div>

                <div>
                  <label for="message" :class="labelClass">
                    {{ t('contact.form.message.label') }} *
                  </label>
                  <textarea id="message" v-model.trim="formData.message" name="message" required rows="6"
                    :class="[inputClass, 'resize-none']" :placeholder="t('contact.form.message.placeholder')" />
                </div>

                <button type="submit" :disabled="isSubmitting"
                  :class="[btnBase, btnPrimary, 'w-full md:w-auto px-8 py-6', disabledBtn]">
                  {{
                    submitted
                      ? t('common.buttons.sended')
                      : isSubmitting
                        ? t('common.buttons.sending')
                        : t('common.buttons.submit')
                  }}
                  <Icon name="lucide:send" size="16"
                    class="ml-2 transition-transform group-hover/btn:translate-x-1 group-hover/btn:scale-110" />
                </button>

                <!-- Errors / success -->
                <div v-if="errorData" class="mt-2 text-sm text-red-500">
                  <ul>
                    <li>Error message: {{ errorData.message }}</li>
                    <li v-if="errorData.errCode">Status Code: {{ errorData.errCode }}</li>
                    <li v-if="errorData.trackId">Track ID: {{ errorData.trackId }}</li>
                  </ul>
                </div>

                <p v-else-if="submitted" class="mt-2 text-sm text-green-500">
                  {{ t('contact.form.successMessage') }}
                </p>

                <!-- Honeypot -->
                <input v-model="formData.website" type="text" name="website" class="hidden" tabindex="-1"
                  autocomplete="off" />
              </form>
            </div>
          </section>

          <!-- Sidebar -->
          <aside class="space-y-6">

            <!-- Contact Info -->
            <section :class="[cardBase, 'p-6']">
              <h3 :class="sideTitle">{{ t('contact.contactInfo.title') }}</h3>

              <div class="space-y-4">

                <!-- Email row -->
                <div :class="[infoRow, 'justify-between']">
                  <a :href="`mailto:${socialLinksContent.email}`" class="flex min-w-0 items-center gap-3">
                    <div class="mt-0.5 shrink-0">
                      <Icon name="lucide:mail" size="20" class="text-primary" />
                    </div>

                    <div class="min-w-0">
                      <p :class="infoLabel">Email</p>
                      <p class="truncate text-sm text-foreground transition-smooth group-hover:text-primary">
                        {{ socialLinksContent.email }}
                      </p>
                    </div>
                  </a>

                  <button @click="copyEmail"
                    :aria-label="copied ? t('common.buttons.copiedEmail') : t('common.buttons.copyEmail')"
                    :class="copyBtn">
                    <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" size="20"
                      :class="copied ? 'text-green-500' : 'text-muted-foreground'" />
                  </button>
                </div>

                <!-- Location -->
                <div :class="infoRow">
                  <div class="mt-0.5 shrink-0">
                    <Icon name="lucide:map-pin" size="20" class="text-primary" />
                  </div>

                  <div>
                    <p :class="infoLabel">{{ t('contact.contactInfo.address.label') }}</p>
                    <p class="text-sm text-foreground">{{ t('contact.contactInfo.address.value') }}</p>
                  </div>
                </div>

                <!-- Availability -->
                <div :class="infoRow">
                  <div class="mt-0.5 shrink-0">
                    <Icon name="lucide:phone" size="20" class="text-primary" />
                  </div>

                  <div>
                    <p :class="infoLabel">{{ t('contact.contactInfo.availability.label') }}</p>
                    <p class="text-sm text-foreground">{{ t('contact.contactInfo.availability.value') }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Social Links -->
            <section :class="[cardBase, 'p-6']">
              <h3 :class="sideTitle">{{ t('contact.socialMedia.title') }}</h3>

              <div class="flex flex-wrap gap-3">
                <a v-for="item in socialItems" :key="item.label" :href="item.href" target="_blank"
                  rel="noopener noreferrer" :aria-label="item.label" :class="[socialPillBase, item.color]">
                  <Icon :name="item.icon" size="16" />
                  <span class="text-sm font-medium">{{ item.label }}</span>
                </a>
              </div>
            </section>

            <!-- Quick Info -->
            <section :class="quickInfoCard">
              <h3 :class="sideTitleSm">{{ t('contact.quickResponse.title') }}</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ t('contact.quickResponse.description') }}
              </p>
            </section>
          </aside>
        </div>

        <!-- FAQ -->
        <section :class="[cardBase, 'p-8 md:p-10']">
          <h2 :class="faqTitle">{{ t('contact.faq.title') }}</h2>

          <div class="divide-y divide-border space-y-1">
            <details v-for="(item, idx) in faq" :key="idx" class="group cursor-pointer py-5">
              <summary :class="faqSummary">
                <span>{{ item.q }}</span>

                <span class="ml-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>

              <p class="mt-3 pr-8 text-sm leading-relaxed text-muted-foreground">
                {{ item.a }}
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { SocialItem } from '~/types/SocialItem'
import type { SocialLinks as SocialLinksType } from '~/content/content.schema'

const { faq, socialLinks: socialLinksContent } = useContent<{ socialLinks: SocialLinksType }>()

const { t, locale } = useI18n()

const copied = ref(false)
type Err = { message: string; trackId?: string; errCode?: number }
const submitted = ref(false)
const isSubmitting = ref(false)
const errorData = ref<Err | null>(null)

let timeout: number | undefined

const formData = reactive({
  lang: locale.value,
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
  startedAt: Date.now(),
})

// Presets
const pageShell = 'font-poppins min-h-screen bg-background'
const contentShell = 'px-6 pt-32 pb-20'
const container = 'mx-auto max-w-6xl'

const badgeWrap = 'mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1'
const badgeText = 'text-xs font-semibold text-primary uppercase tracking-wider'
const pageTitle = 'mb-6 text-5xl font-bold md:text-6xl text-balance'

const cardBase = 'rounded-xl border border-border bg-card'
const sectionTitle = 'mb-6 text-2xl font-bold'

const labelClass = 'mb-2 block text-sm font-medium text-foreground'

const inputClass =
  'w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground ' +
  'placeholder:text-muted-foreground transition-smooth ' +
  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'

const btnBase = 'btn group/btn border-0 shadow flex items-center justify-center gap-2 rounded-lg font-semibold transition-smooth'
const btnPrimary = 'bg-primary text-primary-foreground hover:bg-primary/90'
const disabledBtn = 'disabled:opacity-60 disabled:cursor-not-allowed'

const sideTitle = 'mb-4 text-lg font-semibold'
const sideTitleSm = 'mb-3 text-lg font-semibold'

const infoRow =
  'group flex items-center gap-3 rounded-lg p-3 transition-smooth hover:bg-background'
const infoLabel = 'mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'

const copyBtn = 'shrink-0 rounded-md p-2 transition-smooth hover:bg-muted'

const socialPillBase =
  'flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 transition-smooth'

const quickInfoCard =
  'rounded-xl border border-primary/20 bg-linear-to-br from-primary/10 to-secondary/10 p-6'

const faqTitle = 'mb-8 text-2xl font-bold md:text-3xl'
const faqSummary =
  'list-none flex items-center justify-between font-semibold transition-smooth hover:text-primary'

// Actions
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(socialLinksContent.value.email)
    copied.value = true
    clearTimeout(timeout)
    timeout = window.setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error(locale.value === 'en' ? 'Cannot copy the email' : 'No se pudo copiar el correo', err)
  }
}

async function handleSubmit() {
  submitted.value = false
  errorData.value = null
  isSubmitting.value = true

  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...formData } })
    submitted.value = true

    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''
    formData.website = ''
  } catch (err: any) {
    errorData.value = {
      message: err?.statusMessage ?? t('contact.form.errorMessage'),
      errCode: err?.statusCode ?? 500,
      trackId: err?.data?.data?.trackId,
    }
  } finally {
    isSubmitting.value = false
  }
}

// Data
const socialItems = computed<SocialItem[]>(() => [
  {
    icon: 'lucide:github',
    label: 'GitHub',
    href: socialLinksContent.value.github,
    color: 'hover:bg-accent/10 hover:border-accent/50 hover:text-accent',
  },
  {
    icon: 'lucide:linkedin',
    label: 'LinkedIn',
    href: socialLinksContent.value.linkedin,
    color: 'hover:bg-primary/10 hover:border-primary/50 hover:text-primary',
  },
  {
    icon: 'lucide:mail',
    label: 'Email',
    href: 'mailto:' + socialLinksContent.value.email,
    color: 'hover:bg-secondary/10 hover:border-secondary/50 hover:text-secondary',
  },
])
</script>
