"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  X,
  ArrowRight,
  Check,
  Lightbulb,
  Code,
  Globe,
  Database,
  Cpu,
  Layers,
  Smartphone,
  Braces,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

export function ProjectGeneratorButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("interests")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<ProjectRecommendation[]>([])
  const [customProject, setCustomProject] = useState({
    title: "",
    description: "",
    features: "",
    technologies: "",
  })
  const [generatedProject, setGeneratedProject] = useState<ProjectRecommendation | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests((prev) => [...prev, interestId])
    } else {
      setSelectedInterests((prev) => prev.filter((id) => id !== interestId))
    }
  }

  const generateRecommendations = () => {
    setIsGenerating(true)

    // Simulate loading
    setTimeout(() => {
      if (selectedInterests.length === 0) {
        setRecommendations([])
        setIsGenerating(false)
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
      setIsGenerating(false)
      setActiveTab("recommendations")
    }, 1500)
  }

  const generateCustomProject = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      // Create a custom project based on user input
      const techTags = customProject.technologies
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const newProject: ProjectRecommendation = {
        id: "custom-project",
        title: customProject.title || "Custom Project",
        description: customProject.description || "A custom project based on your specifications.",
        tags: techTags.length > 0 ? techTags : ["React", "Next.js", "Tailwind CSS"],
        difficulty: "intermediate",
        interests: selectedInterests,
        resources: [
          { title: "React Documentation", url: "https://reactjs.org/docs" },
          { title: "Next.js Documentation", url: "https://nextjs.org/docs" },
          { title: "Tailwind CSS Documentation", url: "https://tailwindcss.com/docs" },
        ],
      }

      setGeneratedProject(newProject)
      setIsGenerating(false)
      setActiveTab("generated")
    }, 2000)
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-42 left-42 z-40 h-12 w-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-md"
        onClick={() => setIsOpen(true)}
        aria-label="Project Generator"
        style={{ bottom: "96px", left: "24px" }}
      >
        <Sparkles className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            <motion.div
              className="relative z-10 w-full max-w-4xl rounded-lg border border-primary/20 bg-background p-6 shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Project Generator</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="interests" className="flex items-center gap-1">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Interests
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="flex items-center gap-1">
                    <Code className="mr-2 h-4 w-4" />
                    Custom Project
                  </TabsTrigger>
                  {recommendations.length > 0 || generatedProject ? (
                    <TabsTrigger
                      value={generatedProject ? "generated" : "recommendations"}
                      className="flex items-center gap-1"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {generatedProject ? "Generated Project" : "Recommendations"}
                    </TabsTrigger>
                  ) : (
                    <TabsTrigger value="recommendations" disabled className="flex items-center gap-1">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Recommendations
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="interests" className="mt-4 space-y-4">
                  <Card>
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
                      <Button
                        onClick={generateRecommendations}
                        className="w-full"
                        disabled={selectedInterests.length === 0 || isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                              className="mr-2"
                            >
                              <Sparkles className="h-4 w-4" />
                            </motion.div>
                            Generating Recommendations...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Recommendations
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="custom" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="mr-2 h-5 w-5 text-primary" />
                        Create Custom Project
                      </CardTitle>
                      <CardDescription>
                        Describe your project idea and we'll generate a detailed project plan
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-title">Project Title</Label>
                        <Input
                          id="project-title"
                          placeholder="E.g., AI-Powered Task Manager"
                          value={customProject.title}
                          onChange={(e) => setCustomProject({ ...customProject, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project-description">Project Description</Label>
                        <Textarea
                          id="project-description"
                          placeholder="Describe your project idea in detail..."
                          rows={3}
                          value={customProject.description}
                          onChange={(e) => setCustomProject({ ...customProject, description: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project-features">Key Features</Label>
                        <Textarea
                          id="project-features"
                          placeholder="List the main features you want to include..."
                          rows={3}
                          value={customProject.features}
                          onChange={(e) => setCustomProject({ ...customProject, features: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project-technologies">Technologies (comma separated)</Label>
                        <Input
                          id="project-technologies"
                          placeholder="E.g., React, Node.js, MongoDB"
                          value={customProject.technologies}
                          onChange={(e) => setCustomProject({ ...customProject, technologies: e.target.value })}
                        />
                      </div>

                      <div className="pt-2">
                        <p className="text-sm font-medium mb-2">Select Relevant Interests</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {interests.map((interest) => (
                            <div key={interest.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`custom-${interest.id}`}
                                checked={selectedInterests.includes(interest.id)}
                                onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                              />
                              <Label htmlFor={`custom-${interest.id}`} className="flex items-center">
                                <span className="mr-2">{interest.icon}</span>
                                {interest.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={generateCustomProject}
                        className="w-full"
                        disabled={!customProject.title || !customProject.description || isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                              className="mr-2"
                            >
                              <Sparkles className="h-4 w-4" />
                            </motion.div>
                            Generating Project...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Custom Project
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-4">
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
                </TabsContent>

                <TabsContent value="generated" className="mt-4">
                  {generatedProject && (
                    <Card className="border-primary/10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-green-500" />
                            {generatedProject.title}
                          </CardTitle>
                          <Badge className="bg-green-500 text-white">Generated</Badge>
                        </div>
                        <CardDescription>{generatedProject.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {generatedProject.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="bg-muted/50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {customProject.features && (
                          <div>
                            <h4 className="mb-2 text-sm font-medium">Key Features:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              {customProject.features.split("\n").map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <h4 className="mb-2 text-sm font-medium">Implementation Steps:</h4>
                          <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Set up project structure and install dependencies</li>
                            <li>Create basic UI components and layouts</li>
                            <li>Implement core functionality</li>
                            <li>Add authentication and user management</li>
                            <li>Connect to backend services and APIs</li>
                            <li>Add styling and responsive design</li>
                            <li>Test and debug</li>
                            <li>Deploy to production</li>
                          </ol>
                        </div>

                        <div>
                          <h4 className="mb-2 text-sm font-medium">Helpful Resources:</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {generatedProject.resources.map((resource, index) => (
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
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">
                          <Code className="mr-2 h-4 w-4" />
                          Export Project Plan
                        </Button>
                        <Button>
                          Start Building
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
