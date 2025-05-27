"use client"

import { useEffect, useState } from "react"
import { Plus, Filter, DollarSign, BarChart3, TrendingUp, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ServicesList from "@/components/services-list"
import AddSubscriptionDialog from "@/components/add-subscription-dialog"
import AddShowDialog from "@/components/add-show-dialog"
import AddCategoryDialog from "@/components/add-category-dialog"
import type { Service, Show, Category } from "@/lib/types"
import { calculateTotalCost, getRecommendationsToRemove } from "@/lib/utils"
import { defaultCategories } from "@/lib/data"
import { trackSubscriptionAdded, trackPageView } from "@/lib/analytics"

export default function HomeScreen() {
  const [services, setServices] = useState<Service[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [isAddShowOpen, setIsAddShowOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    // Track page view
    trackPageView("home_screen")

    // Simulate location detection
    setTimeout(() => {
      setIsDetecting(false)
    }, 2000)

    // Load data from localStorage on component mount
    const savedServices = localStorage.getItem("subscriptions")
    const savedShows = localStorage.getItem("watchingShows")
    const savedCategories = localStorage.getItem("categories")

    if (savedServices) {
      setServices(JSON.parse(savedServices))
    }

    if (savedShows) {
      setShows(JSON.parse(savedShows))
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("subscriptions", JSON.stringify(services))
    localStorage.setItem("watchingShows", JSON.stringify(shows))
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [services, shows, categories])

  const totalMonthlyCost = calculateTotalCost(services)
  const totalYearlyCost = totalMonthlyCost * 12
  const recommendations = getRecommendationsToRemove(services, shows)

  const addService = (service: Service) => {
    setServices([...services, service])
    setIsAddServiceOpen(false)

    // Track subscription addition
    const category = categories.find((c) => c.id === service.categoryId)
    trackSubscriptionAdded(service.name, service.monthlyCost, category?.name || "Unknown")
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

  const addCategory = (category: Category) => {
    setCategories([...categories, category])
    setIsAddCategoryOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        {/* Header Card */}
        <Card className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={() => setIsHowItWorksOpen(true)}
            >
              <Info className="h-4 w-4" />
            </Button>
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Subscription Tracker</CardTitle>
            <CardDescription className="text-purple-100">
              Take control of your monthly subscriptions. Track spending, discover unused services, and save money.
            </CardDescription>

            {isDetecting && (
              <div className="flex items-center justify-center mt-4 text-purple-200">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-300 mr-2"></div>
                Detecting...
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-xs text-green-300">Save Money</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-xs text-blue-300">Track Usage</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-xs text-purple-300">Get Insights</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Cost Card */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0">
          <CardContent className="text-center py-6">
            <div className="text-sm text-purple-100 mb-1">Total Monthly Cost</div>
            <div className="text-4xl font-bold text-white mb-1">${totalMonthlyCost.toFixed(2)}</div>
            <div className="text-purple-200 text-sm">
              {services.length} subscription{services.length !== 1 ? "s" : ""} • ${totalYearlyCost.toFixed(2)}/year
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            {recommendations.length > 0 && (
              <Card className="bg-amber-500/10 border-amber-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-300">Recommendations</CardTitle>
                  <CardDescription className="text-amber-200">Services you might consider canceling</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendations.map((rec) => (
                      <li key={rec.id} className="flex justify-between items-center">
                        <span className="text-white">{rec.name}</span>
                        <span className="text-amber-300">${rec.monthlyCost.toFixed(2)}/mo</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setIsAddServiceOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
              <Button
                onClick={() => setIsAddShowOpen(true)}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                disabled={services.length === 0}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Show
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Your Subscriptions</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  <Filter className="mr-1 h-4 w-4" />
                  Filter
                </Button>
                <Button
                  onClick={() => setIsAddServiceOpen(true)}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>

            {services.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No subscriptions yet</h3>
                  <p className="text-slate-400 mb-4">Add your first subscription to get started</p>
                  <Button onClick={() => setIsAddServiceOpen(true)} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Subscription
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700">
                  <span className="text-slate-400 text-sm">All</span>
                </div>
                <ServicesList services={services} onRemove={removeService} onAdd={() => setIsAddServiceOpen(true)} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Pricing Intelligence</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time pricing data for your subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-400">Pricing data will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* How It Works Dialog */}
        <Dialog open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-white">How It Works</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                onClick={() => setIsHowItWorksOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-white">Add Your Subscriptions</h4>
                  <p className="text-sm text-slate-400">Track Netflix, Spotify, gym memberships, and more</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-white">Monitor Your Usage</h4>
                  <p className="text-sm text-slate-400">See which services you actually use and which you don't</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-white">Get Smart Recommendations</h4>
                  <p className="text-sm text-slate-400">Discover ways to save money and optimize your spending</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialogs */}
        <AddSubscriptionDialog
          open={isAddServiceOpen}
          onOpenChange={setIsAddServiceOpen}
          onAdd={addService}
          categories={categories}
          onAddCategory={() => setIsAddCategoryOpen(true)}
        />

        <AddShowDialog open={isAddShowOpen} onOpenChange={setIsAddShowOpen} onAdd={addShow} services={services} />

        <AddCategoryDialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen} onAdd={addCategory} />
      </div>
    </div>
  )
}
