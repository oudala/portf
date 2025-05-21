"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, X, Briefcase, GraduationCap, Award, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function CVPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-md"
        onClick={() => setIsOpen(true)}
        aria-label="Open CV"
      >
        <FileText className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-primary/20 bg-background/80 p-6 backdrop-blur-md md:max-w-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Curriculum Vitae</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close CV panel">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Tabs defaultValue="experience" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="experience">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="skills">
                  <Code className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="certifications">
                  <Award className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Certifications</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience" className="mt-6 space-y-4">
                <ExperienceItem
                  title="Senior Frontend Developer"
                  company="Tech Innovations Inc."
                  period="2021 - Present"
                  description="Led the development of multiple web applications using React, Next.js, and TypeScript. Implemented CI/CD pipelines and mentored junior developers."
                />
                <ExperienceItem
                  title="Frontend Developer"
                  company="Digital Solutions Ltd."
                  period="2018 - 2021"
                  description="Developed responsive web applications and implemented modern frontend practices. Collaborated with designers and backend developers to deliver high-quality products."
                />
                <ExperienceItem
                  title="Web Developer Intern"
                  company="StartUp Hub"
                  period="2017 - 2018"
                  description="Assisted in the development of web applications and learned modern web development practices. Gained experience with React and Node.js."
                />
              </TabsContent>

              <TabsContent value="education" className="mt-6 space-y-4">
                <EducationItem
                  degree="Master of Computer Science"
                  institution="University of Technology"
                  period="2016 - 2018"
                  description="Specialized in Web Technologies and Software Engineering. Graduated with honors."
                />
                <EducationItem
                  degree="Bachelor of Computer Science"
                  institution="State University"
                  period="2012 - 2016"
                  description="Focused on Software Development and Database Systems. Participated in multiple hackathons and coding competitions."
                />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Frontend Development</h3>
                    <div className="space-y-3">
                      <SkillItem name="React / Next.js" level={95} />
                      <SkillItem name="TypeScript" level={90} />
                      <SkillItem name="HTML / CSS / Tailwind" level={95} />
                      <SkillItem name="Three.js / WebGL" level={85} />
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Backend Development</h3>
                    <div className="space-y-3">
                      <SkillItem name="Node.js / Express" level={85} />
                      <SkillItem name="Python / Django" level={75} />
                      <SkillItem name="SQL / NoSQL Databases" level={80} />
                      <SkillItem name="GraphQL" level={70} />
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Other Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Git</Badge>
                      <Badge>Docker</Badge>
                      <Badge>CI/CD</Badge>
                      <Badge>AWS</Badge>
                      <Badge>Firebase</Badge>
                      <Badge>Jest</Badge>
                      <Badge>Cypress</Badge>
                      <Badge>Figma</Badge>
                      <Badge>Agile</Badge>
                      <Badge>Scrum</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="certifications" className="mt-6 space-y-4">
                <CertificationItem
                  name="AWS Certified Developer"
                  issuer="Amazon Web Services"
                  date="2022"
                  credentialId="AWS-DEV-12345"
                />
                <CertificationItem
                  name="Professional Frontend Developer"
                  issuer="Meta"
                  date="2021"
                  credentialId="MFD-67890"
                />
                <CertificationItem
                  name="Google Cloud Professional"
                  issuer="Google"
                  date="2020"
                  credentialId="GCP-54321"
                />
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Button className="w-full">Download Full CV</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ExperienceItem({
  title,
  company,
  period,
  description,
}: { title: string; company: string; period: string; description: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{company}</CardDescription>
          </div>
          <Badge variant="outline">{period}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function EducationItem({
  degree,
  institution,
  period,
  description,
}: { degree: string; institution: string; period: string; description: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{degree}</CardTitle>
            <CardDescription>{institution}</CardDescription>
          </div>
          <Badge variant="outline">{period}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function SkillItem({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <Progress value={level} className="h-2" />
    </div>
  )
}

function CertificationItem({
  name,
  issuer,
  date,
  credentialId,
}: { name: string; issuer: string; date: string; credentialId: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{issuer}</CardDescription>
          </div>
          <Badge variant="outline">{date}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Credential ID: {credentialId}</p>
      </CardContent>
    </Card>
  )
}
