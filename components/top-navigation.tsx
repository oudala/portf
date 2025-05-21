"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, X, Lightbulb, Eye, Copy, Check, BookOpen } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { challenges } from "@/lib/challenges-data"

export function TopNavigation() {
  const [isChallengeOpen, setIsChallengeOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0])
  const [activeTab, setActiveTab] = useState("problem")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedChallenge.solution)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  }

  return (
    <div className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center space-x-4">
      <Link href="#challenges">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-primary/20 bg-background/50 backdrop-blur-md hover:bg-primary/10"
          onClick={() => setIsChallengeOpen(true)}
          aria-label="Coding Challenges"
        >
          <Code className="h-5 w-5 text-primary" />
        </Button>
      </Link>

      <AnimatePresence>
        {isChallengeOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-2xl -translate-x-1/2 rounded-lg border border-primary/20 bg-background/80 p-4 backdrop-blur-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Coding Challenges</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsChallengeOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {challenges.map((challenge) => (
                <Button
                  key={challenge.id}
                  variant={selectedChallenge.id === challenge.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedChallenge(challenge)}
                  className={selectedChallenge.id === challenge.id ? "bg-primary" : "border-primary/20"}
                >
                  {challenge.title}
                </Button>
              ))}
            </div>

            <Card className="border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedChallenge.title}</CardTitle>
                  <Badge className={`${difficultyColor[selectedChallenge.difficulty]} text-white`}>
                    {selectedChallenge.difficulty}
                  </Badge>
                </div>
                <CardDescription>{selectedChallenge.description}</CardDescription>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedChallenge.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-muted/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="problem" className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      Problem
                    </TabsTrigger>
                    <TabsTrigger value="hint" className="flex items-center gap-1">
                      <Lightbulb className="h-4 w-4" />
                      Hint
                    </TabsTrigger>
                    <TabsTrigger value="solution" className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      Solution
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="problem" className="mt-4">
                    <p className="text-sm text-muted-foreground">{selectedChallenge.problem}</p>
                  </TabsContent>
                  <TabsContent value="hint" className="mt-4">
                    <p className="text-sm text-muted-foreground">{selectedChallenge.hint}</p>
                  </TabsContent>
                  <TabsContent value="solution" className="mt-4">
                    <div className="relative">
                      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                        <code>{selectedChallenge.solution}</code>
                      </pre>
                      <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={copyToClipboard}>
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy code</span>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20"
                  onClick={() => setIsChallengeOpen(false)}
                >
                  Close
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
