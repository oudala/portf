"use client"

import { Download } from "lucide-react"
import { motion } from "framer-motion"

export function ResumeDownloadButton() {
  return (
    <motion.a
      href="/resume/ilyass-oulad-dahman-cv.pdf"
      download="Ilyass-Oulad-Dahman-CV.pdf"
      aria-label="Download resume"
      className="group fixed bottom-6 right-[8.5rem] z-40 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-[#fffaf6]/85 text-black shadow-[0_12px_30px_rgba(0,0,0,0.12)] outline-none backdrop-blur-md transition-colors hover:bg-black hover:text-[#f5f0e8] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f0e8]"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download className="h-5 w-5" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-xs font-semibold text-[#f5f0e8] opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100">
        Download CV
      </span>
    </motion.a>
  )
}
