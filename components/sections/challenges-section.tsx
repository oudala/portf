"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Copy, Check, Lightbulb, Code, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  problem: string
  hint: string
  solution: string
}

const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Palindrome Checker",
    description: "Create a function to check if a string is a palindrome",
    difficulty: "easy",
    tags: ["Strings", "Algorithms"],
    problem:
      "Write a function that checks if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).",
    hint: "Consider using string manipulation methods to remove spaces and special characters, then compare the string with its reverse.",
    solution: `function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Compare with reversed string
  return cleanStr === cleanStr.split('').reverse().join('');
}

// Example usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false`,
  },
  {
    id: "challenge-2",
    title: "FizzBuzz Implementation",
    description: "Implement the classic FizzBuzz problem",
    difficulty: "easy",
    tags: ["Loops", "Conditionals"],
    problem:
      "Write a function that prints numbers from 1 to n. For multiples of 3, print 'Fizz' instead of the number. For multiples of 5, print 'Buzz'. For numbers that are multiples of both 3 and 5, print 'FizzBuzz'.",
    hint: "Use modulo operator (%) to check if a number is divisible by another number.",
    solution: `function fizzBuzz(n) {
  const result = [];
  
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(i.toString());
    }
  }
  
  return result;
}

// Example usage
console.log(fizzBuzz(15));
// Output: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]`,
  },
  {
    id: "challenge-3",
    title: "Anagram Detector",
    description: "Create a function to check if two strings are anagrams",
    difficulty: "medium",
    tags: ["Strings", "Algorithms"],
    problem:
      "Write a function that determines if two strings are anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.",
    hint: "Consider sorting the characters of both strings or using a character frequency counter.",
    solution: `function areAnagrams(str1, str2) {
  // Remove spaces and convert to lowercase
  const normalize = (str) => str.toLowerCase().replace(/\\s/g, '');
  
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  
  // Check if lengths are different
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }
  
  // Sort and compare
  return normalizedStr1.split('').sort().join('') === normalizedStr2.split('').sort().join('');
}

// Example usage
console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world")); // false`,
  },
]

export function ChallengesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    <section id="challenges" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">Coding Challenges</h2>
        <p className="mt-4 text-muted-foreground">Test your skills with these programming challenges</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {challenges.map((challenge) => (
          <motion.div key={challenge.id} variants={itemVariants}>
            <ChallengeCard challenge={challenge} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const [activeTab, setActiveTab] = useState("problem")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(challenge.solution)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  }

  return (
    <Card className="border-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{challenge.title}</CardTitle>
          <Badge className={`${difficultyColor[challenge.difficulty]} text-white`}>{challenge.difficulty}</Badge>
        </div>
        <CardDescription>{challenge.description}</CardDescription>
        <div className="mt-2 flex flex-wrap gap-2">
          {challenge.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="problem">
              <Code className="mr-2 h-4 w-4" />
              Problem
            </TabsTrigger>
            <TabsTrigger value="hint">
              <Lightbulb className="mr-2 h-4 w-4" />
              Hint
            </TabsTrigger>
            <TabsTrigger value="solution">
              <Eye className="mr-2 h-4 w-4" />
              Solution
            </TabsTrigger>
          </TabsList>
          <TabsContent value="problem" className="mt-4">
            <p className="text-sm text-muted-foreground">{challenge.problem}</p>
          </TabsContent>
          <TabsContent value="hint" className="mt-4">
            <p className="text-sm text-muted-foreground">{challenge.hint}</p>
          </TabsContent>
          <TabsContent value="solution" className="mt-4">
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                <code>{challenge.solution}</code>
              </pre>
              <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
