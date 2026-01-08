import { CONTENT } from '~/content/content.data'
import type { Locale } from '~/content/content.schema'
import { ct, normalizeLocale } from '~/content/content.utils'

export function useContent<T>() {
  const { locale } = useI18n()

  const lang = computed<Locale>(() => normalizeLocale(locale.value) as Locale)

  return {
    content: computed(() => CONTENT),

    techStack: computed(() => CONTENT.techStack),

    experience: computed(() =>
      CONTENT.experience.map((x) => ({
        company: x.company,
        role: ct(x.role, lang.value),
        duration: ct(x.duration, lang.value),
        description: ct(x.description, lang.value),
      }))
    ),

    coreExpertise: computed(() =>
      CONTENT.coreExpertise.map((x) => ({
        title: ct(x.title, lang.value),
        desc: ct(x.desc, lang.value),
      }))
    ),

    timeline: computed(() =>
      CONTENT.experienceTimeline.map((x) => ({
        year: ct(x.year, lang.value),
        role: ct(x.role, lang.value),
        company: x.company,
        description: ct(x.description, lang.value),
      }))
    ),

    coreValues: computed(() =>
      CONTENT.coreValues.map((x) => ({
        icon: x.icon,
        title: ct(x.title, lang.value),
        desc: ct(x.desc, lang.value),
      }))
    ),

    faq: computed(() =>
      CONTENT.faqItems.map((x) => ({
        q: ct(x.q, lang.value),
        a: ct(x.a, lang.value),
      }))
    ),

    socialLinks: computed(() => CONTENT.socialLinks),
  }
}
