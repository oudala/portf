"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type MemoryItem = {
  id: number
  title: string
  description: string
  year: string
  image: string
}

const memories: MemoryItem[] = [
  {
    id: 1,
    title: "Hackathon Champion",
    description: "Led a team to victory in the national coding hackathon.",
    year: "2023",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    title: "Student Council",
    description: "Elected as president of the computer science student council.",
    year: "2022",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    title: "Robotics Competition",
    description: "Designed an autonomous robot that won second place nationally.",
    year: "2022",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    title: "Volunteer Teaching",
    description: "Taught programming to underprivileged high school students.",
    year: "2021",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    title: "Research Presentation",
    description: "Presented AI research at the undergraduate symposium.",
    year: "2021",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    title: "Debate Team Captain",
    description: "Led the university debate team to the regional finals.",
    year: "2020",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    title: "Design Award",
    description: "Received recognition for innovative UI/UX design.",
    year: "2020",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 8,
    title: "Community Service",
    description: "Organized tech workshops for local community centers.",
    year: "2019",
    image: "/placeholder.svg?height=400&width=300",
  },
]

export function ParascholaireSection() {
  const ref = useRef(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [startIndex, setStartIndex] = useState(0)
  const visibleItems = 4 // Number of items visible at once

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const scrollRight = () => {
    if (startIndex < memories.length - visibleItems) {
      setStartIndex(startIndex + 1)
    }
  }

  return (
    <section id="paraschoolaire" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold">Paraschoolaire</h2>
        <div className="mt-4 h-[2px] w-16 bg-black"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-10">
          <p className="text-lg">
            Beyond academic pursuits, I've embraced leadership roles and competitive challenges that have shaped my
            character and vision. These experiences have taught me the value of collaboration, resilience, and creative
            problem-solving.
          </p>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${startIndex * (100 / visibleItems)}%)` }}
            >
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="w-[calc(100%/4)] min-w-[calc(100%/4)] px-2 md:w-[calc(100%/4)] md:min-w-[calc(100%/4)]"
                >
                  <div className="group relative aspect-[3/4] overflow-hidden border border-black bg-[#f5f0e8]">
                    {/* Japanese wave pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <svg
                        viewBox="0 0 800 1200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                        preserveAspectRatio="xMidYMid slice"
                      >
                        <path
                          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                          fill="#000000"
                        ></path>
                      </svg>
                    </div>

                    {/* Image */}
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={memory.image || "/placeholder.svg"}
                        alt={memory.title}
                        className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-40"
                      />
                    </div>

                    {/* Top text (always visible) */}
                    <div className="absolute inset-x-0 top-0 flex justify-between p-3 text-xs font-medium uppercase tracking-wider text-black">
                      <span>MEMORY</span>
                      <span>{memory.year}</span>
                    </div>

                    {/* Center text (visible on hover) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-center text-xl font-bold text-black">{memory.title}</h3>
                      <div className="mt-2 h-[1px] w-8 bg-black"></div>
                    </div>

                    {/* Bottom text (visible on hover) */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 text-black transition-transform duration-500 group-hover:translate-y-0">
                      <div className="bg-[#f5f0e8]/80 p-3 backdrop-blur-sm">
                        <p className="text-sm">{memory.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black bg-[#f5f0e8]/80 p-2 backdrop-blur-sm transition-all hover:bg-black hover:text-white ${
              startIndex === 0 ? "opacity-50" : "opacity-100"
            }`}
            disabled={startIndex === 0}
            aria-label="Previous memories"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black bg-[#f5f0e8]/80 p-2 backdrop-blur-sm transition-all hover:bg-black hover:text-white ${
              startIndex >= memories.length - visibleItems ? "opacity-50" : "opacity-100"
            }`}
            disabled={startIndex >= memories.length - visibleItems}
            aria-label="Next memories"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: Math.ceil(memories.length / visibleItems) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index * visibleItems)}
                className={`h-1.5 w-6 rounded-full transition-all ${
                  Math.floor(startIndex / visibleItems) === index ? "bg-black" : "bg-black/30"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
