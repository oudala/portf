"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface Certification {
  title: string
  issuer: string
  date: string
  credentialId: string
  url: string
}

const certifications: Certification[] = [
  {
    title: "Java SE 17 Developer (OCP 17)",
    issuer: "Oracle",
    date: "2024",
    credentialId: "OCP17-2024",
    url: "/image/certifications/java 17.pdf"
  },
  {
    title: "Java SE 11 Developer (OCP 11)",
    issuer: "Oracle",
    date: "2023",
    credentialId: "OCP11-2023",
    url: "/image/certifications/java 17.pdf"
  },
  {
    title: "Oracle Cloud Infrastructure 2024 Foundations Associate",
    issuer: "Oracle",
    date: "2024",
    credentialId: "OCI-2024",
    url: "/image/certifications/eCertificate (1).pdf"
  }
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
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden border border-black bg-[#f5f0e8] p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h3 className="text-lg font-medium">{certification.title}</h3>
              <p className="mt-2 text-sm text-black/70">{certification.issuer}</p>
              <p className="mt-1 text-sm text-black/60">{certification.date}</p>
              <p className="mt-1 text-xs text-black/50">ID: {certification.credentialId}</p>
              <a
                href={certification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 border border-black px-4 py-2 text-sm transition-colors hover:bg-black hover:text-white"
              >
                View Certificate
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
