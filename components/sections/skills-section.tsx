"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillCategory {
  title: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C++", "Java", "C#", "SQL/PLSQL", "JavaScript", "Python", "PHP"],
  },
  {
    title: "Technologies",
    skills: [".NET", "Networks", "NoSQL", "Linux", "Laravel", "Spring Boot", "React"],
  },
  {
    title: "Skills",
    skills: ["Leadership", "Chess", "Problem Solving (extensive experience with Codeforces and LeetCode challenges)" , "video editing"],
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
        className="grid gap-8 md:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={itemVariants} className="border border-black p-6">
            <h3 className="mb-4 text-xl font-medium">{category.title}</h3>
            <ul className="space-y-2">
              {category.skills.map((skill) => (
                <li key={skill} className="flex items-center">
                  <div className="mr-2 h-1 w-1 bg-black"></div>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
