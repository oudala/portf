"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTerminal } from "./terminal-provider"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function Terminal() {
  const { isOpen, setIsOpen, history, addToHistory } = useTerminal()
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Smooth auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      })
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

Java Developer Intern | Anobix
Summer 2024
- Developed and enhanced enterprise Java applications using Spring Framework
- Implemented RESTful APIs and microservices architecture
- Worked with Spring Boot, JPA/Hibernate for database operations
- Participated in Agile development process and daily stand-ups

`,
        })
        break
      case "education":
        addToHistory({
          type: "output",
          content: `
Education
=========

Engineering Degree in Computer Science Engineering
National School of Applied Science, Al Hoceima
2023 – Present
- Specializing in Software Engineering and Distributed Systems
- Advanced coursework in Software Architecture, Cloud Computing, and AI
- Research focus on Machine Learning and Data Engineering

Preparatory Classes to Engineering Degree
National School of Applied Science, Al Hoceima
2021 – 2023
- Intensive study in Mathematics, Physics, and Computer Science
- Selected among top students for engineering program
- Foundation in algorithmic thinking and programming basics

Mathematics and Information Science (SMIA)
University of Mohammed V, Rabat
2020 – 2021
- Core studies in Mathematics and Computer Science
- Introduction to programming and data structures
- Strong foundation in analytical problem-solving

Baccalauréat Sciences Math Appliquées A
Lycée el Fakih el Hamdaoui, Salé
2019 - 2020
- Mathematics and Physics specialization
- Graduated with honors
- Strong foundation in analytical and mathematical thinking
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

NLP Annotation Platform | 2025
- Developed a collaborative text annotation platform using Spring Boot and React with OAuth2
- Implemented role-based access control for dataset management and annotation monitoring
- Built intelligent system for detecting annotation quality and identifying spammers
- Integrated Python ML pipeline for model training and testing
- Tech Stack: Spring Boot, React, MySQL, Spring Security, OAuth2, Thymeleaf, Python NLP
- GitHub: github.com/oudala/API-REST-s-curis-e-de-gestion-de-t-ches-collaboratives

Persistent Memory-Efficient HashMap | 2025
- Built optimized HashMap with custom serialization for persistent data storage
- Improved performance: 28x faster saves (146,819ms→5,162ms), 1.8x faster loads
- Reduced memory usage by 39% (492MB→299MB) while maintaining data integrity
- Comprehensive JUnit testing for edge cases and reliability
- Tech Stack: Java, JUnit, VisualVM, Custom Serialization, Profiling
- GitHub: github.com/oudala/memorymap

MyORM – Java ORM Library | 2025
- Developed lightweight ORM with annotation-based mapping and ACID support
- Implemented dynamic reflection-based mapping and CRUD operations
- Added Caffeine caching and multi-database support (MySQL, PostgreSQL, SQLite)
- Published as Maven-compatible library on GitHub
- Tech Stack: Java, Reflection, JDBC, Annotations, Caffeine, Maven
- GitHub: github.com/oudala/My-ORM

Multimodal Store Management | 2024
- Created Flask-based system with image recognition and voice command capabilities
- Implemented computer vision for product identification via photo uploads
- Integrated speech-to-text for hands-free inventory management
- Built responsive real-time interface with multimodal search
- Tech Stack: Flask, Python, TensorFlow, JavaScript
- GitHub: github.com/oudala/AI-Powered-Visual-and-Voice-Product-Search

Invoices Management System | 2024
- Developed comprehensive Laravel-based invoicing system
- Implemented Breeze authentication and Spatie role-based access control
- Built automated notifications and real-time data visualization
- Created demo video showcasing system features
- Tech Stack: Laravel, Spatie, Breeze, Laravel UI, Charts, Mailer
- GitHub: github.com/oudala/invoices-management
          `,
        })
        break
      case "certifications":
        addToHistory({
          type: "output",
          content: `
Professional Certifications
==========================

Java SE 17 Developer (OCP 17)
- Issued by Oracle
- Date: 2024
- Certification ID: OCP17-2024
- Validates expertise in Java 17 core features and APIs

Java SE 11 Developer (OCP 11)
- Issued by Oracle
- Date: 2023
- Certification ID: OCP11-2023
- Demonstrates proficiency in Java 11 development

Oracle Cloud Infrastructure 2024 Foundations Associate
- Issued by Oracle
- Date: 2024
- Certification ID: OCI-2024
- Covers OCI core concepts, architecture, and services
          `,
        })
        break
      case "contact":
        addToHistory({
          type: "output",
          content: `
Contact Information
=================

Email: ilyassouladdahman@gmail.com
LinkedIn: https://www.linkedin.com/in/ilyassod/
GitHub: https://github.com/oudala
Portfolio: ilyassouladdahman.vercel.app
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-6 z-50 flex h-[500px] w-[400px] flex-col rounded-lg border border-black/20 bg-black/95 shadow-2xl backdrop-blur-sm"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/95 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/90 shadow-lg shadow-red-500/20"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-lg shadow-yellow-500/20"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/90 shadow-lg shadow-green-500/20"></div>
            </div>
            <div className="absolute left-1/2 top-3 -translate-x-1/2 text-sm font-medium text-white/70">
              Terminal
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close terminal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm leading-6 text-white/90"
          >
            {history.map((item, index) => (
              <div
                key={index}
                className={`mb-3 last:mb-1 ${
                  item.type === "output" ? "animate-fade-in" : ""
                }`}
              >
                {item.type === "input" ? (
                  <div className="flex items-center">
                    <span className="mr-2 text-green-400">❯</span>
                    <span className="text-white">{item.content}</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-white/90 [&>*:first-child]:mt-0">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 bg-black/95 px-4 py-3">
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="mr-2 text-green-400">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white caret-green-400 outline-none placeholder:text-white/20 focus:outline-none"
                placeholder="Type a command (try 'help')..."
                autoFocus
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
