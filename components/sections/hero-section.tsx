"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowDown } from "lucide-react"

import { TextReveal } from "@/components/animations/text-reveal"
import { Button } from "@/components/ui/button"
import { AbstractBackground } from "@/components/3d/abstract-background"

export function HeroSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section id="hero" className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <AbstractBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>

      <div className="container z-10 mx-auto px-4 text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
          }}
          className="space-y-6"
        >
          <div className="mx-auto max-w-3xl">
            <TextReveal
              text="Ilyass Oulad Dahman"
              className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
              delay={1}
            />
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 2.5 } },
              }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Software Developer & Creative Technologist
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 3 } },
            }}
          >
            <Button
              variant="outline"
              className="mt-8 border-primary/20 bg-background/50 backdrop-blur-md"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Explore My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </div>
    </section>
  )
}
