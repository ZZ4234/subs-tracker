"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import type { Service, Category } from "@/lib/types"
import { getCategoryIcon } from "@/lib/data"

interface SubscriptionCardProps {
  subscription: Service
  category: Category
  showCount?: number
  onRemove: (id: string) => void
}

export default function SubscriptionCard({ subscription, category, showCount = 0, onRemove }: SubscriptionCardProps) {
  const CategoryIcon = getCategoryIcon(category.icon)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-1 ${category.color}`}></div>
      <CardHeader className="p-4 flex flex-row items-center">
        <div className="mr-3">
          <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
            {subscription.logoUrl ? (
              <Image
                src={subscription.logoUrl || "/placeholder.svg"}
                alt={subscription.name}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <CategoryIcon className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-semibold">{subscription.name}</h3>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {category.name}
            </span>
          </div>
          {subscription.description && (
            <p className="text-xs text-muted-foreground mt-0.5">{subscription.description}</p>
          )}
          <div className="flex justify-between mt-1">
            {category.id === "streaming" && (
              <span className="text-sm text-muted-foreground">
                {showCount} show{showCount !== 1 ? "s" : ""}
              </span>
            )}
            <span className="font-medium text-violet-600 dark:text-violet-400">
              ${subscription.monthlyCost.toFixed(2)}/mo
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(subscription.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </CardHeader>
    </Card>
  )
}
