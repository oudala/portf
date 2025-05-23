"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
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
    <section id="about" ref={ref} className="py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-16 md:grid-cols-2"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <div className="relative h-80 w-80 overflow-hidden rounded-full border-2 border-black">
            <Image
              src="/image/myPic.png"
              alt="Oulad Dahman Ilyass"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col justify-center">
          <h2 className="mb-6 text-3xl font-bold">About Me</h2>
          <div className="mb-6 h-[2px] w-16 bg-black"></div>
          <p className="mb-6 text-lg">
            Dynamic computer science student passionate about innovation and software engineering. Seeking to leverage
            skills in Java and microservices to build scalable and impactful solutions.
          </p>
          <p className="mb-8 text-lg">
            Experienced in leadership through Enactus club activities, focusing on entrepreneurship and sustainable
            development.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-2 text-xl font-medium">Location</h3>
              <p className="text-sm">Salé | Al Hoceima</p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium">Contact</h3>
              <ul className="space-y-1 text-sm">
                <li>ilyassouladdahman@gmail.com</li>
                <li>+212 626 414 569</li>
                <li>
                  <a href="https://linkedin.com/in/ilyassod" className="hover:underline">
                    linkedin.com/in/ilyassod
                  </a>
                </li>
                <li>
                  <a href="https://github.com/oudala" className="hover:underline">
                    github.com/oudala
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
