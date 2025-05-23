"use client"
import { TerminalIcon } from "lucide-react"
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
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-20 z-40 h-12 w-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-md"
      onClick={openTerminal}
      aria-label="Open CV Terminal"
    >
      <TerminalIcon className="h-5 w-5" />
    </Button>
  )
}
