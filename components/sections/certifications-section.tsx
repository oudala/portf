"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Certification {
  title: string
  issuer?: string
}

const certifications: Certification[] = [
  {
    title: "Java SE 17 Developer (OCP 17)",
  },
  {
    title: "Java SE 11 Developer (OCP 11)",
  },
  {
    title: "Oracle Cloud Infrastructure 2024 Foundations Associate",
  },
]

export function CertificationsSection() {
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
    <section id="certifications" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold">Certifications</h2>
        <div className="mt-4 h-[2px] w-16 bg-black"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-6 md:grid-cols-3"
      >
        {certifications.map((certification, index) => (
          <motion.div key={index} variants={itemVariants} className="border border-black p-6">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 h-12 w-12 border border-black"></div>
              <h3 className="text-lg font-medium">{certification.title}</h3>
              {certification.issuer && <p className="mt-1 text-sm text-black/70">{certification.issuer}</p>}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
