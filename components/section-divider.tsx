"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function SectionDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className="relative h-24 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 w-full"
      >
        <Image
          src="/image/wave.png"
          alt="Japanese Wave Divider"
          width={1920}
          height={200}
          className="w-full opacity-30"
        />
      </motion.div>
    </div>
  )
}
