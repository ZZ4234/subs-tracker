"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Search, ChevronDown, Wifi, Clock, Users, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Service, Category, PopularService } from "@/lib/types"
import { popularServices } from "@/lib/data"
import { getCategoryIcon } from "@/lib/data"

// Add these imports at the top
import { useLocation } from "@/hooks/use-location"
import { getRegionalPrice, getAvailableServices, formatCurrency, getLocalizedServiceName } from "@/lib/regional-data"
import { updateAllServicesPricing, supportsRealTimePricing } from "@/lib/pricing-api"

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

interface AddSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (service: Service) => void
  categories: Category[]
  onAddCategory: () => void
}

export default function AddSubscriptionDialog({
  open,
  onOpenChange,
  onAdd,
  categories,
  onAddCategory,
}: AddSubscriptionDialogProps) {
  const [name, setName] = useState("")
  const [monthlyCost, setMonthlyCost] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPopularServices, setShowPopularServices] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoadingPricing, setIsLoadingPricing] = useState(false)
  const [realTimePrices, setRealTimePrices] = useState<Record<string, any>>({})
  const [pricingProgress, setPricingProgress] = useState<string>("")

  // Inside the component, add location hook
  const { location } = useLocation()

  // Load real-time pricing when location changes
  useEffect(() => {
    if (location.countryCode && open) {
      loadRealTimePricing()
    }
  }, [location.countryCode, open])

  const loadRealTimePricing = async () => {
    setIsLoadingPricing(true)
    setPricingProgress("Detecting your location...")

    try {
      setPricingProgress(`Loading current pricing for ${location.country}...`)

      // Get pricing for all supported services
      const pricingResults = await updateAllServicesPricing(location.countryCode)

      setRealTimePrices(pricingResults)
      setPricingProgress(`Updated ${Object.keys(pricingResults).length} services`)

      // Clear progress message after a delay
      setTimeout(() => setPricingProgress(""), 2000)

      console.log("Loaded real-time pricing for", location.countryCode, pricingResults)
    } catch (error) {
      console.error("Failed to load real-time pricing:", error)
      setPricingProgress("Using cached pricing")
      setTimeout(() => setPricingProgress(""), 2000)
    } finally {
      setIsLoadingPricing(false)
    }
  }

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setName("")
      setMonthlyCost("")
      setDescription("")
      setCategoryId(categories[0]?.id || "")
      setError(null)
      setSearchQuery("")
      setShowPopularServices(false)
    }
  }, [open, categories])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name.trim()) {
      setError("Subscription name is required")
      return
    }

    const cost = Number.parseFloat(monthlyCost)
    if (isNaN(cost) || cost <= 0) {
      setError("Please enter a valid monthly cost")
      return
    }

    if (!categoryId) {
      setError("Please select a category")
      return
    }

    // Create new subscription
    const newSubscription: Service = {
      id: generateId(),
      name: name.trim(),
      monthlyCost: cost,
      categoryId,
      description: description.trim() || undefined,
    }

    onAdd(newSubscription)

    // Reset form
    setName("")
    setMonthlyCost("")
    setDescription("")
    setCategoryId("")
    setError(null)
  }

  const selectPopularService = (service: PopularService) => {
    console.log("Selecting service:", service.name) // Debug log

    // Check if we have real-time pricing for this service
    const realTimePricing = realTimePrices[service.name]
    const useRealTime = realTimePricing && supportsRealTimePricing(service.name)

    // Create new subscription directly from popular service
    const newSubscription: Service = {
      id: generateId(),
      name: service.name,
      monthlyCost: useRealTime ? realTimePricing.price : service.monthlyCost,
      categoryId: service.categoryId,
      description: service.description || undefined,
      logoUrl: service.logoUrl,
      realTimePricing: useRealTime,
      pricingSource: useRealTime ? realTimePricing.source : "manual",
      pricingConfidence: useRealTime ? realTimePricing.confidence : "medium",
      lastPriceUpdate: useRealTime ? realTimePricing.lastUpdated : new Date().toISOString(),
    }

    // Add the subscription directly
    onAdd(newSubscription)

    // Close the popular services view
    setShowPopularServices(false)

    // Reset form state
    setName("")
    setMonthlyCost("")
    setDescription("")
    setCategoryId("")
    setError(null)
    setSearchQuery("")
  }

  const togglePopularServices = () => {
    console.log("Toggling popular services:", !showPopularServices) // Debug log
    setShowPopularServices(!showPopularServices)
  }

  // Update the filteredServices logic
  const filteredServices = getAvailableServices(popularServices, location.countryCode)
    .filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !categoryId || service.categoryId === categoryId
      return matchesSearch && matchesCategory
    })
    .map((service) => {
      // Use real-time pricing if available
      const realTimePrice = realTimePrices[service.name]
      if (realTimePrice && service.useRealTimePricing) {
        return {
          ...service,
          monthlyCost: realTimePrice.price,
          realTimePricing: realTimePrice,
        }
      }
      return service
    })

  const getPricingSourceIcon = (source: string) => {
    switch (source) {
      case "api":
        return <Wifi className="h-3 w-3" />
      case "scraping":
        return <Search className="h-3 w-3" />
      case "community":
        return <Users className="h-3 w-3" />
      default:
        return <Database className="h-3 w-3" />
    }
  }

  const getPricingSourceColor = (source: string, confidence: string) => {
    if (source === "api" && confidence === "high")
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    if (source === "scraping" && confidence === "high")
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    if (source === "community") return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>Enter the details of your subscription</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Popular Services Section */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Quick Add Popular Services</Label>
              <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={togglePopularServices}>
                <Search className="mr-1 h-3 w-3" />
                Find Popular
                <ChevronDown
                  className={`ml-1 h-3 w-3 transition-transform ${showPopularServices ? "rotate-180" : ""}`}
                />
              </Button>
            </div>

            {showPopularServices && (
              <Card className="mt-2">
                <CardContent className="p-3">
                  {(isLoadingPricing || pricingProgress) && (
                    <div className="text-center py-2 mb-3">
                      <div className="text-sm text-muted-foreground">
                        {isLoadingPricing && <Clock className="h-4 w-4 inline mr-1 animate-spin" />}🌍{" "}
                        {pricingProgress || `Loading current pricing for ${location.country}...`}
                      </div>
                    </div>
                  )}
                  <Input
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-3"
                  />
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {filteredServices.slice(0, 10).map((service) => {
                      const realTimePricing = (service as any).realTimePricing
                      const hasRealTimePricing = realTimePricing && supportsRealTimePricing(service.name)

                      const regionalPrice = getRegionalPrice(
                        service.name,
                        service.monthlyCost,
                        location.countryCode,
                        location.currency,
                      )
                      const localizedName = getLocalizedServiceName(service.name, location.countryCode)
                      const formattedPrice = formatCurrency(regionalPrice, location.currency, location.currencySymbol)

                      return (
                        <div
                          key={service.name}
                          onClick={() =>
                            selectPopularService({
                              ...service,
                              name: localizedName,
                              monthlyCost: regionalPrice,
                            })
                          }
                          className="flex justify-between items-center p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                        >
                          <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{localizedName}</span>
                              {hasRealTimePricing && (
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${getPricingSourceColor(realTimePricing.source, realTimePricing.confidence)}`}
                                >
                                  {getPricingSourceIcon(realTimePricing.source)}
                                  <span className="ml-1">
                                    {realTimePricing.source === "api"
                                      ? "Live"
                                      : realTimePricing.source === "scraping"
                                        ? "Fresh"
                                        : realTimePricing.source === "community"
                                          ? "Community"
                                          : "Cached"}
                                  </span>
                                </Badge>
                              )}
                            </div>
                            {service.description && (
                              <span className="text-xs text-muted-foreground">{service.description}</span>
                            )}
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-green-600">{formattedPrice}/mo</span>
                            {hasRealTimePricing && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(realTimePricing.lastUpdated).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    {filteredServices.length === 0 && (
                      <div className="text-center text-sm text-muted-foreground py-4">No services found</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Manual Entry Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Subscription Name</Label>
                <Input
                  id="name"
                  placeholder="Netflix, Spotify, etc."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <div className="flex gap-2">
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        const CategoryIcon = getCategoryIcon(category.icon)
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center">
                              <CategoryIcon className="h-4 w-4 mr-2" />
                              {category.name}
                              {category.isCustom && (
                                <span className="ml-1 text-xs text-muted-foreground">(Custom)</span>
                              )}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="icon" onClick={onAddCategory}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cost">Monthly Cost ({location.currencySymbol})</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="9.99"
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Premium Plan, Family Subscription, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Subscription</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
