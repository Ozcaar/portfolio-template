import type { ContentModel } from './content.schema'

export const CONTENT: ContentModel = {
  techStack: [
    "TypeScript",
    "JavaScript",
    "Nuxt",
    "Vue.js",
    "React",
    "Node.js",
    "Java",
    "Spring Boot",
    ".NET",
    "C#",
    "PostgreSQL",
    "Docker",
    "Git",
    "Tailwind"
  ],

  experience: [
    {
      company: "Tech Company, Inc.",
      role: { es: "Desarrollador Web Fullstack", en: "Fullstack Web Developer" },
      duration: { es: "2023 - Actualidad", en: "2023 - Present" },
      description: {
        es: "Desarrollo funcionalidades de producto en un entorno ágil, colaborando con diseño y backend. Me enfoco en rendimiento, accesibilidad y calidad de código.",
        en: "I build product features in an agile environment, collaborating with design and backend. I focus on performance, accessibility, and code quality."
      }
    },
    {
      company: "Startup Studio",
      role: { es: "Ingeniero de Software", en: "Software Engineer" },
      duration: { es: "2021 - 2023", en: "2021 - 2023" },
      description: {
        es: "Construí módulos frontend y APIs para varios productos, mejorando tiempos de carga y flujos críticos de negocio.",
        en: "Built frontend modules and APIs for multiple products, improving load times and critical business flows."
      }
    },
    {
      company: "Digital Agency",
      role: { es: "Desarrollador Junior", en: "Junior Developer" },
      duration: { es: "2019 - 2021", en: "2019 - 2021" },
      description: {
        es: "Participé en sitios y apps para clientes, trabajando en UI, integraciones y mantenimiento.",
        en: "Worked on client sites and apps, handling UI, integrations, and maintenance."
      }
    }
  ],

  coreExpertise: [
    {
      title: { es: "Ingeniería Frontend", en: "Frontend Engineering" },
      desc: { es: "Vue/Nuxt, React, TypeScript, UI Systems", en: "Vue/Nuxt, React, TypeScript, UI Systems" }
    },
    {
      title: { es: "Desarrollo Backend", en: "Backend Development" },
      desc: { es: "APIs, Spring Boot, .NET, Node.js", en: "APIs, Spring Boot, .NET, Node.js" }
    },
    {
      title: { es: "Arquitectura", en: "Architecture" },
      desc: { es: "Clean Architecture, DDD, Event-driven", en: "Clean Architecture, DDD, Event-driven" }
    },
    {
      title: { es: "Bases de Datos", en: "Databases" },
      desc: { es: "PostgreSQL, MySQL, Modeling", en: "PostgreSQL, MySQL, Modeling" }
    },
    {
      title: { es: "DevOps", en: "DevOps" },
      desc: { es: "Docker, CI/CD, Deployments", en: "Docker, CI/CD, Deployments" }
    }
  ],

  experienceTimeline: [
    {
      year: { es: "2023 - Actualidad", en: "2023 - Present" },
      role: { es: "Senior Full Stack Developer", en: "Senior Full Stack Developer" },
      company: "Tech Company",
      description: {
        es: "Liderando entregas, buenas prácticas y decisiones de arquitectura a nivel producto.",
        en: "Leading delivery, best practices, and product-level architecture decisions."
      }
    },
    {
      year: { es: "2021 - 2023", en: "2021 - 2023" },
      role: { es: "Full Stack Engineer", en: "Full Stack Engineer" },
      company: "StartUp Inc",
      description: {
        es: "Construí features end-to-end y mejoré performance y observabilidad.",
        en: "Built end-to-end features and improved performance and observability."
      }
    },
    {
      year: { es: "2019 - 2021", en: "2019 - 2021" },
      role: { es: "Junior Developer", en: "Junior Developer" },
      company: "Web Agency",
      description: {
        es: "Colaboré en múltiples proyectos web, desde UI hasta integraciones.",
        en: "Contributed to multiple web projects, from UI to integrations."
      }
    }
  ],

  coreValues: [
    {
      icon: "🎯",
      title: { es: "Calidad primero", en: "Quality First" },
      desc: { es: "Código claro, mantenible y medible.", en: "Clear, maintainable, measurable code." }
    },
    {
      icon: "🚀",
      title: { es: "Mejora continua", en: "Continuous Improvement" },
      desc: { es: "Itero, mido y optimizo sin drama.", en: "Iterate, measure, and optimize without drama." }
    },
    {
      icon: "🤝",
      title: { es: "Trabajo en equipo", en: "Teamwork" },
      desc: { es: "Comunicación honesta y objetivos compartidos.", en: "Honest communication and shared goals." }
    }
  ],

  faqItems: [
    {
      q: { es: "¿Cuál es tu timeline típico para un proyecto?", en: "What’s your typical timeline for a project?" },
      a: {
        es: "Depende del alcance. Un landing o MVP pequeño puede tomar 2–4 semanas. Productos más completos suelen ir de 6–12 semanas.",
        en: "It depends on scope. A small landing or MVP can take 2–4 weeks. More complete products usually take 6–12 weeks."
      }
    },
    {
      q: { es: "¿Trabajas con startups?", en: "Do you work with startups?" },
      a: {
        es: "Sí. Me adapto al ritmo y priorizamos lo que mueve la aguja: MVP, validación y mejoras por iteraciones.",
        en: "Yes. I adapt to the pace and we prioritize what moves the needle: MVP, validation, and iterative improvements."
      }
    },
    {
      q: { es: "¿En qué tecnologías te especializas?", en: "What technologies do you specialize in?" },
      a: {
        es: "Principalmente TypeScript (Nuxt/Vue/React), APIs (Node/Spring/.NET), y bases de datos (PostgreSQL).",
        en: "Mainly TypeScript (Nuxt/Vue/React), APIs (Node/Spring/.NET), and databases (PostgreSQL)."
      }
    },
    {
      q: { es: "¿Cómo manejas el soporte continuo?", en: "How do you handle ongoing support?" },
      a: {
        es: "Ofrezco soporte por bloques de horas o mensual: mantenimiento, mejoras y corrección de bugs.",
        en: "I offer support via hour blocks or monthly: maintenance, improvements, and bug fixes."
      }
    },
    {
      q: { es: "¿Ofreces consultoría o code review?", en: "Do you offer consulting or code reviews?" },
      a: {
        es: "Sí: revisiones de PRs, auditoría rápida y recomendaciones accionables para mejorar arquitectura y DX.",
        en: "Yes: PR reviews, quick audits, and actionable recommendations to improve architecture and DX."
      }
    }
  ],

  socialLinks: {
    github: "https://github.com/example",
    linkedin: "https://www.linkedin.com/in/example/",
    email: "hello@example.com"
  },

  categories: [
    { id: "all", label: { es: "Todos", en: "All" } },
    { id: "frontend", label: { es: "Frontend", en: "Frontend" } },
    { id: "backend", label: { es: "Backend", en: "Backend" } },
    { id: "full-stack", label: { es: "Full-Stack", en: "Full-Stack" } }
  ],

  projects: [
    {
      id: 1,
      title: { es: "Dashboard de Analítica", en: "Analytics Dashboard" },
      description: {
        es: "Panel de analítica con filtros, métricas y exportación.",
        en: "Analytics dashboard with filters, metrics, and exports."
      },
      longDescription: {
        es: "Proyecto demostrativo con autenticación, gráficas, tablas y estados vacíos. Incluye buenas prácticas de UI y manejo de errores.",
        en: "Demo project with authentication, charts, tables, and empty states. Includes UI best practices and error handling."
      },
      tags: ["Frontend", "Nuxt", "TypeScript", "Charts"],
      category: "frontend",
      image: "/project-analytics-cover.jpg",
      images: ["/project-analytics-1.jpg", "/project-analytics-2.jpg"],
      features: [
        { es: "Filtros avanzados y búsqueda", en: "Advanced filters and search" },
        { es: "Gráficas y tablas responsivas", en: "Responsive charts and tables" },
        { es: "Exportación CSV", en: "CSV export" },
        { es: "Estados vacíos y manejo de errores", en: "Empty states and error handling" }
      ],
      techStack: [
        {
          name: { es: "Nuxt + Vue", en: "Nuxt + Vue" },
          description: { es: "Interfaz con SSR/SPA híbrido", en: "UI with hybrid SSR/SPA" }
        },
        {
          name: { es: "TypeScript", en: "TypeScript" },
          description: { es: "Tipado y DX", en: "Typing and DX" }
        },
        {
          name: { es: "Tailwind", en: "Tailwind" },
          description: { es: "Diseño utilitario", en: "Utility-first styling" }
        }
      ],
      demo: "https://example.com",
      github: "https://github.com/example/repo",
      hasDetails: true
    },
    {
      id: 2,
      title: { es: "API de Tareas", en: "Tasks API" },
      description: {
        es: "API REST con CRUD, validación y autenticación.",
        en: "REST API with CRUD, validation, and authentication."
      },
      longDescription: {
        es: "Proyecto demostrativo backend con endpoints documentados, validaciones y estructura limpia.",
        en: "Demo backend project with documented endpoints, validations, and a clean structure."
      },
      tags: ["Backend", "API", "PostgreSQL"],
      category: "backend",
      image: "/project-api-cover.jpg",
      demo: "https://example.com",
      github: "https://github.com/example/repo-api",
      hasDetails: false
    }
  ]
}
