"use client"

import { useEffect, useState } from "react"
import { Plus, Filter, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddSubscriptionDialog from "@/components/add-subscription-dialog"
import SubscriptionCard from "@/components/subscription-card"
import AddCategoryDialog from "@/components/add-category-dialog"
import type { Service, Show, Category } from "@/lib/types"
import { calculateTotalCost } from "@/lib/utils"
import { getCategoryIcon, defaultCategories } from "@/lib/data"
import {
  getCategoriesAction,
  createCategoryAction,
  getServicesAction,
  createServiceAction,
  deleteServiceAction,
  getShowsAction,
} from "@/app/actions"

export default function HomeScreen() {
  const [services, setServices] = useState<Service[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingLocalStorage, setUsingLocalStorage] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // Try to load from database first
      try {
        const [categoriesData, servicesData, showsData] = await Promise.all([
          getCategoriesAction(),
          getServicesAction(),
          getShowsAction(),
        ])

        setCategories(categoriesData)
        setServices(servicesData)
        setShows(showsData)
        setSelectedCategories(categoriesData.map((cat) => cat.id))
        setUsingLocalStorage(false)
        setError(null)
      } catch (dbError) {
        console.log("Database not available, falling back to localStorage")

        // Fallback to localStorage
        const savedServices = localStorage.getItem("subscriptions")
        const savedShows = localStorage.getItem("watchingShows")
        const savedCategories = localStorage.getItem("categories")

        if (savedCategories) {
          setCategories(JSON.parse(savedCategories))
        } else {
          setCategories(defaultCategories)
          localStorage.setItem("categories", JSON.stringify(defaultCategories))
        }

        if (savedServices) {
          setServices(JSON.parse(savedServices))
        }

        if (savedShows) {
          setShows(JSON.parse(savedShows))
        }

        setSelectedCategories(defaultCategories.map((cat) => cat.id))
        setUsingLocalStorage(true)
        setError(null)
      }
    } catch (err) {
      console.error("Error loading data:", err)
      setError("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  // Save to localStorage when using fallback mode
  useEffect(() => {
    if (usingLocalStorage) {
      localStorage.setItem("subscriptions", JSON.stringify(services))
    }
  }, [services, usingLocalStorage])

  useEffect(() => {
    if (usingLocalStorage) {
      localStorage.setItem("watchingShows", JSON.stringify(shows))
    }
  }, [shows, usingLocalStorage])

  useEffect(() => {
    if (usingLocalStorage) {
      localStorage.setItem("categories", JSON.stringify(categories))
    }
  }, [categories, usingLocalStorage])

  const totalMonthlyCost = calculateTotalCost(services)

  const addSubscription = async (service: Omit<Service, "id">) => {
    try {
      if (usingLocalStorage) {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const newService = { id, ...service }
        setServices([newService, ...services])
      } else {
        const newService = await createServiceAction(service)
        setServices([newService, ...services])
      }
      setIsAddSubscriptionOpen(false)
    } catch (err) {
      console.error("Error adding subscription:", err)
      setError("Failed to add subscription")
    }
  }

  const removeSubscription = async (id: string) => {
    try {
      if (usingLocalStorage) {
        setServices(services.filter((service) => service.id !== id))
        setShows(shows.filter((show) => show.serviceId !== id))
      } else {
        await deleteServiceAction(id)
        setServices(services.filter((service) => service.id !== id))
        setShows(shows.filter((show) => show.serviceId !== id))
      }
    } catch (err) {
      console.error("Error removing subscription:", err)
      setError("Failed to remove subscription")
    }
  }

  const addCategory = async (category: Omit<Category, "id">) => {
    try {
      if (usingLocalStorage) {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const newCategory = { id, ...category }
        setCategories([...categories, newCategory])
        setSelectedCategories([...selectedCategories, newCategory.id])
      } else {
        const newCategory = await createCategoryAction(category)
        setCategories([...categories, newCategory])
        setSelectedCategories([...selectedCategories, newCategory.id])
      }
      setIsAddCategoryOpen(false)
    } catch (err) {
      console.error("Error adding category:", err)
      setError("Failed to add category")
    }
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
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-6">
          <h1 className="text-2xl font-bold mb-1">Subscription Tracker</h1>
          <p className="text-muted-foreground">Loading your subscriptions...</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="h-20 bg-muted rounded-lg"></div>
          <div className="h-20 bg-muted rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-2xl font-bold mb-1">Subscription Tracker</h1>
        <p className="text-muted-foreground">Manage all your subscriptions</p>
      </div>

      {usingLocalStorage && (
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            Currently using local storage. Your data will be saved to the cloud when you deploy to Vercel.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button onClick={loadData} variant="outline" size="sm" className="mt-2">
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-br from-violet-500 to-purple-700 text-white border-none shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-white/80 mb-1">Monthly Subscription Cost</p>
            <div className="text-4xl font-bold">${totalMonthlyCost.toFixed(2)}</div>
            <p className="text-white/70 mt-1">
              {services.length} subscription{services.length !== 1 ? "s" : ""}
            </p>
          </div>
        </CardContent>
      </Card>

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
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-4">No subscriptions added yet</p>
            <div className="flex flex-col space-y-2 items-center">
              <Button onClick={() => setIsAddSubscriptionOpen(true)} className="bg-violet-600 hover:bg-violet-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Subscription
              </Button>
              <Button onClick={() => setIsAddCategoryOpen(true)} variant="outline" size="sm">
                <Plus className="mr-2 h-3 w-3" />
                Create Custom Category
              </Button>
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
