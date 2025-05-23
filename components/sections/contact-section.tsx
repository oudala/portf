"use client"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construct mailto URL with form data
    const subject = `Contact from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoUrl = `mailto:ilyassouladdahman@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    // Open mail client
    window.location.href = mailtoUrl
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
              className="w-full border border-black bg-black p-3 text-[#f5f0e8] transition-colors hover:bg-black/90"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
