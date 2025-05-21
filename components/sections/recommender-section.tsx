"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles, Code, Globe, Database, Cpu, Layers, Smartphone, Braces } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface Interest {
  id: string
  label: string
  icon: React.ReactNode
}

interface ProjectRecommendation {
  id: string
  title: string
  description: string
  tags: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  interests: string[]
  resources: { title: string; url: string }[]
}

const interests: Interest[] = [
  { id: "frontend", label: "Frontend Development", icon: <Globe className="h-5 w-5" /> },
  { id: "backend", label: "Backend Development", icon: <Database className="h-5 w-5" /> },
  { id: "mobile", label: "Mobile Development", icon: <Smartphone className="h-5 w-5" /> },
  { id: "ai", label: "AI & Machine Learning", icon: <Cpu className="h-5 w-5" /> },
  { id: "3d", label: "3D & WebGL", icon: <Layers className="h-5 w-5" /> },
  { id: "algorithms", label: "Algorithms & Data Structures", icon: <Braces className="h-5 w-5" /> },
]

const projectRecommendations: ProjectRecommendation[] = [
  {
    id: "project-rec-1",
    title: "Interactive Portfolio Website",
    description: "Create a personal portfolio website with interactive elements and animations.",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    difficulty: "intermediate",
    interests: ["frontend", "3d"],
    resources: [
      { title: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
      { title: "Three.js Journey", url: "https://threejs-journey.com/" },
      { title: "Framer Motion Documentation", url: "https://www.framer.com/motion/" },
    ],
  },
  {
    id: "project-rec-2",
    title: "Full-Stack E-commerce Platform",
    description: "Build a complete e-commerce platform with product listings, cart, and checkout functionality.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    difficulty: "advanced",
    interests: ["frontend", "backend"],
    resources: [
      { title: "Next.js Documentation", url: "https://nextjs.org/docs" },
      { title: "MongoDB University", url: "https://university.mongodb.com/" },
      { title: "Stripe Documentation", url: "https://stripe.com/docs" },
    ],
  },
  {
    id: "project-rec-3",
    title: "Mobile Weather App",
    description: "Develop a weather application for mobile devices with location-based forecasts.",
    tags: ["React Native", "API Integration", "Geolocation"],
    difficulty: "intermediate",
    interests: ["mobile", "frontend"],
    resources: [
      { title: "React Native Documentation", url: "https://reactnative.dev/docs/getting-started" },
      { title: "OpenWeather API", url: "https://openweathermap.org/api" },
      { title: "Geolocation in React Native", url: "https://reactnative.dev/docs/geolocation" },
    ],
  },
  {
    id: "project-rec-4",
    title: "Image Recognition App",
    description: "Create an application that can identify objects in images using machine learning.",
    tags: ["TensorFlow.js", "React", "Computer Vision"],
    difficulty: "advanced",
    interests: ["ai", "frontend"],
    resources: [
      { title: "TensorFlow.js Documentation", url: "https://www.tensorflow.org/js" },
      { title: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
      {
        title: "Computer Vision Tutorial",
        url: "https://www.tensorflow.org/js/tutorials/transfer/image_classification",
      },
    ],
  },
  {
    id: "project-rec-5",
    title: "3D Product Configurator",
    description: "Build an interactive 3D product configurator with customizable options.",
    tags: ["Three.js", "React", "WebGL", "3D Modeling"],
    difficulty: "advanced",
    interests: ["3d", "frontend"],
    resources: [
      { title: "Three.js Documentation", url: "https://threejs.org/docs/" },
      { title: "React Three Fiber", url: "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction" },
      { title: "3D Modeling with Blender", url: "https://www.blender.org/support/tutorials/" },
    ],
  },
  {
    id: "project-rec-6",
    title: "Algorithm Visualizer",
    description: "Create a web application that visualizes various algorithms and data structures.",
    tags: ["JavaScript", "Data Structures", "Algorithms", "Canvas API"],
    difficulty: "intermediate",
    interests: ["algorithms", "frontend"],
    resources: [
      { title: "JavaScript Algorithms", url: "https://github.com/trekhleb/javascript-algorithms" },
      { title: "Canvas API Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" },
      { title: "Visualizing Algorithms", url: "https://visualgo.net/en" },
    ],
  },
]

export function RecommenderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([])
  const [hasGenerated, setHasGenerated] = useState(false)

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests((prev) => [...prev, interestId])
    } else {
      setSelectedInterests((prev) => prev.filter((id) => id !== interestId))
    }
  }

  const generateRecommendations = () => {
    if (selectedInterests.length === 0) {
      setRecommendations([])
      setHasGenerated(true)
      return
    }

    // Filter projects that match at least one selected interest
    const matchingProjects = projectRecommendations.filter((project) =>
      project.interests.some((interest) => selectedInterests.includes(interest)),
    )

    // Sort by how many interests match (most matches first)
    const sortedProjects = matchingProjects.sort((a, b) => {
      const aMatches = a.interests.filter((interest) => selectedInterests.includes(interest)).length
      const bMatches = b.interests.filter((interest) => selectedInterests.includes(interest)).length
      return bMatches - aMatches
    })

    setRecommendations(sortedProjects)
    setHasGenerated(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section id="recommender" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">Project Recommender</h2>
        <p className="mt-4 text-muted-foreground">Get personalized project recommendations based on your interests</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-3xl"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                Select Your Interests
              </CardTitle>
              <CardDescription>
                Choose the areas you're interested in to get personalized project recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {interests.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest.id}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                    />
                    <Label htmlFor={interest.id} className="flex items-center">
                      <span className="mr-2">{interest.icon}</span>
                      {interest.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generateRecommendations} className="w-full" disabled={selectedInterests.length === 0}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Recommendations
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {hasGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h3 className="mb-4 text-xl font-bold">
              {recommendations.length > 0 ? "Recommended Projects" : "No recommendations found"}
            </h3>

            <div className="space-y-4">
              {recommendations.map((project) => (
                <Card key={project.id} className="border-primary/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{project.title}</CardTitle>
                      <Badge
                        className={`${
                          project.difficulty === "beginner"
                            ? "bg-green-500"
                            : project.difficulty === "intermediate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } text-white`}
                      >
                        {project.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-muted/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Helpful Resources:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {project.resources.map((resource, index) => (
                          <li key={index}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {resource.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Code className="mr-2 h-4 w-4" />
                      Start This Project
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
