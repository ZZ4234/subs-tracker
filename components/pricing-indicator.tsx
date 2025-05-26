"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, Wifi } from "lucide-react"

interface PricingIndicatorProps {
  serviceName: string
  countryCode: string
  isRealTime?: boolean
  lastUpdated?: string
}

export default function PricingIndicator({
  serviceName,
  countryCode,
  isRealTime = false,
  lastUpdated,
}: PricingIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState<string>("")

  useEffect(() => {
    if (lastUpdated) {
      const updateTime = () => {
        const now = new Date()
        const updated = new Date(lastUpdated)
        const diffMs = now.getTime() - updated.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffHours / 24)

        if (diffDays > 0) {
          setTimeAgo(`${diffDays}d ago`)
        } else if (diffHours > 0) {
          setTimeAgo(`${diffHours}h ago`)
        } else {
          setTimeAgo("Just now")
        }
      }

      updateTime()
      const interval = setInterval(updateTime, 60000) // Update every minute
      return () => clearInterval(interval)
    }
  }, [lastUpdated])

  if (isRealTime) {
    return (
      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        <Wifi className="h-3 w-3 mr-1" />
        Live pricing
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="text-xs">
      <Clock className="h-3 w-3 mr-1" />
      {timeAgo || "Cached"}
    </Badge>
  )
}
