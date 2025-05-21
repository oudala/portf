"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTerminal } from "./terminal-provider"
import { X } from "lucide-react"

export function Terminal() {
  const { isOpen, setIsOpen, history, addToHistory } = useTerminal()
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user input to history
    addToHistory({ type: "input", content: input })

    // Process command
    processCommand(input)

    // Clear input
    setInput("")
  }

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()

    // Basic CV navigation commands
    if (command === "help") {
      addToHistory({
        type: "output",
        content: `
Available commands:
- help: Show this help message
- clear: Clear the terminal
- ls: List all CV sections
- cat <section>: Display content of a section
- cv: Show CV overview
- cv <section>: Navigate to a specific CV section
- exit: Close the terminal

CV Sections:
- experience
- education
- skills
- projects
- certifications
- contact
        `,
      })
    } else if (command === "clear") {
      // Clear history
      addToHistory({ type: "output", content: "Terminal cleared." })
      setTimeout(() => {
        // This is a hack to clear the terminal after the "Terminal cleared" message is shown
        window.location.reload()
      }, 500)
    } else if (command === "exit") {
      setIsOpen(false)
    } else if (command === "ls") {
      addToHistory({
        type: "output",
        content: "experience  education  skills  projects  certifications  contact",
      })
    } else if (command.startsWith("cat ")) {
      const section = command.substring(4).trim()
      displaySection(section)
    } else if (command === "cv") {
      addToHistory({
        type: "output",
        content: `
CV Overview - Oulad Dahman Ilyass
=================================
Computer Science Student & Software Engineer

Use 'cat <section>' to view details of each section:
- experience: Work experience
- education: Educational background
- skills: Technical skills
- projects: Portfolio projects
- certifications: Professional certifications
- contact: Contact information
        `,
      })
    } else if (command.startsWith("cv ")) {
      const section = command.substring(3).trim()
      displaySection(section)
    } else {
      addToHistory({
        type: "output",
        content: `Command not found: ${command}. Type 'help' for available commands.`,
      })
    }
  }

  const displaySection = (section: string) => {
    switch (section) {
      case "experience":
        addToHistory({
          type: "output",
          content: `
Work Experience
==============

Software Engineer Intern | XYZ Company
Jan 2023 - Present
- Developed and maintained web applications using React and Node.js
- Collaborated with cross-functional teams to deliver high-quality software
- Implemented CI/CD pipelines to streamline deployment processes

Junior Developer | ABC Tech
Jun 2022 - Dec 2022
- Built responsive user interfaces using modern frontend frameworks
- Participated in code reviews and implemented best practices
- Assisted in troubleshooting and debugging application issues
          `,
        })
        break
      case "education":
        addToHistory({
          type: "output",
          content: `
Education
=========

Bachelor of Science in Computer Science
University of Technology
2020 - 2024
- GPA: 3.8/4.0
- Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems
- Senior project: AI-powered recommendation system
          `,
        })
        break
      case "skills":
        addToHistory({
          type: "output",
          content: `
Technical Skills
===============

Programming Languages:
- JavaScript/TypeScript
- Python
- Java
- C++

Frontend:
- React.js
- Next.js
- HTML/CSS
- Tailwind CSS

Backend:
- Node.js
- Express
- Django
- Spring Boot

Other:
- Git/GitHub
- Docker
- AWS
- CI/CD
          `,
        })
        break
      case "projects":
        addToHistory({
          type: "output",
          content: `
Portfolio Projects
=================

E-commerce Platform
- Built with Next.js, Node.js, and MongoDB
- Implemented user authentication, product catalog, and payment processing
- GitHub: github.com/username/ecommerce-platform

Weather Application
- Developed using React and OpenWeatherMap API
- Features include location-based weather forecasts and interactive maps
- GitHub: github.com/username/weather-app

Task Management System
- Created with Django and PostgreSQL
- Includes user roles, task assignment, and progress tracking
- GitHub: github.com/username/task-manager
          `,
        })
        break
      case "certifications":
        addToHistory({
          type: "output",
          content: `
Professional Certifications
==========================

AWS Certified Developer - Associate
- Issued by Amazon Web Services
- Date: June 2023

React Developer Certification
- Issued by Meta
- Date: March 2023

MongoDB Certified Developer
- Issued by MongoDB
- Date: January 2023
          `,
        })
        break
      case "contact":
        addToHistory({
          type: "output",
          content: `
Contact Information
=================

Email: oulad.dahman.ilyass@example.com
LinkedIn: linkedin.com/in/oulad-dahman-ilyass
GitHub: github.com/oulad-dahman-ilyass
Portfolio: ouladilyas.dev
          `,
        })
        break
      default:
        addToHistory({
          type: "output",
          content: `Section not found: ${section}. Available sections: experience, education, skills, projects, certifications, contact`,
        })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-lg border border-neutral-200 bg-[#1a1a1a] p-4 text-white shadow-lg dark:border-neutral-800">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-neutral-400">CV Terminal</div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div ref={terminalRef} className="custom-scrollbar h-96 overflow-y-auto py-4 font-mono text-sm">
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === "input" ? (
                <div className="flex">
                  <span className="mr-2 text-green-400">$</span>
                  <span>{item.content}</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-neutral-300">{item.content}</div>
              )}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex">
            <span className="mr-2 text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent outline-none"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  )
}
