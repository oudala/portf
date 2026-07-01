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
  accent: string
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
    accent: "#c74634",
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
    image: "/image/work/univade-website.png",
    accent: "#ff6a00",
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

      <div className="grid gap-6">
        {workItems.map((item, index) => (
          <motion.article
            key={item.company}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 * index }}
            className="group grid overflow-hidden rounded-[6px] border border-black/10 bg-[#fffaf6] shadow-[0_16px_45px_rgba(0,0,0,0.10)] ring-1 ring-white/70 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(0,0,0,0.14)] lg:grid-cols-[0.82fr_1.18fr]"
          >
            <div className="relative min-h-[260px] overflow-hidden bg-black lg:min-h-full">
              <Image
                src={item.image}
                alt={`${item.company} work`}
                fill
                className="object-cover opacity-90 transition duration-700 group-hover:scale-105"
                unoptimized
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-transparent" />
              <div
                className="absolute bottom-4 left-4 h-2 w-16 rounded-full"
                style={{ backgroundColor: item.accent }}
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">{item.company}</p>
                  <h3 className="mt-2 max-w-3xl text-2xl font-bold leading-tight md:text-3xl">{item.role}</h3>
                  <p className="mt-1 text-black/70">{item.organization}</p>
                </div>
                <span className="w-fit shrink-0 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold shadow-sm">
                  {item.period}
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-base leading-7 text-black/75 md:text-lg">{item.description}</p>

              <ul className="mt-5 grid gap-2 text-sm leading-6 text-black/78 md:grid-cols-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-xs text-black/70">
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
