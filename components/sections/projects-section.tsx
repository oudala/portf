"use client"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string
  year: string
  technologies: string[]
  bulletPoints: string[]
}

const projects: Project[] = [
  {
    id: "multimodal-store",
    title: "Multimodal Store Management System",
    description: "A Flask-based store management system with advanced search capabilities.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2024",
    technologies: ["Flask", "Python", "TensorFlow", "JavaScript"],
    bulletPoints: [
      "Created a Flask-based store management system featuring advanced search capabilities through image recognition and voice commands.",
      "Implemented computer vision algorithms to identify products from images, allowing for inventory management through photo uploads.",
      "Integrated speech-to-text functionality enabling voice command operations for hands-free inventory control.",
      "Designed a responsive web interface with real-time inventory updates and multimodal search options.",
    ],
  },
  {
    id: "invoices-management",
    title: "Feature-Rich Invoices Management System",
    description: "A comprehensive invoices management system using Laravel framework.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2024",
    technologies: ["Laravel", "Spatie", "Breeze", "Laravel UI", "Laravel Charts", "Laravel Mailer", "Notifications"],
    bulletPoints: [
      "Developed a comprehensive invoices management system using Laravel framework with intuitive interface and robust functionality.",
      "Implemented secure authentication with Laravel Breeze and advanced role-based access control using Laravel Spatie Permission.",
      "Built automated notification system using Laravel Mailer and integrated real-time data visualization with Laravel Charts.",
      "Created polished video presentation showcasing system functionality and features for client demonstrations.",
    ],
  },
  {
    id: "myorm",
    title: "MyORM – Lightweight Java ORM Library",
    description: "A custom Java ORM to understand annotation-based object-relational mapping.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2025",
    technologies: ["Java", "Reflection", "JDBC", "Annotations", "Caffeine", "Maven"],
    bulletPoints: [
      "Built a custom Java ORM to understand annotation-based object-relational mapping.",
      "Used reflection for dynamic mapping, with built-in CRUD and ACID transaction support.",
      "Integrated Caffeine caching and multi-database support (MySQL, PostgreSQL, SQLite).",
      "Packaged as a Maven-compatible library and published on GitHub.",
    ],
  },
  {
    id: "memory-hashmap",
    title: "Persistent, Memory-Efficient Java HashMap",
    description: "A custom MemoryHashMap with optimized serialization and deserialization.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2025",
    technologies: ["Java", "JUnit", "VisualVM", "Custom Serialization", "Profiling", "Memory Optimization"],
    bulletPoints: [
      "Built a custom MemoryHashMap with optimized serialization and deserialization to overcome limitations of standard Java HashMaps for persistent data storage.",
      "Used VisualVM for performance profiling to identify and eliminate bottlenecks, improving save times by 28x (146,819ms→5,162ms) and load times by 1.8x (110,372ms→60,680ms).",
      "Reduced memory consumption by 39% (492MB→299MB heap usage) while maintaining full data integrity.",
      "Implemented comprehensive edge case testing and verification using JUnit to ensure reliability across various usage scenarios.",
    ],
  },
  {
    id: "nlp-platform",
    title: "NLP Annotation Platform",
    description: "A collaborative text annotation web platform for NLP classification tasks.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2025",
    technologies: ["Spring Boot", "React", "MySQL", "Spring Security", "OAuth2", "Thymeleaf", "Python NLP libraries"],
    bulletPoints: [
      "Developed a collaborative text annotation web platform for NLP classification tasks using Spring Boot and React with OAuth2 authentication.",
      "Implemented role-based access control allowing administrators to manage datasets, assign annotators, and monitor annotation progress.",
      "Built an intelligent system to detect annotation quality metrics and identify potential spammers among annotators.",
      "Integrated Python ML pipeline execution directly from the admin interface to train and test NLP models on annotated data.",
    ],
  },
]

// Replace the entire ProjectsSection component with this simplified version
export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Projects</h2>
          <div className="mt-4 h-[2px] w-32 bg-black mx-auto"></div>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={project.id} className="bg-white shadow-lg border border-black/10 p-6">
              <ProjectCard project={project} isReversed={index % 2 !== 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, isReversed }: { project: Project; isReversed: boolean }) {
  return (
    <div className={`grid gap-8 ${isReversed ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"} items-center`}>
      <div className={`order-2 ${isReversed ? "md:order-1" : "md:order-2"}`}>
        <div className="overflow-hidden border-2 border-black shadow-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className={`order-1 ${isReversed ? "md:order-2" : "md:order-1"}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <span className="text-sm border-2 border-black px-2 py-1 font-medium">{project.year}</span>
          </div>

          <p className="text-black/80 text-lg">{project.description}</p>

          <ul className="space-y-2 list-disc pl-5">
            {project.bulletPoints.map((point, index) => (
              <li key={index} className="text-sm text-black/90">
                {point}
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs border border-black px-2 py-1 bg-black/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
