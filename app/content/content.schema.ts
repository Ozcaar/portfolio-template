export type Locale = 'es' | 'en'
export type I18nText = { es: string; en: string }

export type ExperienceItem = {
    company: string
    role: I18nText
    duration: I18nText
    description: I18nText
}

export type CoreExpertiseItem = {
    title: I18nText
    desc: I18nText
}

export type TimelineItem = {
    year: I18nText
    role: I18nText
    company: string
    description: I18nText
}

export type CoreValueItem = {
    icon: string
    title: I18nText
    desc: I18nText
}

export type FaqItem = {
    q: I18nText
    a: I18nText
}

export type SocialLinks = {
    github: string
    linkedin: string
    email: string
}

export type ContentModel = {
    techStack: string[]
    experience: ExperienceItem[]
    coreExpertise: CoreExpertiseItem[]
    experienceTimeline: TimelineItem[]
    coreValues: CoreValueItem[]
    faqItems: FaqItem[]
    socialLinks: SocialLinks
}
