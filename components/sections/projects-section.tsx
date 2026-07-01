"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

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
      setSectionHeight(`${Math.max(window.innerHeight * 1.8, distance + window.innerHeight)}px`)
    }

    updateMeasurements()
    window.addEventListener("resize", updateMeasurements)
    return () => window.removeEventListener("resize", updateMeasurements)
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-[#f5f0e8] py-12 md:py-16">
        <div className="container mx-auto mb-8 px-4 text-center md:mb-10">
          <h2 className="text-4xl font-bold">Projects</h2>
          <div className="mt-4 h-[2px] w-32 bg-black mx-auto"></div>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-black/70 md:text-base">
            Production platforms, cloud monitoring systems, and engineering libraries built across web, backend, and
            infrastructure work.
          </p>
        </div>

        <div ref={viewportRef} className="relative flex-1 overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full gap-5 px-4 will-change-transform md:gap-8 md:px-8 lg:px-12"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto mt-6 px-4">
          <div className="h-[2px] overflow-hidden bg-black/20">
            <motion.div className="h-full origin-left bg-black" style={{ scaleX: progressScale }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="grid h-full min-w-[86vw] overflow-hidden border border-black bg-white shadow-lg md:min-w-[760px] lg:min-w-[1080px] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative min-h-44 border-b border-black lg:min-h-0 lg:border-b-0 lg:border-r">
        <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized sizes="86vw" />
        <div className="absolute left-4 top-4 border border-black bg-[#f5f0e8]/90 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
          Project {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex min-h-0 flex-col overflow-y-auto p-5 md:p-8 lg:p-10">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <h3 className="text-2xl font-bold leading-tight md:text-3xl">{project.title}</h3>
          <span className="w-fit shrink-0 border-2 border-black px-2 py-1 text-sm font-medium">{project.year}</span>
        </div>

        <p className="text-base text-black/80 md:text-lg">{project.description}</p>

        <ul className="mt-5 space-y-2 pl-5 text-sm text-black/90 marker:text-black">
          {project.bulletPoints.map((point) => (
            <li key={point} className="list-disc">
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <h4 className="mb-2 text-sm font-medium">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="border border-black bg-black/5 px-2 py-1 text-xs">
                {tech}
              </span>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex border border-black bg-black px-4 py-2 text-sm font-medium text-[#f5f0e8] transition-colors hover:bg-black/85"
            >
              {project.linkLabel ?? "View project"}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
