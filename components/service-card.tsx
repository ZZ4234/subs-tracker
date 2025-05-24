"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import type { Service } from "@/lib/types"

interface ServiceCardProps {
  service: Service
  showCount: number
  onRemove: (id: string) => void
}

export default function ServiceCard({ service, showCount, onRemove }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 flex flex-row items-center">
        <div className="mr-3">
          <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
            {service.logoUrl ? (
              <Image
                src={service.logoUrl || "/placeholder.svg"}
                alt={service.name}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <span className="text-xl font-bold">{service.name.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{service.name}</h3>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              {showCount} show{showCount !== 1 ? "s" : ""}
            </span>
            <span className="font-medium text-violet-600 dark:text-violet-400">
              ${service.monthlyCost.toFixed(2)}/mo
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(service.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </CardHeader>
    </Card>
  )
}
