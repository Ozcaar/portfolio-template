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

    categories: computed(() =>
      CONTENT.categories.map((category) => ({
        id: category.id,
        label: ct(category.label, lang.value),
      }))
    ),

    projects: computed(() => {
      const categoryLabels = new Map(
        CONTENT.categories.map((category) => [category.id, ct(category.label, lang.value)])
      )

      return CONTENT.projects.map((project) => ({
        id: project.id,
        title: ct(project.title, lang.value),
        description: ct(project.description, lang.value),
        longDescription: project.longDescription ? ct(project.longDescription, lang.value) : undefined,
        tags: project.tags,
        category: project.category,
        categoryLabel: categoryLabels.get(project.category) ?? project.category,
        image: project.image,
        images: project.images,
        features: project.features?.map((feature) => ct(feature, lang.value)),
        techStack: project.techStack?.map((tech) => ({
          name: ct(tech.name, lang.value),
          description: ct(tech.description, lang.value),
        })),
        demo: project.demo,
        github: project.github,
        hasDetails: project.hasDetails,
      }))
    }),
  }
}
