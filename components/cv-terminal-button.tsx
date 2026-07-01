"use client"
import { TerminalIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTerminal } from "@/components/terminal/terminal-provider"

export function CVTerminalButton() {
  const { setIsOpen, addToHistory } = useTerminal()

  const openTerminal = () => {
    setIsOpen(true)

    // Add a welcome message and instructions
    addToHistory({
      type: "output",
      content: `
Welcome to the CV Terminal! 🚀

Navigate my CV using these commands:

  ls                     - List all available sections
  cat skills             - View my technical skills
  cat experience         - View my work experience
  cat education          - View my education history
  cat projects           - View my projects
  cat contact            - View my contact information
  clear                  - Clear the terminal
  help                   - Show this help message

Try it out! Start by typing 'ls' to see available sections.
      `,
    })
  }

  return (
    <motion.div
      className="group fixed bottom-6 right-20 z-40"
      animate={{ y: [0, -5, 0, 3, 0], rotate: [0, -4, 4, -2, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="pointer-events-none absolute inset-[-6px] rounded-full border border-black/20 opacity-30 animate-ping" aria-hidden="true" />
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full border-black/10 bg-[#fffaf6]/85 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors hover:bg-black hover:text-[#f5f0e8]"
        onClick={openTerminal}
        aria-label="Open CV Terminal"
      >
        <TerminalIcon className="h-5 w-5" />
      </Button>
      <span className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-xs font-semibold text-[#f5f0e8] opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        CV terminal
      </span>
    </motion.div>
  )
}
