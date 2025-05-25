"use client"

import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { useState } from "react"

interface BannerAdProps {
  title: string
  description: string
  imageUrl: string
  ctaText: string
  ctaUrl: string
  onClose?: () => void
  dismissible?: boolean
}

export default function BannerAd({
  title,
  description,
  imageUrl,
  ctaText,
  ctaUrl,
  onClose,
  dismissible = true,
}: BannerAdProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
      {dismissible && (
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <div className="flex items-center p-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1 truncate">{title}</h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md transition-colors"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </Card>
  )
}
