import type { ContentModel } from './content.schema'

export const CONTENT: ContentModel = {
    techStack: [
        "Java",
        "Spring Boot",
        "TypeScript",
        "JavaScript",
        "Nuxt",
        "Vue.js",
        "Nitro",
        ".NET",
        "C#",
        "Tailwind",
        "Python",
        "Docker",
        "PostgreSQL",
        "Git"
    ],

    experience: [
        {
            company: "Castelec Internacional, S.A. de C.V.",
            role: { es: "Desarrollador Web Fullstack", en: "Fullstack Web Developer" },
            duration: { es: "Jun 2024 - Actualidad", en: "Jun 2024 - Present" },
            description: {
                es: "Desarrollo y mantengo nuevas funcionalidades de alto tráfico para el ERP propietario de la empresa, usando tecnologías como Vue.js, JavaScript, C#, ASP.NET y .NET Core. Aplico principios SOLID, metodología SCRUM y buenas prácticas de pruebas unitarias.",
                en: "I develop and maintain new high-traffic features for the company’s proprietary ERP software, using technologies such as Vue.js, JavaScript, C#, ASP.NET, and .NET Core. I apply SOLID principles, SCRUM methodology, and best practices in Unit Testing."
            }
        },
        {
            company: "Sellos y Refacciones de Monterrey, S.A. de C.V.",
            role: { es: "Ingeniero de sistemas", en: "Systems engineer" },
            duration: { es: "Feb 2023 - Mar 2024", en: "Feb 2023 - Mar 2024" },
            description: {
                es: "Construí una aplicación web segura para gestionar los activos, contraseñas y usuarios de la empresa usando Vue.js y Spring Boot.",
                en: "I built a secure web application for managing the company’s assets, passwords, and users using Vue.js and Spring Boot."
            }
        },
        {
            company: "Facultad de Ingeniería Mecánica y Eléctrica UANL",
            role: { es: "Soporte de TI", en: "IT support" },
            duration: { es: "Mar 2020 - Feb 2023", en: "Mar 2020 - Feb 2023" },
            description: {
                es: "Desarrollé aplicaciones en Python para automatizar tareas pesadas y recurrentes para el personal, como creación de minutas, control de asistencia, control de evaluaciones y análisis de datos de cursos, diplomados y programas técnicos.",
                en: "I developed a couple of Python applications to automate heavy and recurring tasks for staff, such as creating meeting minutes, attendance tracking, evaluation control, and data analysis of the numerous courses, diplomas, and technical programs offered."
            }
        }
    ],

    coreExpertise: [
        {
            title: { es: "Ingeniería Frontend", en: "Frontend Engineering" },
            desc: { es: "Vue.js, Nuxt.js, Angular, TypeScript, Tailwind, Figma", en: "Vue.js, Nuxt.js, Angular, TypeScript, Tailwind, Figma" }
        },
        {
            title: { es: "Desarrollo Backend", en: "Backend Development" },
            desc: { es: "Java, Spring Boot, .NET, Python, Diseño de APIs", en: "Java, Spring Boot, .NET, Python, API Design" }
        },
        {
            title: { es: "Arquitectura de Sistemas", en: "System Architecture" },
            desc: { es: "Event-driven, Microservicios", en: "Event-driven, Microservices" }
        },
        {
            title: { es: "Diseño de Bases de Datos", en: "Database Design" },
            desc: { es: "PostgreSQL, MySQL", en: "PostgreSQL, MySQL" }
        },
        {
            title: { es: "DevOps y Despliegue", en: "DevOps & Deployment" },
            desc: { es: "Docker, Kubernetes, CI/CD", en: "Docker, Kubernetes, CI/CD" }
        }
    ],

    experienceTimeline: [
        {
            year: { es: "2022 - Actualidad", en: "2022 - Present" },
            role: { es: "Senior Full Stack Developer", en: "Senior Full Stack Developer" },
            company: "Tech Company",
            description: {
                es: "Liderando decisiones de arquitectura y mentoreando al equipo en buenas prácticas.",
                en: "Leading architecture decisions and mentoring team members on best practices."
            }
        },
        {
            year: { es: "2020 - 2022", en: "2020 - 2022" },
            role: { es: "Full Stack Engineer", en: "Full Stack Engineer" },
            company: "StartUp Inc",
            description: {
                es: "Construí microservicios escalables y lideré la migración de una arquitectura monolítica.",
                en: "Built scalable microservices and led migration from monolith architecture."
            }
        },
        {
            year: { es: "2018 - 2020", en: "2018 - 2020" },
            role: { es: "Junior Developer", en: "Junior Developer" },
            company: "Web Agency",
            description: {
                es: "Comencé con desarrollo frontend y gradualmente me expandí a trabajo full-stack.",
                en: "Started with frontend development, gradually expanded to full-stack work."
            }
        }
    ],

    coreValues: [
        {
            icon: "🎯",
            title: { es: "Calidad primero", en: "Quality First" },
            desc: {
                es: "Priorizo la calidad del código y la mantenibilidad a largo plazo.",
                en: "I prioritize code quality and long-term maintainability."
            }
        },
        {
            icon: "🚀",
            title: { es: "Innovación", en: "Innovation" },
            desc: {
                es: "Siempre explorando nuevas tecnologías y mejores enfoques.",
                en: "Always exploring new technologies and better approaches."
            }
        },
        {
            icon: "🤝",
            title: { es: "Colaboración", en: "Collaboration" },
            desc: {
                es: "Los mejores productos se construyen con trabajo en equipo y buena comunicación.",
                en: "Great products are built through teamwork and communication."
            }
        }
    ],

    faqItems: [
        {
            q: {
                es: "¿Cuál es tu timeline típico para un proyecto?",
                en: "What’s your typical timeline for a project?"
            },
            a: {
                es: "Los proyectos varían en alcance, pero típicamente discutimos tiempos y entregables durante la consulta inicial. Proyectos pequeños pueden tomar 2-4 semanas, mientras que aplicaciones más complejas pueden requerir 2-3 meses o más.",
                en: "Timelines vary by scope, but we typically discuss timelines and milestones during the initial consultation. Small projects can take 2–4 weeks, while more complex applications may require 2–3 months or longer."
            }
        },
        {
            q: { es: "¿Trabajas con startups?", en: "Do you work with startups?" },
            a: {
                es: "¡Absolutamente! Disfruto trabajar con startups y ayudar a dar vida a ideas innovadoras. Ofrezco flexibilidad en la colaboración y puedo adaptarme a presupuestos de startups.",
                en: "Absolutely! I enjoy working with startups and helping bring innovative ideas to life. I’m flexible in how we collaborate and can adapt to startup budgets."
            }
        },
        {
            q: { es: "¿En qué tecnologías te especializas?", en: "What technologies do you specialize in?" },
            a: {
                es: "Me especializo en el stack moderno de JavaScript/TypeScript, particularmente Nuxt.js, Next.js, Vue.js, React, Node.js y arquitecturas de microservicios. También trabajo con Spring Boot, ASP.NET Core, Docker y herramientas de DDD.",
                en: "I specialize in the modern JavaScript/TypeScript stack—especially Nuxt.js, Next.js, Vue.js, React, Node.js, and microservice architectures. I also work with Spring Boot, ASP.NET Core, Docker, and DDD tooling."
            }
        },
        {
            q: { es: "¿Cómo manejas el soporte continuo?", en: "How do you handle ongoing support?" },
            a: {
                es: "Ofrezco paquetes de soporte flexibles para aplicaciones en producción, incluyendo mantenimiento, actualizaciones de funcionalidades y resolución de bugs. Podemos definir la opción que mejor se adapte a tus necesidades.",
                en: "I offer flexible support packages for deployed applications, including maintenance, feature updates, and bug fixes. We can choose an option that best fits your needs."
            }
        },
        {
            q: { es: "¿Ofreces consultoría o code review?", en: "Do you offer consulting or code reviews?" },
            a: {
                es: "Sí. Ofrezco consultoría técnica, revisión de código y auditorías de arquitectura. Si necesitas una segunda opinión o ayuda para optimizar tu stack, con gusto te apoyo.",
                en: "Yes. I offer technical consulting, code reviews, and architecture audits. If you need a second opinion or help optimizing your stack, I’d be happy to help."
            }
        }
    ],

    socialLinks: {
        github: "https://github.com/Ozcaar",
        linkedin: "https://www.linkedin.com/in/ozcaar/",
        email: "oscar.dlpzp@gmail.com"
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
            title: { es: "Plataforma de Microservicios", en: "MicroServices Platform" },
            description: {
                es: "Arquitectura de microservicios empresarial con patrones orientados a eventos y trazabilidad distribuida.",
                en: "Enterprise-grade microservices architecture with event-driven design patterns and distributed tracing."
            },
            longDescription: {
                es: "Plataforma de microservicios empresarial construida con principios de Domain-Driven Design (DDD) y arquitectura orientada a eventos. Incluye monitoreo distribuido, service mesh con Istio, y gestión centralizada de configuración.",
                en: "Enterprise microservices platform built with Domain-Driven Design (DDD) and event-driven architecture. Includes distributed monitoring, an Istio service mesh, and centralized configuration management."
            },
            tags: ["DDD", "Microservices", "Node.js", "Docker"],
            category: "backend",
            image: "/microservices-architecture-dashboard.jpg",
            images: ["/microservices-dashboard-metrics.jpg", "/distributed-tracing-visualization.png"],
            features: [
                { es: "Arquitectura basada en eventos con Kafka", en: "Event-driven architecture with Kafka" },
                { es: "Service discovery con Consul", en: "Service discovery with Consul" },
                { es: "API Gateway centralizado con autenticación JWT", en: "Centralized API Gateway with JWT auth" },
                { es: "Monitoreo y trazabilidad distribuida con Jaeger", en: "Distributed monitoring and tracing with Jaeger" },
                { es: "Circuit breaker y retry patterns", en: "Circuit breaker and retry patterns" },
                { es: "Despliegue automatizado con CI/CD", en: "Automated deployments with CI/CD" }
            ],
            techStack: [
                {
                    name: { es: "Node.js + Express", en: "Node.js + Express" },
                    description: {
                        es: "Backend de microservicios con Express y TypeScript",
                        en: "Microservices backend with Express and TypeScript"
                    }
                },
                {
                    name: { es: "Kafka", en: "Kafka" },
                    description: {
                        es: "Message broker para comunicación asíncrona",
                        en: "Message broker for async communication"
                    }
                },
                {
                    name: { es: "Docker + Kubernetes", en: "Docker + Kubernetes" },
                    description: {
                        es: "Containerización y orquestación",
                        en: "Containerization and orchestration"
                    }
                },
                {
                    name: { es: "PostgreSQL + Redis", en: "PostgreSQL + Redis" },
                    description: {
                        es: "Bases de datos relacionales y caching",
                        en: "Relational databases and caching"
                    }
                }
            ],
            demo: "https://example.com",
            github: "https://github.com",
            hasDetails: true
        },
        {
            id: 2,
            title: { es: "Plataforma E-commerce", en: "E-commerce Platform" },
            description: {
                es: "Solución e-commerce full-stack con pagos, inventario y panel de administración.",
                en: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard."
            },
            longDescription: {
                es: "Solución e-commerce full-stack con pagos, inventario y panel de administración.",
                en: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard."
            },
            tags: ["Full-Stack", "Next.js", "Stripe", "PostgreSQL"],
            category: "full-stack",
            image: "/ecommerce-product-page.jpg",
            demo: "https://example.com",
            github: "https://github.com",
            hasDetails: false
        },
    ]
}
