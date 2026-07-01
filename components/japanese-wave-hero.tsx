"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function JapaneseWaveHero() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const scrollY = window.scrollY
      scrollRef.current.style.transform = `translateY(${scrollY * 0.2}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f5f0e8] -mb-px">
      {/* Top header with titles */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-[#1a1a1a]">Software</span>
            <span className="text-sm font-medium uppercase tracking-wider text-[#1a1a1a]">Engineer</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-end"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-[#1a1a1a]">Oulad Dahman</span>
            <span className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a]">Ilyass</span>
          </motion.div>
        </div>
      </div>

      {/* Clouds */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute left-1/2 top-[10%] -translate-x-1/2 transform"
      >
        <Image src="/image/japanese-clouds1.png" alt="Japanese Clouds" width={600} height={200} priority />
      </motion.div>

      {/* Center text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-4 text-2xl font-medium sm:text-3xl md:text-4xl"
        >
          2026
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35 }}
          className="mt-2 text-sm font-medium uppercase tracking-wider text-black/70 sm:text-base"
        >
          Research Assistant at Oracle
        </motion.p>
      </div>

      {/* Wave at bottom left side */}
      {/* Adjusted width to sit on the left side */}
      <div className="absolute bottom-[-130px] left-0 w-2/3 md:w-1/2 lg:w-1/3 h-[400px] md:h-[500px] lg:h-[600px]"> 
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="w-full h-full"
        >
          <Image
            src="/image/wave.png"
            alt="Japanese Wave"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <Link href="#projects" scroll={true} className="flex flex-col items-center">
          <span className="mb-2 text-xs uppercase tracking-widest">View Projects</span>
          <div className="h-12 w-[1px] bg-black/30" />
        </Link>
      </motion.div>
    </section>
  )
}
