"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the top of the page
      setAtTop(window.scrollY < 10)
      // Check if we've scrolled down enough to change the nav style
      setScrolled(window.scrollY > 100)
    }

    // Set initial state
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "bg-[#f5f0e8] py-4 shadow-sm" : "bg-[#f5f0e8]/80 py-6 backdrop-blur-sm"
        } ${atTop ? "translate-y-[-100%]" : "translate-y-0"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="text-sm font-medium uppercase tracking-wider">
            Oulad Dahman Ilyass
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="#about" className="text-sm uppercase tracking-wider hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-sm uppercase tracking-wider hover:underline">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#professional-work" className="text-sm uppercase tracking-wider hover:underline">
                  Work
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-sm uppercase tracking-wider hover:underline">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#education" className="text-sm uppercase tracking-wider hover:underline">
                  Education
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm uppercase tracking-wider hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className="flex h-8 w-8 flex-col items-center justify-center space-y-1.5 md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <span className="h-px w-6 bg-black"></span>
            <span className="h-px w-6 bg-black"></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#f5f0e8]"
          >
            <div className="container mx-auto flex h-full flex-col px-4">
              <div className="flex items-center justify-between py-6">
                <Link href="/" className="text-sm font-medium uppercase tracking-wider">
                  Oulad Dahman Ilyass
                </Link>
                <button
                  className="flex h-8 w-8 items-center justify-center"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-1 flex-col items-center justify-center">
                <ul className="space-y-8 text-center">
                  <li>
                    <Link
                      href="#about"
                      className="text-3xl font-medium uppercase tracking-wider"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#projects"
                      className="text-3xl font-medium uppercase tracking-wider"
                      onClick={() => setIsOpen(false)}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#professional-work"
                      className="text-3xl font-medium uppercase tracking-wider"
                      onClick={() => setIsOpen(false)}
                    >
                      Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#skills"
                      className="text-3xl font-medium uppercase tracking-wider"
                      onClick={() => setIsOpen(false)}
                    >
                      Skills
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#education"
                      className="text-3xl font-medium uppercase tracking-wider"
                      onClick={() => setIsOpen(false)}
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-3xl font-medium uppercase tracking-wider"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="py-8 text-center">
                <p className="text-sm text-black/70">© {new Date().getFullYear()} All rights reserved.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
