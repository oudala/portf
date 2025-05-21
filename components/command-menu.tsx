"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Command } from "cmdk"
import { Search, X, Code, Briefcase, User, Send, Terminal, Home, Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e && e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const categories = [
    { id: "projects", name: "Projects", icon: <Briefcase className="h-4 w-4" /> },
    { id: "skills", name: "Skills", icon: <Code className="h-4 w-4" /> },
    { id: "navigation", name: "Navigation", icon: <Home className="h-4 w-4" /> },
    { id: "featured", name: "Featured", icon: <Star className="h-4 w-4" /> },
  ]

  return (
    <>
      <Button
        variant="outline"
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2 border-primary/20 bg-background/50 backdrop-blur-md"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-2 rounded border border-primary/20 bg-muted px-1.5 text-xs">⌘K</kbd>
      </Button>

      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          if (!open) {
            setSelectedCategory(null)
            setSearch("")
          }
        }}
      >
        <DialogContent className="max-w-2xl border-primary/20 bg-background/80 p-0 backdrop-blur-md">
          <Command className="rounded-lg border-none bg-transparent">
            <div className="flex items-center border-b border-primary/20 px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Search for projects, skills, or navigate..."
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {!selectedCategory ? (
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="flex h-20 w-full flex-col items-center justify-center gap-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="rounded-full bg-primary/10 p-2">{category.icon}</div>
                        <span className="text-xs">{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <QuickAction
                      icon={<User className="h-4 w-4" />}
                      label="About Me"
                      onClick={() => {
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                        setOpen(false)
                      }}
                    />
                    <QuickAction
                      icon={<Terminal className="h-4 w-4" />}
                      label="Open Terminal"
                      onClick={() => {
                        // This would need to be connected to your terminal component
                        setOpen(false)
                      }}
                    />
                    <QuickAction
                      icon={<Send className="h-4 w-4" />}
                      label="Contact"
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        setOpen(false)
                      }}
                    />
                    <QuickAction
                      icon={<Sparkles className="h-4 w-4" />}
                      label="Project Recommender"
                      onClick={() => {
                        document.getElementById("recommender")?.scrollIntoView({ behavior: "smooth" })
                        setOpen(false)
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Command.List className="max-h-[400px] overflow-y-auto p-2">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <h3 className="text-sm font-medium">{categories.find((c) => c.id === selectedCategory)?.name}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                    Back
                  </Button>
                </div>

                <Command.Empty>No results found.</Command.Empty>

                {selectedCategory === "projects" && (
                  <CategoryContent>
                    <Command.Item className="flex items-center justify-between px-2 py-1.5">
                      <div className="flex items-center">
                        <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                          <Briefcase className="h-4 w-4 text-primary" />
                        </div>
                        <span>E-commerce Platform</span>
                      </div>
                      <Badge variant="outline">Web</Badge>
                    </Command.Item>
                    <Command.Item className="flex items-center justify-between px-2 py-1.5">
                      <div className="flex items-center">
                        <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                          <Briefcase className="h-4 w-4 text-primary" />
                        </div>
                        <span>AI Content Generator</span>
                      </div>
                      <Badge variant="outline">AI</Badge>
                    </Command.Item>
                    <Command.Item className="flex items-center justify-between px-2 py-1.5">
                      <div className="flex items-center">
                        <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                          <Briefcase className="h-4 w-4 text-primary" />
                        </div>
                        <span>3D Product Configurator</span>
                      </div>
                      <Badge variant="outline">3D</Badge>
                    </Command.Item>
                  </CategoryContent>
                )}

                {selectedCategory === "skills" && (
                  <CategoryContent>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <span>React</span>
                    </Command.Item>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <span>Next.js</span>
                    </Command.Item>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <span>Three.js</span>
                    </Command.Item>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <span>TypeScript</span>
                    </Command.Item>
                  </CategoryContent>
                )}

                {selectedCategory === "navigation" && (
                  <CategoryContent>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <Home className="h-4 w-4 text-primary" />
                      </div>
                      <span>Home</span>
                    </Command.Item>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <Briefcase className="h-4 w-4 text-primary" />
                      </div>
                      <span>Projects</span>
                    </Command.Item>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span>About</span>
                    </Command.Item>
                    <Command.Item className="flex items-center px-2 py-1.5">
                      <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                        <Send className="h-4 w-4 text-primary" />
                      </div>
                      <span>Contact</span>
                    </Command.Item>
                  </CategoryContent>
                )}

                {selectedCategory === "featured" && (
                  <CategoryContent>
                    <Command.Item className="flex items-center justify-between px-2 py-1.5">
                      <div className="flex items-center">
                        <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <span>Portfolio Website</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Featured
                      </Badge>
                    </Command.Item>
                    <Command.Item className="flex items-center justify-between px-2 py-1.5">
                      <div className="flex items-center">
                        <div className="mr-2 h-6 w-6 rounded bg-primary/10 p-1">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <span>AI Content Generator</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Featured
                      </Badge>
                    </Command.Item>
                  </CategoryContent>
                )}
              </Command.List>
            )}
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}

function CategoryContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <Button
      variant="outline"
      className="flex h-12 items-center justify-start gap-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5"
      onClick={onClick}
    >
      <div className="rounded-full bg-primary/10 p-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </Button>
  )
}
