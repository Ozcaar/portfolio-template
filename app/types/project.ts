export interface Project {
    id: number
    title: string
    description: string
    longDescription?: string
    tags: string[]
    category: string
    categoryLabel?: string
    image: string
    images?: string[]
    features?: string[]
    techStack?: { name: string; description: string }[]
    demo: string
    github: string
    hasDetails?: boolean
}