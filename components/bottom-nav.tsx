"use client"

import Link from "next/link"
import { Home, Tv, Zap, Info, BookOpen } from "lucide-react"

interface BottomNavProps {
  currentPath: string
}

export default function BottomNav({ currentPath }: BottomNavProps) {
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/shows", icon: Tv, label: "Shows" },
    { href: "/recommendations", icon: Zap, label: "Optimize" },
    { href: "/about", icon: Info, label: "About" },
    { href: "/blog", icon: BookOpen, label: "Blog" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = currentPath === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive ? "text-purple-400" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
