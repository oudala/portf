"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Education {
  degree: string
  institution: string
  location: string
  period: string
}

const educationList: Education[] = [
  {
    degree: "Engineering Degree in Computer Science Engineering",
    institution: "National School of Applied Science",
    location: "Al Hoceima",
    period: "2023 – Jun 2026",
  },
  {
    degree: "Preparatory Classes to Engineering Degree",
    institution: "National School of Applied Science",
    location: "Al Hoceima",
    period: "2021 – 2023",
  },
  {
    degree: "years of Mathematics and information SMIA",
    institution: "unevirsty of Mohammed V",
    location: "Rabat",
    period: "2020 – 2021",
  },
  {
    degree: "Baccalauréat Sciences Math Appliquées A",
    institution: "Lycée el Fakih el Hamdaoui",
    location: "Salé",
    period: "2019 - 2020",
  },
]

export function EducationSection() {
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
    <section id="education" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold">Education</h2>
        <div className="mt-4 h-[2px] w-16 bg-black"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-8"
      >
        {educationList.map((education, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="rounded-[6px] border border-black/10 bg-[#fffaf6] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-medium">{education.degree}</h3>
                <p className="mt-1 text-black/70">
                  {education.institution}, {education.location}
                </p>
              </div>
              <div className="mt-2 rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold md:mt-0">
                {education.period}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
