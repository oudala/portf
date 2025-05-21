"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(-1) // Start at -1 to account for delay
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Don't start typing until after the delay
    if (currentIndex === -1) {
      const initialDelay = setTimeout(() => {
        setCurrentIndex(0)
      }, delay * 1000)

      return () => clearTimeout(initialDelay)
    }

    // Once we start typing, add one character at a time
    if (currentIndex >= 0 && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100) // Adjust speed of typing here

      return () => clearTimeout(timeout)
    } else if (currentIndex >= text.length) {
      setIsComplete(true)
    }
  }, [currentIndex, delay, text])

  return (
    <h1 className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </h1>
  )
}
