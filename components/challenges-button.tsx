"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, X, Play, Lightbulb, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { challenges } from "@/lib/challenges-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CodeEditor } from "@/components/code-editor"

export function ChallengesButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0])
  const [code, setCode] = useState(selectedChallenge.starterCode || "// Write your solution here\n\n")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleRunCode = () => {
    setIsRunning(true)
    setOutput("Running code...")

    // Simulate code execution with a timeout
    setTimeout(() => {
      try {
        // In a real implementation, you would use a safer way to evaluate code
        // This is just for demonstration purposes
        const result = new Function(`
          let console = {
            log: function(msg) {
              return msg;
            }
          };
          ${code}
          // Test the solution with example inputs
          if (typeof ${selectedChallenge.testFunction} === 'function') {
            return ${selectedChallenge.testFunction}(${selectedChallenge.testInput});
          } else {
            return "Function not defined correctly";
          }
        `)()

        setOutput(typeof result === "object" ? JSON.stringify(result, null, 2) : String(result))
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setIsRunning(false)
      }
    }, 1000)
  }

  const resetCode = () => {
    setCode(selectedChallenge.starterCode || "// Write your solution here\n\n")
    setOutput("")
  }

  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-md"
        onClick={() => setIsOpen(true)}
        aria-label="Open Coding Challenges"
      >
        <Code className="h-5 w-5" />
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
              className="relative z-10 w-full max-w-5xl rounded-lg border border-primary/20 bg-background p-6 shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Coding Challenges</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {challenges.map((challenge) => (
                  <Button
                    key={challenge.id}
                    variant={selectedChallenge.id === challenge.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedChallenge(challenge)
                      setCode(challenge.starterCode || "// Write your solution here\n\n")
                      setOutput("")
                    }}
                    className={selectedChallenge.id === challenge.id ? "bg-primary" : "border-primary/20"}
                  >
                    {challenge.title}
                  </Button>
                ))}
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedChallenge.title}</h3>
                  <p className="text-muted-foreground">{selectedChallenge.description}</p>
                </div>
                <Badge className={`${difficultyColor[selectedChallenge.difficulty]} text-white`}>
                  {selectedChallenge.difficulty}
                </Badge>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {selectedChallenge.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  <Tabs defaultValue="problem">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="problem">Problem</TabsTrigger>
                      <TabsTrigger value="hint" className="flex items-center gap-1">
                        <Lightbulb className="h-4 w-4" />
                        Hint
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="problem" className="rounded-md border border-primary/10 bg-muted/30 p-4">
                      <p className="whitespace-pre-wrap">{selectedChallenge.problem}</p>
                    </TabsContent>
                    <TabsContent value="hint" className="rounded-md border border-primary/10 bg-muted/30 p-4">
                      <p className="whitespace-pre-wrap">{selectedChallenge.hint}</p>
                    </TabsContent>
                  </Tabs>

                  <div className="rounded-md border border-primary/10 bg-muted/30 p-4">
                    <h4 className="mb-2 font-medium">Output</h4>
                    <pre className="max-h-[200px] overflow-auto rounded bg-muted p-2 text-sm">
                      {output || "Run your code to see the output here..."}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-md border border-primary/10 bg-muted/30">
                    <div className="flex items-center justify-between border-b border-primary/10 px-4 py-2">
                      <h4 className="font-medium">Solution</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={resetCode} className="h-8 border-primary/20">
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Reset
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRunCode}
                          disabled={isRunning}
                          className="h-8 border-primary/20"
                        >
                          <Play className="mr-1 h-3 w-3" />
                          Run
                        </Button>
                      </div>
                    </div>
                    <CodeEditor value={code} onChange={setCode} language="javascript" height="350px" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
