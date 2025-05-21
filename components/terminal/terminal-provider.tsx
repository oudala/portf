"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface HistoryItem {
  type: "input" | "output"
  content: string
}

interface TerminalContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  history: HistoryItem[]
  addToHistory: (item: HistoryItem) => void
  clearHistory: () => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [...prev, item])
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <TerminalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        history,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider")
  }
  return context
}
