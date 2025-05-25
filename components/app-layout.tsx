"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import BottomNav from "@/components/bottom-nav"
import { ThemeProvider } from "@/components/theme-provider"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pb-32">
        <main className="container max-w-md mx-auto p-4 pb-32">{children}</main>
        <BottomNav currentPath={pathname} />
      </div>
    </ThemeProvider>
  )
}
