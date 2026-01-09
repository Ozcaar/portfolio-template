import { z } from 'zod'

// Helpers
const nonEmpty = (label = 'Required') =>
    z.string().trim().min(1, `${label} is required`)

const i18nText = z.object({
    es: nonEmpty('Spanish text'),
    en: nonEmpty('English text'),
})

const url = (label = 'URL') =>
    z.string().trim().url(`${label} invalid format`)

const email = z.string().trim().email('Invalid email address')

// Schemas
export const ExperienceItemSchema = z.object({
    company: nonEmpty('Company'),
    role: i18nText,
    duration: i18nText,
    description: i18nText,
})

export const CoreExpertiseItemSchema = z.object({
    title: i18nText,
    desc: i18nText,
})

export const TimelineItemSchema = z.object({
    year: i18nText,
    role: i18nText,
    company: nonEmpty('Company'),
    description: i18nText,
})

export const CoreValueItemSchema = z.object({
    icon: nonEmpty('Icon'),
    title: i18nText,
    desc: i18nText,
})

export const FaqItemSchema = z.object({
    q: i18nText,
    a: i18nText,
})

export const SocialLinksSchema = z.object({
    github: url('GitHub URL'),
    linkedin: url('LinkedIn URL'),
    email,
})

export const CategoryItemSchema = z.object({
    id: nonEmpty('Category ID'),
    label: i18nText,
})

export const ProjectTechItemSchema = z.object({
    name: i18nText,
    description: i18nText,
})

export const ProjectItemSchema = z.object({
    id: z.number().int().min(1, 'Project ID'),
    title: i18nText,
    description: i18nText,
    longDescription: i18nText.optional(),
    tags: z.array(nonEmpty('Tag')),
    category: nonEmpty('Category'),
    image: nonEmpty('Image'),
    images: z.array(nonEmpty('Image')).optional(),
    features: z.array(i18nText).optional(),
    techStack: z.array(ProjectTechItemSchema).optional(),
    demo: url('Demo URL'),
    github: url('GitHub URL'),
    hasDetails: z.boolean(),
})

export const ContentModelSchema = z.object({
    techStack: z.array(nonEmpty('Tech stack item')).min(1, 'Tech stack empty'),
    experience: z.array(ExperienceItemSchema),
    coreExpertise: z.array(CoreExpertiseItemSchema),
    experienceTimeline: z.array(TimelineItemSchema),
    coreValues: z.array(CoreValueItemSchema),
    faqItems: z.array(FaqItemSchema),
    socialLinks: SocialLinksSchema,
    categories: z.array(CategoryItemSchema),
    projects: z.array(ProjectItemSchema),
})

// Types inferred from schemas
export type ContentModelZ = z.infer<typeof ContentModelSchema>

// Pretty errors for UI
export function formatZodErrors(err: z.ZodError) {
    return err.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
    }))
}
