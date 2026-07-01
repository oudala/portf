import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TerminalProvider } from "@/components/terminal/terminal-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oulad Dahman Ilyass | Software Engineer Portfolio",
  description:
    "Portfolio showcasing the work and skills of Oulad Dahman Ilyass, a software engineer and research assistant at Oracle.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TerminalProvider>{children}</TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
