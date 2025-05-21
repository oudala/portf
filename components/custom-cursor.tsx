"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none"

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (e) {
        setPosition({ x: e.clientX, y: e.clientY })
        setHidden(false)
      }
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      const elements = document.querySelectorAll("a, button, [role=button], input, textarea, select")
      if (elements) {
        elements.forEach((el) => {
          el.addEventListener("mouseenter", () => setLinkHovered(true))
          el.addEventListener("mouseleave", () => setLinkHovered(false))
        })
      }
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => {
      removeEventListeners()
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{
        x: position.x - (linkHovered ? 16 : 4),
        y: position.y - (linkHovered ? 16 : 4),
      }}
      animate={{
        scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.2,
        },
        opacity: {
          duration: 0.15,
        },
      }}
    >
      <div className={`rounded-full bg-white ${linkHovered ? "h-8 w-8" : "h-4 w-4"}`} />
    </motion.div>
  )
}
