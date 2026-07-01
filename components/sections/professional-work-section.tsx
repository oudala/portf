"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

type WorkItem = {
  company: string
  role: string
  organization: string
  period: string
  description: string
  image: string
  technologies: string[]
  highlights: string[]
}

const workItems: WorkItem[] = [
  {
    company: "Oracle",
    role: "APM Session Diagnostics Engineering Intern (PFE Internship)",
    organization: "Oracle Corporation",
    period: "2026 - Present",
    description:
      "Contributed to Oracle APM session diagnostics and observability features, focusing on user session analytics, troubleshooting workflows, and platform diagnostics.",
    image: "/image/events/oracle-apm-defense.png",
    technologies: [
      "Java",
      "Python",
      "Oracle Cloud",
      "REST APIs",
      "Git",
      "CI/CD",
      "Jira",
      "Slack",
      "Oracle APM",
      "Telemetry",
      "Unit testing",
      "Confluence",
      "DevOps Portal",
    ],
    highlights: [
      "Worked on backend improvements, ticket resolution, visualization systems, and enterprise monitoring support.",
      "Supported observability workflows around session diagnostics, analytics, and troubleshooting journeys.",
    ],
  },
  {
    company: "Univade",
    role: "Backend & Cloud Engineering Intern",
    organization: "Univade LCNC Platform",
    period: "Feb 2025 - Jun 2025",
    description:
      "Worked on a Low-Code/No-Code platform integrating backend services, automation pipelines, and cloud deployments.",
    image: "/image/project/online-shop-website-template.jpg",
    technologies: ["Java", "Python", "Spring Boot", "Docker", "AWS", "Azure", "Terraform", "GitHub Actions", "Airflow"],
    highlights: [
      "Developed microservices, CI/CD workflows, and infrastructure automation across AWS and Azure environments.",
      "Connected backend services with automation pipelines for cloud delivery and platform operations.",
    ],
  },
]

export function ProfessionalWorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="professional-work" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold">Professional Work</h2>
        <div className="mt-4 h-[2px] w-16 bg-black"></div>
      </motion.div>

      <div className="grid gap-8">
        {workItems.map((item, index) => (
          <motion.article
            key={item.company}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 * index }}
            className="grid overflow-hidden border border-black bg-white shadow-lg md:grid-cols-[0.8fr_1.2fr]"
          >
            <div className="relative min-h-64 border-b border-black md:min-h-full md:border-b-0 md:border-r">
              <Image src={item.image} alt={`${item.company} work`} fill className="object-cover" unoptimized />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-black/60">{item.company}</p>
                  <h3 className="mt-2 text-2xl font-bold leading-tight">{item.role}</h3>
                  <p className="mt-1 text-black/70">{item.organization}</p>
                </div>
                <span className="w-fit shrink-0 border-2 border-black px-2 py-1 text-sm font-medium">{item.period}</span>
              </div>

              <p className="mt-5 text-base text-black/80 md:text-lg">{item.description}</p>

              <ul className="mt-5 space-y-2 pl-5 text-sm text-black/90 marker:text-black">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="list-disc">
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="mb-2 text-sm font-medium">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="border border-black bg-black/5 px-2 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
