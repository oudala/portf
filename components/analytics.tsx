"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would typically add your analytics tracking code
    // For example, with Google Analytics:
    const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`
    console.log(`Page view: ${url}`)

    // Example of how you would track with Google Analytics
    // if (typeof window.gtag === 'function') {
    //   window.gtag('config', 'GA-TRACKING-ID', {
    //     page_path: url,
    //   })
    // }
  }, [pathname, searchParams])

  return null
}
