"use client"

import { useEffect, useState } from "react"
import { Plus, Filter, DollarSign, BarChart3, TrendingUp, Tv, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddSubscriptionDialog from "@/components/add-subscription-dialog"
import SubscriptionCard from "@/components/subscription-card"
import AddCategoryDialog from "@/components/add-category-dialog"
import AdManager from "@/components/ads/ad-manager"
import type { Service, Show, Category } from "@/lib/types"
import { calculateTotalCost } from "@/lib/utils"
import { defaultCategories } from "@/lib/data"
import { getCategoryIcon } from "@/lib/data"
import LocationSelector from "@/components/location-selector"
import { trackSubscriptionAdded, trackSubscriptionRemoved, trackFeatureUsed } from "@/lib/analytics"

export default function HomeScreen() {
  const [services, setServices] = useState<Service[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [showHowItWorks, setShowHowItWorks] = useState(true)

  useEffect(() => {
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
    } else {
      // Initialize with default categories if none exist
      localStorage.setItem("categories", JSON.stringify(defaultCategories))
    }

    // Initialize selected categories to include all categories
    setSelectedCategories(categories.map((cat) => cat.id))
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("subscriptions", JSON.stringify(services))
  }, [services])

  useEffect(() => {
    // Save shows data to localStorage whenever it changes
    localStorage.setItem("watchingShows", JSON.stringify(shows))
  }, [shows])

  useEffect(() => {
    // Save categories to localStorage whenever they change
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  const totalMonthlyCost = calculateTotalCost(services)

  const addSubscription = (service: Service) => {
    setServices([...services, service])
    setIsAddSubscriptionOpen(false)

    // Track the subscription addition
    trackSubscriptionAdded(service.name, service.monthlyCost, service.categoryId)
  }

  const removeSubscription = (id: string) => {
    const serviceToRemove = services.find((s) => s.id === id)
    setServices(services.filter((service) => service.id !== id))
    // Also remove shows associated with this service
    setShows(shows.filter((show) => show.serviceId !== id))

    // Track the subscription removal
    if (serviceToRemove) {
      trackSubscriptionRemoved(serviceToRemove.name, serviceToRemove.monthlyCost)
    }
  }

  const addCategory = (category: Category) => {
    const newCategories = [...categories, category]
    setCategories(newCategories)
    setSelectedCategories([...selectedCategories, category.id])
    setIsAddCategoryOpen(false)
  }

  // Filter services based on active category
  const filteredServices = services.filter((service) => {
    if (activeCategory === "all") {
      return selectedCategories.includes(service.categoryId)
    }
    return service.categoryId === activeCategory && selectedCategories.includes(service.categoryId)
  })

  // Get all category IDs that have at least one service
  const usedCategoryIds = [...new Set(services.map((service) => service.categoryId))]

  // Calculate cost by category
  const costByCategory = categories.reduce(
    (acc, category) => {
      const categoryCost = services
        .filter((service) => service.categoryId === category.id)
        .reduce((sum, service) => sum + service.monthlyCost, 0)

      return {
        ...acc,
        [category.id]: categoryCost,
      }
    },
    {} as Record<string, number>,
  )

  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })

    // Track filter usage
    trackFeatureUsed("category_filter")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {/* Hero Section */}
        {showIntroduction && (
          <div className="text-center py-8 px-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 relative">
            <button
              onClick={() => setShowIntroduction(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black flex items-center justify-center transition-colors"
              aria-label="Close introduction"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>

            <div className="flex items-center justify-between w-full mb-4">
              <div></div> {/* Spacer */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Tv className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Subscription Tracker
                </h1>
              </div>
              <LocationSelector />
            </div>

            <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
              Take control of your monthly subscriptions. Track spending, discover unused services, and save money.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium">Save Money</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium">Track Usage</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium">Get Insights</span>
              </div>
            </div>
          </div>
        )}

        {!showIntroduction && (
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Subscription Tracker
            </h1>
            <LocationSelector />
          </div>
        )}

        {/* Stats Card */}
        <Card className="bg-gradient-to-br from-violet-500 to-purple-700 text-white border-none shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-white/80 mb-1">Total Monthly Cost</p>
              <div className="text-4xl font-bold">${totalMonthlyCost.toFixed(2)}</div>
              <p className="text-white/70 mt-1">
                {services.length} subscription{services.length !== 1 ? "s" : ""} • ${(totalMonthlyCost * 12).toFixed(0)}
                /year
              </p>
              {services.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm text-white/80">
                    💡 Average user saves <span className="font-semibold">$127/month</span> by tracking subscriptions
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Subscriptions</h2>
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategorySelection(category.id)}
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => setIsAddSubscriptionOpen(true)}
              size="sm"
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start h-auto p-1 bg-muted/50">
            <TabsTrigger value="all" className="px-3 py-1.5 h-auto">
              All
            </TabsTrigger>
            {categories
              .filter((category) => usedCategoryIds.includes(category.id))
              .map((category) => {
                const CategoryIcon = getCategoryIcon(category.icon)
                return (
                  <TabsTrigger key={category.id} value={category.id} className="px-3 py-1.5 h-auto whitespace-nowrap">
                    <CategoryIcon className="h-4 w-4 mr-1" />
                    {category.name}
                    {costByCategory[category.id] > 0 && (
                      <span className="ml-1 text-xs opacity-70">${costByCategory[category.id].toFixed(0)}</span>
                    )}
                  </TabsTrigger>
                )
              })}
          </TabsList>
        </Tabs>

        {filteredServices.length === 0 ? (
          <div className="space-y-6">
            {/* How It Works Section */}
            {showHowItWorks && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 relative">
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black flex items-center justify-center transition-colors"
                  aria-label="Close how it works"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>

                <h3 className="text-xl font-semibold mb-4 text-center">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Add Your Subscriptions</h4>
                      <p className="text-sm text-muted-foreground">Track Netflix, Spotify, gym memberships, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Monitor Your Usage</h4>
                      <p className="text-sm text-muted-foreground">
                        See which services you actually use and which you don't
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Get Smart Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Discover ways to save money and optimize your subscriptions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-sm">Save Money</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cancel unused subscriptions and find better deals
                  </p>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-sm">Stay Organized</h4>
                  <p className="text-xs text-muted-foreground mt-1">Never lose track of what you're paying for</p>
                </div>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center py-6 bg-muted/30 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Ready to Take Control?</h3>
              <p className="text-muted-foreground mb-4 text-sm">Start by adding your first subscription</p>
              <div className="flex flex-col space-y-2 items-center">
                <Button
                  onClick={() => setIsAddSubscriptionOpen(true)}
                  className="bg-violet-600 hover:bg-violet-700 px-8"
                  size="lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Your First Subscription
                </Button>
                <Button onClick={() => setIsAddCategoryOpen(true)} variant="outline" size="sm">
                  <Plus className="mr-2 h-3 w-3" />
                  Create Custom Category
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredServices.map((service) => (
              <SubscriptionCard
                key={service.id}
                subscription={service}
                category={categories.find((c) => c.id === service.categoryId) || categories[categories.length - 1]}
                showCount={shows.filter((show) => show.serviceId === service.id).length}
                onRemove={removeSubscription}
              />
            ))}
          </div>
        )}
      </div>

      {/* Money-Saving Tips Section */}
      <div className="space-y-4 pt-8 border-t border-border">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">💰 Save Even More Money</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {services.length > 0
              ? "You're tracking your subscriptions! Here are tools to save even more:"
              : "Recommended tools to help you save money on subscriptions:"}
          </p>
        </div>

        {services.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">💡</span>
              </div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-200">Quick Tip</h4>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Review your subscriptions monthly. The average person has 3-5 unused subscriptions costing $127/month!
            </p>
          </div>
        )}

        <AdManager placement="home-top" />
        <AdManager placement="home-bottom" />
      </div>

      <AddSubscriptionDialog
        open={isAddSubscriptionOpen}
        onOpenChange={setIsAddSubscriptionOpen}
        onAdd={addSubscription}
        categories={categories}
        onAddCategory={() => setIsAddCategoryOpen(true)}
      />

      <AddCategoryDialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen} onAdd={addCategory} />
    </div>
  )
}
