"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServicesList from "@/components/services-list"
import ShowsList from "@/components/shows-list"
import AddServiceDialog from "@/components/add-service-dialog"
import AddShowDialog from "@/components/add-show-dialog"
import type { Service, Show } from "@/lib/types"
import { calculateTotalCost, getRecommendationsToRemove } from "@/lib/utils"

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [isAddShowOpen, setIsAddShowOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Load data from localStorage on component mount
    const savedServices = localStorage.getItem("streamingServices")
    const savedShows = localStorage.getItem("watchingShows")

    if (savedServices) {
      setServices(JSON.parse(savedServices))
    }

    if (savedShows) {
      setShows(JSON.parse(savedShows))
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("streamingServices", JSON.stringify(services))
    localStorage.setItem("watchingShows", JSON.stringify(shows))
  }, [services, shows])

  const totalMonthlyCost = calculateTotalCost(services)
  const recommendations = getRecommendationsToRemove(services, shows)

  const addService = (service: Service) => {
    setServices([...services, service])
    setIsAddServiceOpen(false)
  }

  const removeService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
    // Also remove shows associated with this service
    setShows(shows.filter((show) => show.serviceId !== id))
  }

  const addShow = (show: Show) => {
    setShows([...shows, show])
    setIsAddShowOpen(false)
  }

  const removeShow = (id: string) => {
    setShows(shows.filter((show) => show.id !== id))
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="shows">Shows</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Monthly Cost</CardTitle>
              <CardDescription>Your total streaming expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalMonthlyCost.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Across {services.length} service{services.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          {recommendations.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Services you might consider canceling</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec.id} className="flex justify-between items-center">
                      <span>{rec.name}</span>
                      <span className="text-sm text-muted-foreground">${rec.monthlyCost.toFixed(2)}/mo</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setIsAddServiceOpen(true)} className="w-full" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
            <Button
              onClick={() => setIsAddShowOpen(true)}
              className="w-full"
              variant="outline"
              disabled={services.length === 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Show
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <ServicesList services={services} onRemove={removeService} onAdd={() => setIsAddServiceOpen(true)} />
        </TabsContent>

        <TabsContent value="shows">
          <ShowsList shows={shows} services={services} onRemove={removeShow} onAdd={() => setIsAddShowOpen(true)} />
        </TabsContent>
      </Tabs>

      <AddServiceDialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen} onAdd={addService} />

      <AddShowDialog open={isAddShowOpen} onOpenChange={setIsAddShowOpen} onAdd={addShow} services={services} />
    </div>
  )
}
