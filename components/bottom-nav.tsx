"use client"

import Link from "next/link"
import { Home, Tv, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  currentPath: string
}

export default function BottomNav({ currentPath }: BottomNavProps) {
  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
    },
    {
      href: "/shows",
      icon: Tv,
      label: "Shows",
    },
    {
      href: "/recommendations",
      icon: TrendingUp,
      label: "Optimize",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border">
      <nav className="container max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPath === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-4 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-6 w-6 mb-1", isActive ? "text-primary" : "")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
