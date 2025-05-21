"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, Code, Send, Terminal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { name: "Home", href: "#hero", icon: <Home className="h-5 w-5" /> },
  { name: "Projects", href: "#projects", icon: <Briefcase className="h-5 w-5" /> },
  { name: "About", href: "#about", icon: <User className="h-5 w-5" /> },
  { name: "Challenges", href: "#challenges", icon: <Code className="h-5 w-5" /> },
  { name: "Terminal", href: "#terminal", icon: <Terminal className="h-5 w-5" /> },
  { name: "Contact", href: "#contact", icon: <Send className="h-5 w-5" /> },
]

export function RadialNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={toggleMenu}
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-md"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)} className="group flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full border-primary/20 bg-background/50 backdrop-blur-md transition-all group-hover:border-primary"
                    >
                      {item.icon}
                    </Button>
                    <span className="text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
