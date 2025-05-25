"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AddShowDialog from "@/components/add-show-dialog"
import AdManager from "@/components/ads/ad-manager"
import type { Service, Show } from "@/lib/types"
import { trackShowAdded, trackPageView } from "@/lib/analytics"

export default function ShowsScreen() {
  const [services, setServices] = useState<Service[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const [isAddShowOpen, setIsAddShowOpen] = useState(false)

  useEffect(() => {
    // Track page view
    trackPageView("shows_screen")

    // Load data from localStorage on component mount
    const savedServices = localStorage.getItem("subscriptions")
    const savedShows = localStorage.getItem("watchingShows")

    if (savedServices) {
      setServices(JSON.parse(savedServices))
    }

    if (savedShows) {
      setShows(JSON.parse(savedShows))
    }
  }, [])

  useEffect(() => {
    // Save shows data to localStorage whenever it changes
    localStorage.setItem("watchingShows", JSON.stringify(shows))
  }, [shows])

  const addShow = (show: Show) => {
    setShows([...shows, show])
    setIsAddShowOpen(false)

    // Track show addition
    const service = services.find((s) => s.id === show.serviceId)
    trackShowAdded(show.title, service?.name || "Unknown Service")
  }

  const removeShow = (id: string) => {
    setShows(shows.filter((show) => show.id !== id))
  }

  // Helper function to get service name by ID
  const getServiceName = (serviceId: string): string => {
    const service = services.find((s) => s.id === serviceId)
    return service ? service.name : "Unknown Service"
  }

  // Helper function to get service color by ID
  const getServiceColor = (serviceId: string): string => {
    const service = services.find((s) => s.id === serviceId)
    if (!service) return "bg-gray-500"

    // Map service names to colors
    const name = service.name.toLowerCase()
    if (name.includes("netflix")) return "bg-red-600"
    if (name.includes("disney")) return "bg-blue-600"
    if (name.includes("hulu")) return "bg-green-600"
    if (name.includes("hbo") || name.includes("max")) return "bg-purple-600"
    if (name.includes("prime") || name.includes("amazon")) return "bg-blue-400"
    if (name.includes("apple")) return "bg-gray-800"
    if (name.includes("paramount")) return "bg-blue-800"
    if (name.includes("peacock")) return "bg-teal-600"

    // Default color
    return "bg-violet-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-2xl font-bold mb-1">Your Shows</h1>
        <p className="text-muted-foreground">Track what you're watching</p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Shows</h2>
        <Button
          onClick={() => setIsAddShowOpen(true)}
          size="sm"
          className="bg-violet-600 hover:bg-violet-700"
          disabled={services.length === 0}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>

      {shows.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">
            {services.length === 0 ? "Add a streaming service first before adding shows" : "No shows added yet"}
          </p>
          <Button
            onClick={() => setIsAddShowOpen(true)}
            disabled={services.length === 0}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Show
          </Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {shows.map((show) => (
            <Card key={show.id} className="overflow-hidden border-muted">
              <div className={`h-1 ${getServiceColor(show.serviceId)}`}></div>
              <CardHeader className="p-4 flex flex-row items-center">
                <div>
                  <CardTitle className="text-base">{show.title}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {getServiceName(show.serviceId)}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto text-muted-foreground hover:text-destructive"
                  onClick={() => removeShow(show.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Moved ads to bottom */}
      <div className="space-y-4 pt-8 border-t border-border">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Discover New Content</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Find shows and manage your streaming subscriptions better
          </p>
        </div>

        <AdManager placement="between-services" />
        <AdManager placement="home-bottom" />
      </div>

      <AddShowDialog open={isAddShowOpen} onOpenChange={setIsAddShowOpen} onAdd={addShow} services={services} />
    </div>
  )
}
