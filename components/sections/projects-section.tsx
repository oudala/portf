"use client"

import { type CSSProperties, useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  year: string
  technologies: string[]
  bulletPoints: string[]
  url?: string
  linkLabel?: string
}

const projects: Project[] = [
  {
    id: "crescendo-baby-music",
    title: "Crescendo Baby Music Management Platform",
    description:
      "A production-ready full-stack platform for managing children's music classes, bookings, subscriptions, attendance, payments, waitlists, scheduling, and admin operations.",
    image: "/image/project/ChatGPT Image 23 mai 2025, 16_19_33.png",
    year: "2025 - Present",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "Twilio WhatsApp API",
      "Cloudinary",
      "Jest",
      "Playwright",
      "Vercel",
    ],
    bulletPoints: [
      "Built secure authentication, booking, subscription, attendance, payment, waitlist, scheduling, and admin workflows for a real production platform.",
      "Implemented QR attendance tracking, WhatsApp notifications, analytics dashboards, and automation flows for daily operations.",
      "Designed full-stack data flows with Prisma, PostgreSQL, Supabase, and Vercel deployment practices.",
    ],
    url: "https://booking.crescendobabymusic.com",
    linkLabel: "booking.crescendobabymusic.com",
  },
  {
    id: "aws-cost-monitoring",
    title: "AWS Cost Monitoring System",
    description:
      "An intelligent cloud surveillance system with anomaly detection and automated Slack alerts for AWS cost monitoring.",
    image: "/image/project/store.png",
    year: "2025",
    technologies: ["AWS Lambda", "S3", "EventBridge", "Python", "Next.js", "TypeScript", "Tailwind CSS", "Gemini AI"],
    bulletPoints: [
      "Built a serverless architecture to monitor AWS cost patterns and flag suspicious spending changes.",
      "Implemented anomaly detection and automated Slack alerts for fast incident visibility.",
      "Connected cloud telemetry with a lightweight Next.js interface for cost surveillance and review.",
    ],
  },
  {
    id: "nlp-platform",
    title: "NLP Annotation Platform",
    description: "A collaborative text annotation web platform for NLP classification tasks.",
    image: "/image/project/nlp.jpeg",
    year: "2025",
    technologies: ["Spring Boot", "React", "MySQL", "Spring Security", "OAuth2", "Thymeleaf", "Python NLP libraries"],
    bulletPoints: [
      "Developed a collaborative text annotation web platform for NLP classification tasks using Spring Boot and React with OAuth2 authentication.",
      "Implemented role-based access control allowing administrators to manage datasets, assign annotators, and monitor annotation progress.",
      "Built an intelligent system to detect annotation quality metrics and identify potential spammers among annotators.",
      "Integrated Python ML pipeline execution directly from the admin interface to train and test NLP models on annotated data.",
    ],
    url: "https://github.com/oudala/API-REST-s-curis-e-de-gestion-de-t-ches-collaboratives",
    linkLabel: "GitHub",
  },
  {
    id: "memory-hashmap",
    title: "Persistent, Memory-Efficient Java HashMap",
    description: "A custom MemoryHashMap with optimized serialization and deserialization.",
    image: "/image/project/hashmap.jpeg",
    year: "2025",
    technologies: ["Java", "JUnit", "VisualVM", "Custom Serialization", "Profiling", "Memory Optimization"],
    bulletPoints: [
      "Built a custom MemoryHashMap with optimized serialization and deserialization to overcome limitations of standard Java HashMaps for persistent data storage.",
      "Used VisualVM for performance profiling to identify and eliminate bottlenecks, improving save times by 28x (146,819ms→5,162ms) and load times by 1.8x (110,372ms→60,680ms).",
      "Reduced memory consumption by 39% (492MB→299MB heap usage) while maintaining full data integrity.",
      "Implemented comprehensive edge case testing and verification using JUnit to ensure reliability across various usage scenarios.",
    ],
    url: "https://github.com/oudala/memorymap",
    linkLabel: "GitHub",
  },
  {
    id: "myorm",
    title: "MyORM – Lightweight Java ORM Library",
    description: "A custom Java ORM to understand annotation-based object-relational mapping.",
    image: "/image/project/orm.jpeg",
    year: "2025",
    technologies: ["Java", "Reflection", "JDBC", "Annotations", "Caffeine", "Maven"],
    bulletPoints: [
      "Built a custom Java ORM to understand annotation-based object-relational mapping.",
      "Used reflection for dynamic mapping, with built-in CRUD and ACID transaction support.",
      "Integrated Caffeine caching and multi-database support (MySQL, PostgreSQL, SQLite).",
      "Packaged as a Maven-compatible library and published on GitHub.",
    ],
    url: "https://github.com/oudala/My-ORM",
    linkLabel: "GitHub",
  },
  {
    id: "multimodal-store",
    title: "Multimodal Store Management System",
    description: "A Flask-based store management system with advanced search capabilities.",
    image: "/image/project/pystore.png",
    year: "2024",
    technologies: ["Flask", "Python", "TensorFlow", "JavaScript"],
    bulletPoints: [
      "Created a Flask-based store management system featuring advanced search capabilities through image recognition and voice commands.",
      "Implemented computer vision algorithms to identify products from images, allowing for inventory management through photo uploads.",
      "Integrated speech-to-text functionality enabling voice command operations for hands-free inventory control.",
      "Designed a responsive web interface with real-time inventory updates and multimodal search options.",
    ],
    url: "https://github.com/oudala/AI-Powered-Visual-and-Voice-Product-Search",
    linkLabel: "GitHub",
  },
  {
    id: "invoices-management",
    title: "Feature-Rich Invoices Management System",
    description: "A comprehensive invoices management system using Laravel framework.",
    image: "/image/project/books-paying-bills-make-instant@2x-1.png",
    year: "2024",
    technologies: ["Laravel", "Spatie", "Breeze", "Laravel UI", "Laravel Charts", "Laravel Mailer", "Notifications"],
    bulletPoints: [
      "Developed a comprehensive invoices management system using Laravel framework with intuitive interface and robust functionality.",
      "Implemented secure authentication with Laravel Breeze and advanced role-based access control using Laravel Spatie Permission.",
      "Built automated notification system using Laravel Mailer and integrated real-time data visualization with Laravel Charts.",
      "Created polished video presentation showcasing system functionality and features for client demonstrations.",
    ],
    url: "https://github.com/oudala/invoices-management",
    linkLabel: "GitHub",
  },
]

