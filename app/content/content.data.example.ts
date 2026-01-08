import type { ContentModel } from './content.schema'

export const CONTENT: ContentModel = {
    techStack: [
        "Java",
        "Spring Boot",
        "TypeScript",
        "JavaScript",
        "Nuxt",
        "Vue.js",
        "React",
        "Node.js",
        "ASP.NET",
        "C#",
        "Tailwind CSS",
        "Python",
        "Docker",
        "PostgreSQL",
        "Git"
    ],

    experience: [
        {
            company: "Tech Solutions Company",
            role: {
                es: "Desarrollador Full Stack",
                en: "Full Stack Developer"
            },
            duration: {
                es: "Ene 2023 - Actualidad",
                en: "Jan 2023 - Present"
            },
            description: {
                es: "Desarrollo y mantenimiento de aplicaciones web modernas, participando en todo el ciclo de vida del software. Trabajo con equipos multidisciplinarios aplicando buenas prácticas de desarrollo, testing y metodologías ágiles.",
                en: "Development and maintenance of modern web applications, participating across the full software lifecycle. I work with cross-functional teams applying best development practices, testing, and agile methodologies."
            }
        },
        {
            company: "Digital Services Studio",
            role: {
                es: "Ingeniero de Software",
                en: "Software Engineer"
            },
            duration: {
                es: "Mar 2021 - Dic 2022",
                en: "Mar 2021 - Dec 2022"
            },
            description: {
                es: "Construcción de APIs REST y aplicaciones frontend enfocadas en rendimiento, seguridad y escalabilidad. Colaboré en la mejora continua de la arquitectura del sistema.",
                en: "Built REST APIs and frontend applications focused on performance, security, and scalability. Collaborated on continuous improvements to system architecture."
            }
        },
        {
            company: "Educational Institution",
            role: {
                es: "Desarrollador Junior",
                en: "Junior Developer"
            },
            duration: {
                es: "Ago 2019 - Feb 2021",
                en: "Aug 2019 - Feb 2021"
            },
            description: {
                es: "Apoyo en el desarrollo de herramientas internas y automatización de procesos administrativos mediante scripts y aplicaciones web.",
                en: "Assisted in the development of internal tools and automation of administrative processes using scripts and web applications."
            }
        }
    ],

    coreExpertise: [
        {
            title: { es: "Frontend Engineering", en: "Frontend Engineering" },
            desc: {
                es: "Vue.js, Nuxt.js, React, TypeScript, Tailwind CSS",
                en: "Vue.js, Nuxt.js, React, TypeScript, Tailwind CSS"
            }
        },
        {
            title: { es: "Backend Development", en: "Backend Development" },
            desc: {
                es: "Node.js, Spring Boot, ASP.NET Core, REST APIs",
                en: "Node.js, Spring Boot, ASP.NET Core, REST APIs"
            }
        },
        {
            title: { es: "Arquitectura de Software", en: "Software Architecture" },
            desc: {
                es: "Clean Architecture, DDD, Microservicios",
                en: "Clean Architecture, DDD, Microservices"
            }
        },
        {
            title: { es: "Bases de Datos", en: "Databases" },
            desc: {
                es: "PostgreSQL, MySQL, SQL Server",
                en: "PostgreSQL, MySQL, SQL Server"
            }
        },
        {
            title: { es: "DevOps", en: "DevOps" },
            desc: {
                es: "Docker, CI/CD, Cloud Deployments",
                en: "Docker, CI/CD, Cloud Deployments"
            }
        }
    ],

    experienceTimeline: [
        {
            year: { es: "2023 - Actualidad", en: "2023 - Present" },
            role: { es: "Senior Full Stack Developer", en: "Senior Full Stack Developer" },
            company: "Technology Company",
            description: {
                es: "Responsable de decisiones técnicas, revisión de código y acompañamiento técnico al equipo.",
                en: "Responsible for technical decisions, code reviews, and mentoring team members."
            }
        },
        {
            year: { es: "2021 - 2023", en: "2021 - 2023" },
            role: { es: "Full Stack Developer", en: "Full Stack Developer" },
            company: "Startup",
            description: {
                es: "Desarrollo de nuevas funcionalidades y mejora continua del producto.",
                en: "Developed new features and contributed to continuous product improvement."
            }
        },
        {
            year: { es: "2019 - 2021", en: "2019 - 2021" },
            role: { es: "Junior Developer", en: "Junior Developer" },
            company: "Digital Agency",
            description: {
                es: "Primeras experiencias profesionales enfocadas en frontend y automatización.",
                en: "First professional experience focused on frontend and automation."
            }
        }
    ],

    coreValues: [
        {
            icon: "🧠",
            title: { es: "Pensamiento crítico", en: "Critical Thinking" },
            desc: {
                es: "Analizo los problemas desde la raíz para proponer soluciones efectivas.",
                en: "I analyze problems from the ground up to propose effective solutions."
            }
        },
        {
            icon: "⚡",
            title: { es: "Eficiencia", en: "Efficiency" },
            desc: {
                es: "Busco soluciones simples, escalables y sostenibles.",
                en: "I aim for simple, scalable, and sustainable solutions."
            }
        },
        {
            icon: "🤝",
            title: { es: "Trabajo en equipo", en: "Teamwork" },
            desc: {
                es: "La colaboración y la comunicación clara son clave para el éxito.",
                en: "Collaboration and clear communication are key to success."
            }
        }
    ],

    faqItems: [
        {
            q: {
                es: "¿Qué tipo de proyectos realizas?",
                en: "What type of projects do you work on?"
            },
            a: {
                es: "Trabajo en aplicaciones web, plataformas internas, APIs y soluciones personalizadas.",
                en: "I work on web applications, internal platforms, APIs, and custom solutions."
            }
        },
        {
            q: {
                es: "¿Trabajas de forma remota?",
                en: "Do you work remotely?"
            },
            a: {
                es: "Sí, trabajo de forma remota con clientes y equipos de diferentes regiones.",
                en: "Yes, I work remotely with clients and teams from different regions."
            }
        },
        {
            q: {
                es: "¿Cómo manejas la comunicación?",
                en: "How do you handle communication?"
            },
            a: {
                es: "Mantengo comunicación clara y constante mediante reuniones, reportes y seguimiento.",
                en: "I maintain clear and constant communication through meetings, reports, and follow-ups."
            }
        }
    ],

    socialLinks: {
        github: "https://github.com/username",
        linkedin: "https://www.linkedin.com/in/username/",
        email: "contact@example.com"
    }
}
