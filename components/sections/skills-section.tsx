"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillCategory {
  title: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "PL/SQL"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Azure", "OCI", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "Jenkins"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI"],
  },
  {
    title: "Backend",
    skills: ["Spring Boot", "Flask", "REST APIs", "Microservices", "Distributed Systems"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Testing & Monitoring",
    skills: ["Pytest", "Selenium", "SonarQube", "Prometheus", "Grafana", "Oracle APM"],
  },
  {
    title: "Tools & Collaboration",
    skills: ["Git", "Slack", "Jira", "Bitbucket", "Linux", "VS Code", "IntelliJ", "Maven"],
  },
  {
    title: "Specialization",
    skills: ["System Design", "Performance Optimization", "Observability", "Cloud-Native Architecture"],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section id="skills" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold">Skills & Technologies</h2>
        <div className="mt-4 h-[2px] w-16 bg-black"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className="rounded-[6px] border border-black/10 bg-[#fffaf6] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-base font-bold">{category.title}</h3>
              <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-semibold text-[#f5f0e8]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <li key={skill}>
                  <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-xs text-black/72">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
