import type { Metadata } from "next"
import { JapaneseWaveHero } from "@/components/japanese-wave-hero"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { EducationSection } from "@/components/sections/education-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ParascholaireSection } from "@/components/sections/paraschoolaire-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { SectionDivider } from "@/components/section-divider"
import { CVTerminalButton } from "@/components/cv-terminal-button"
import { Terminal } from "@/components/terminal/terminal"
import { ChallengesButton } from "@/components/challenges-button"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Oulad Dahman Ilyass | Software Engineer Portfolio",
  description: "Portfolio showcasing the work and skills of Oulad Dahman Ilyass, a Computer Science Student.",
}

export default function HomePage() {
  return (
    <main className="bg-[#f5f0e8] text-[#1a1a1a]">
      <Navigation />
      <JapaneseWaveHero />

      <div className="container mx-auto px-4">
        <AboutSection />
      </div>

      <SectionDivider />

      <ProjectsSection />

      <SectionDivider />

      <div className="container mx-auto px-4">
        <SkillsSection />
        <SectionDivider />
        <EducationSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <ParascholaireSection />
        <SectionDivider />
        <ContactSection />
      </div>

      <Footer />
      <CVTerminalButton />
      <Terminal />
      <ChallengesButton />
    </main>
  )
}
