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
    title: "End of Studies Project Defense",
    description:
      "Presented Oracle APM Session Diagnostics for the State Engineering Diploma in Software Engineering.",
    year: "2026",
    image: "/image/events/oracle-apm-defense.png",
  },
  {
    id: 2,
    title: "Oracle APEX Hackathon Top 3",
    description: "Participated in the Oracle APEX Hackathon and finished among the top 3 groups.",
    year: "2026",
    image: "/image/events/oracle-apex-hackathon-top-3.jpeg",
  },
  {
    id: 10,
    title: "Bureau enactus ensah",
    description: "Memories from when I was president of Enactus Club in the year 2025",
    year: "2025",
    image: "/image/memories/1.jpg",
  },
  {
    id: 11,
    title: "Formation design thinking",
    description: "Memories from when I was the coach of the design thinking workshop in 2025.",
    year: "2025",
    image: "/image/memories/2.jpg",
  },
  {
    id: 12,
    title: "Formation BMC",
    description: "Memories from when I was the coach of the BMC Formation in 2025.",
    year: "2025",
    image: "/image/memories/3.jpg",
  },
  {
    id: 13,
    title: "Workshop Design Thinking and BMC",
    description: "Memories from when I was the coach of the Workshop in 2025.",
    year: "2025",
    image: "/image/memories/4.jpg",
  },
  {
    id: 14,
    title: "BootCamp Morocco Water Race",
    description: "Memories from when I participated in the BootCamp Morocco Water Race in 2025.",
    year: "2025",
    image: "/image/memories/5.webp",
  },
  {
    id: 15,
    title: "Team building",
    description: "memories team building 2024",
    year: "2024",
    image: "/image/memories/6.jpg",
  },
  {
    id: 16,
    title: "Enactus EnsaH",
    description: "Memories from when I was the president of Enactus EnsaH in 2024.",
    year: "2024",
    image: "/image/memories/7.jpg",
  },
  {
    id: 17,
    title: "Formation Public Speaking in TGD Club",
    description: "Memories from when I was the coach of the Public Speaking Formation in TGD Club in 2023.",
    year: "2023",
    image: "/image/memories/8.webp",
  },
  {
    id: 18,
    title: "Tech Experience",
    description: "Memories from when I was part of the organizing team for a major tech event in Northern Morocco in 2023.",
    year: "2023",
    image: "/image/memories/9.jpg",
  },
  {
    id: 19,
    title: "Enactus",
    description: "Members of club nactus 2023",
    year: "2023",
    image: "/image/memories/10.jpg",
  },
  {
    id: 20,
    title: "MO9AWALA TALK",
    description: "Memories from when I was part of the organizing team for a major entrepreneurial event in Hociema in 2022.",
    year: "2022",
    image: "/image/memories/11.jpg",
  },
  {
    id: 21,
    title: "CHESS CLUB",
    description: "Memories from when I was a member of the chess club team.",
    year: "2021",
    image: "/image/memories/12.jpg",
  },
  {
    id: 22,
    title: "CHESS CLUB",
    description: "Memories from when I was a member of the chess club team. also in 2023",
    year: "2022",
    image: "/image/memories/13.webp",
  },
  {
    id: 23,
    title: "Deplacement a Tanger",
    description: "Memories when i was in tanger with the Club Sport team in event ENSA CUP.",
    year: "2022",
    image: "/image/memories/14.webp",
  },
  {
    id: 24,
    title: "Table Rounde TGD Club",
    description: "memories when i was a member of the TGD Club team in 2022.",
    year: "2022",
    image: "/image/memories/15.jpg",
  },
  {
    id: 25,
    title: "Tech Experience",
    description: "Memories from when i was a event treasurer for a major tech event in Northern Morocco in 2022.",
    year: "",
    image: "/image/memories/16.jpg",
  },
  {
    id: 26,
    title: "TGD Club",
    description: "Memories from when I was a member of the TGD Club team in 2022.",
    year: "2021",
    image: "/image/memories/17.webp",
  },
]

export default function ParascholaireSection() {
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
        <h2 className="text-3xl font-bold">Events & Leadership</h2>
        <div className="mt-4 h-[2px] w-16 bg-black"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-10">
          <p className="text-lg">
            Beyond engineering work, I've embraced leadership roles, public presentations, and competitive challenges
            that shaped my collaboration, resilience, and creative problem-solving.
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
            aria-label="Previous memories/"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-black bg-[#f5f0e8]/80 p-2 backdrop-blur-sm transition-all hover:bg-black hover:text-white ${
              startIndex >= memories.length - visibleItems ? "opacity-50" : "opacity-100"
            }`}
            disabled={startIndex >= memories.length - visibleItems}
            aria-label="Next memories/"
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

export { ParascholaireSection }
