"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      name: "",
      email: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold">Contact</h2>
        <div className="mt-4 h-[2px] w-16 bg-black"></div>
      </motion.div>

      <div className="grid gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-4 text-xl font-medium">Get in Touch</h3>
          <p className="mb-6 text-lg">
            I'm always open to new opportunities and collaborations. If you have a project in mind or just want to say
            hello, feel free to reach out.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium uppercase">Email</h4>
              <p className="text-black/70">ilyassouladdahman@gmail.com</p>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase">Phone</h4>
              <p className="text-black/70">0626-414569</p>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase">Location</h4>
              <p className="text-black/70">Salé | Al Hoceima, Morocco</p>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase">Social</h4>
              <div className="mt-2 flex space-x-4">
                <a
                  href="https://linkedin.com/in/ilyassod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black p-2 transition-colors hover:bg-black hover:text-[#f5f0e8]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/oudala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black p-2 transition-colors hover:bg-black hover:text-[#f5f0e8]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isSubmitted ? (
            <div className="flex h-full flex-col items-center justify-center border border-black p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4 h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-medium">Message Sent!</h3>
              <p className="mt-2 text-center text-black/70">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 border border-black p-8">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium uppercase">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-black bg-transparent p-2 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-black bg-transparent p-2 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-black bg-transparent p-2 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border border-black bg-black p-3 text-[#f5f0e8] transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