const accentColors = ["#a34730", "#2f6f73", "#6b5d95", "#31636f", "#8a6a25", "#4f6f45", "#9c4f65"]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [sectionHeight, setSectionHeight] = useState("320vh")

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.08, 1])

  useEffect(() => {
    const updateMeasurements = () => {
      const viewportWidth = viewportRef.current?.offsetWidth ?? 0
      const trackWidth = trackRef.current?.scrollWidth ?? 0
      const distance = Math.max(0, trackWidth - viewportWidth)

      setScrollDistance(distance)
      setSectionHeight(`${Math.max(window.innerHeight * 1.35, distance + window.innerHeight * 0.85)}px`)
    }

    updateMeasurements()
    window.addEventListener("resize", updateMeasurements)
    return () => window.removeEventListener("resize", updateMeasurements)
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-[#f5f0e8] py-10 md:py-12">
        <div className="container mx-auto mb-5 px-4 text-center md:mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Selected builds</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Projects</h2>
          <div className="mx-auto mt-4 h-[2px] w-24 bg-black"></div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/65">
            Production platforms, cloud monitoring systems, and engineering libraries built across web, backend, and
            infrastructure work.
          </p>
        </div>

        <div ref={viewportRef} className="relative flex-1 overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full items-center gap-4 px-4 pb-2 will-change-transform md:gap-5 md:px-8 lg:gap-6 lg:px-12"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto mt-6 px-4">
          <div className="mx-auto h-[2px] max-w-3xl overflow-hidden bg-black/15">
            <motion.div className="h-full origin-left bg-black" style={{ scaleX: progressScale }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visibleTech = project.technologies.slice(0, 7)
  const hiddenTechCount = project.technologies.length - visibleTech.length
  const accentColor = accentColors[index % accentColors.length]

  return (
    <article
      className="group flex h-[clamp(455px,61vh,560px)] min-w-[min(84vw,350px)] flex-col overflow-hidden rounded-[6px] border border-black/10 bg-[#fffaf6] shadow-[0_18px_45px_rgba(0,0,0,0.10)] ring-1 ring-white/60 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] sm:min-w-[380px] md:min-w-[420px] lg:min-w-[455px] xl:min-w-[480px]"
      style={{ "--project-accent": accentColor } as CSSProperties}
    >
      <div className="relative h-40 shrink-0 overflow-hidden bg-black sm:h-44 lg:h-48">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          unoptimized
          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 455px, (min-width: 768px) 420px, 84vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="rounded-full bg-[#f5f0e8] px-3 py-1 text-xs font-semibold text-black shadow-sm">
            {project.year}
          </span>
          <span className="h-2 w-12 rounded-full bg-[var(--project-accent)]" />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 md:p-6">
        <h3 className="line-clamp-2 text-xl font-bold leading-tight text-black md:text-2xl">{project.title}</h3>
        <p className="line-clamp-3 mt-3 text-sm leading-6 text-black/68">{project.description}</p>

        <ul className="mt-4 space-y-2 text-sm leading-5 text-black/78">
          {project.bulletPoints.slice(0, 2).map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--project-accent)]" />
              <span className="line-clamp-2">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {visibleTech.map((tech) => (
              <span key={tech} className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] text-black/70">
                {tech}
              </span>
            ))}
            {hiddenTechCount > 0 && (
              <span className="rounded-full border border-black/10 bg-black px-2.5 py-1 text-[11px] text-[#f5f0e8]">
                +{hiddenTechCount}
              </span>
            )}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-[#f5f0e8] transition-colors hover:bg-black/85"
            >
              {project.linkLabel ?? "View project"}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
