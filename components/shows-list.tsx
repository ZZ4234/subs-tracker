"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Service, Show } from "@/lib/types"

interface ShowsListProps {
  shows: Show[]
  services: Service[]
  onRemove: (id: string) => void
  onAdd: () => void
}

export default function ShowsList({ shows, services, onRemove, onAdd }: ShowsListProps) {
  // Helper function to get service name by ID
  const getServiceName = (serviceId: string): string => {
    const service = services.find((s) => s.id === serviceId)
    return service ? service.name : "Unknown Service"
  }

  return (
    <div className="space-y-4">
      {shows.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            {services.length === 0 ? "Add a streaming service first before adding shows" : "No shows added yet"}
          </p>
          <Button onClick={onAdd} disabled={services.length === 0}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Show
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {shows.map((show) => (
              <Card key={show.id}>
                <CardHeader className="pb-2 flex flex-row items-center">
                  <div>
                    <CardTitle className="text-lg">{show.title}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {getServiceName(show.serviceId)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto text-destructive"
                    onClick={() => onRemove(show.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button onClick={onAdd} className="w-full" disabled={services.length === 0}>
            <Plus className="mr-2 h-4 w-4" />
            Add Another Show
          </Button>
        </>
      )}
    </div>
  )
}
