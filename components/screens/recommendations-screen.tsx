"use client"

import { useEffect, useState } from "react"
import { TrendingDown, AlertCircle, Share2, RotateCcw, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdManager from "@/components/ads/ad-manager"
import type { Service, Show, Category } from "@/lib/types"
import { calculateTotalCost } from "@/lib/utils"
import { defaultCategories } from "@/lib/data"
import Link from "next/link"
import { trackRecommendationViewed, trackPageView } from "@/lib/analytics"

export default function RecommendationsScreen() {
  const [services, setServices] = useState<Service[]>([])
  const [shows, setShows] = useState<Show[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    // Track page view
    trackPageView("recommendations_screen")

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

  // Calculate service usage metrics
  const serviceMetrics = services.map((service) => {
    const serviceShows = shows.filter((show) => show.serviceId === service.id)
    const showCount = serviceShows.length
    const costPerShow = showCount > 0 ? service.monthlyCost / showCount : service.monthlyCost
    const usageScore = showCount > 0 ? showCount : 0
    const category = categories.find((c) => c.id === service.categoryId) || categories[categories.length - 1]

    return {
      ...service,
      showCount,
      costPerShow,
      usageScore,
      isUnused: service.categoryId === "streaming" && showCount === 0,
      isLowUsage: service.categoryId === "streaming" && showCount <= 2 && showCount > 0,
      category,
    }
  })

  // Filter by active category
  const filteredMetrics = serviceMetrics.filter((service) => {
    if (activeCategory === "all") return true
    return service.categoryId === activeCategory
  })

  // Sort by usage (least used first) and then by cost (highest first)
  const sortedServices = [...filteredMetrics].sort((a, b) => {
    // First sort by whether they're unused
    if (a.isUnused && !b.isUnused) return -1
    if (!a.isUnused && b.isUnused) return 1

    // For streaming services, sort by show count
    if (a.categoryId === "streaming" && b.categoryId === "streaming") {
      if (a.showCount !== b.showCount) return a.showCount - b.showCount
    }

    // Then by cost (descending)
    return b.monthlyCost - a.monthlyCost
  })

  // Get recommendations (services with low usage)
  const recommendations = sortedServices
    .filter((service) => {
      if (service.categoryId === "streaming") {
        return service.isUnused || (service.isLowUsage && service.costPerShow > 5)
      }
      // For non-streaming services, just include the most expensive ones
      return service.monthlyCost > 15
    })
    .slice(0, 5) // Limit to top 5 recommendations

  // Track recommendation views
  useEffect(() => {
    if (recommendations.length > 0) {
      recommendations.forEach((service) => {
        const recType = getRecommendationType(service)
        trackRecommendationViewed(recType, service.name)
      })
    }
  }, [recommendations])

  const potentialSavings = recommendations.reduce((total, service) => total + service.monthlyCost, 0)
  const totalCost = calculateTotalCost(services)
  const percentageSavings = totalCost > 0 ? (potentialSavings / totalCost) * 100 : 0

  // Find the max usage score for relative comparison
  const maxUsageScore = Math.max(
    ...serviceMetrics.filter((s) => s.categoryId === "streaming").map((s) => s.showCount),
    1,
  )

  // Get recommendation type based on service metrics
  const getRecommendationType = (service: (typeof serviceMetrics)[0]) => {
    if (service.categoryId !== "streaming") {
      return service.monthlyCost > 20 ? "share" : "monitor"
    }

    if (service.isUnused) return "cancel"
    if (service.costPerShow > 10) return "share"
    if (service.showCount <= 2) return "downgrade"
    return "rotate"
  }

  // Get recommendation icon and text
  const getRecommendationDetails = (type: string, service: (typeof serviceMetrics)[0]) => {
    switch (type) {
      case "cancel":
        return {
          icon: AlertCircle,
          title: "Consider Canceling",
          description: "You're not watching any shows on this service",
        }
      case "share":
        return {
          icon: Share2,
          title: "Consider Sharing",
          description:
            service.categoryId === "streaming"
              ? "High cost per show - share subscription to reduce costs"
              : "High monthly cost - consider sharing with family/friends",
        }
      case "downgrade":
        return {
          icon: DollarSign,
          title: "Consider Downgrading",
          description: "You're watching very few shows on this service",
        }
      case "rotate":
        return {
          icon: RotateCcw,
          title: "Consider Rotating",
          description: "Subscribe only when watching shows, then cancel",
        }
      default:
        return {
          icon: Calendar,
          title: "Monitor Usage",
          description: "Keep an eye on your usage of this subscription",
        }
    }
  }

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-2xl font-bold mb-1">Optimize Spending</h1>
        <p className="text-muted-foreground">Get recommendations to save money</p>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">Add subscriptions to get recommendations</p>
          <Link href="/">
            <Button className="bg-violet-600 hover:bg-violet-700">Add Subscriptions</Button>
          </Link>
        </div>
      ) : (
        <>
          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-white/80 mb-1">Potential Monthly Savings</p>
                <div className="text-4xl font-bold">${potentialSavings.toFixed(2)}</div>
                <p className="text-white/70 mt-1">{percentageSavings.toFixed(0)}% of your current spending</p>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="w-full overflow-x-auto flex-nowrap justify-start h-auto p-1 bg-muted/50">
              <TabsTrigger value="all" className="px-3 py-1.5 h-auto">
                All
              </TabsTrigger>
              {categories
                .filter((category) => usedCategoryIds.includes(category.id))
                .map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="px-3 py-1.5 h-auto whitespace-nowrap">
                    {category.name}
                    {costByCategory[category.id] > 0 && (
                      <span className="ml-1 text-xs opacity-70">${costByCategory[category.id].toFixed(0)}</span>
                    )}
                  </TabsTrigger>
                ))}
            </TabsList>
          </Tabs>

          {recommendations.length === 0 ? (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700 dark:text-green-400">
                  <TrendingDown className="mr-2 h-5 w-5" />
                  Great job!
                </CardTitle>
                <CardDescription className="text-green-600 dark:text-green-500">
                  You're getting good value from your subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Based on your usage patterns, you're getting value from all your subscriptions. Keep enjoying your
                  content!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recommendations</h2>
              <p className="text-muted-foreground">Here's how you could optimize your subscription budget:</p>

              <div className="grid gap-4">
                {recommendations.map((service) => {
                  const recType = getRecommendationType(service)
                  const { icon: RecommendationIcon, title, description } = getRecommendationDetails(recType, service)

                  return (
                    <Card key={service.id} className="overflow-hidden">
                      <div className={`h-1 ${service.isUnused ? "bg-red-500" : "bg-amber-500"}`}></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{service.name}</CardTitle>
                          <span className="text-lg font-bold text-destructive">
                            ${service.monthlyCost.toFixed(2)}/mo
                          </span>
                        </div>
                        <CardDescription className="flex items-center text-sm">
                          <RecommendationIcon className="h-4 w-4 mr-1 inline" />
                          {title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          {service.categoryId === "streaming" && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span>Usage</span>
                                <span>
                                  {service.showCount} show{service.showCount !== 1 ? "s" : ""}
                                </span>
                              </div>
                              <Progress value={(service.showCount / maxUsageScore) * 100} className="h-2" />
                              {service.showCount > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Cost per show</span>
                                  <span className="font-medium">${service.costPerShow.toFixed(2)}/show</span>
                                </div>
                              )}
                            </>
                          )}
                          <div className="flex justify-between text-sm">
                            <span>Category</span>
                            <span className="font-medium">{service.category.name}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pb-4 text-sm text-muted-foreground">{description}</CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          <div className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold">Subscription Overview</h2>
            <div className="grid gap-3">
              {sortedServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <CardHeader className="p-4 flex flex-row items-center">
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{service.name}</h3>
                        <span className="font-medium text-violet-600 dark:text-violet-400">
                          ${service.monthlyCost.toFixed(2)}/mo
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {service.category.name}
                        </span>
                        {service.categoryId === "streaming" && service.showCount > 0 && (
                          <span className="text-sm text-muted-foreground">${service.costPerShow.toFixed(2)}/show</span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {service.categoryId === "streaming" && (
                    <div className="px-4 pb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Usage</span>
                        <span>
                          {service.showCount} show{service.showCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <Progress value={(service.showCount / maxUsageScore) * 100} className="h-1.5" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Moved all ads to bottom */}
      <div className="space-y-4 pt-8 border-t border-border">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Money-Saving Tools</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Recommended tools to help you save even more on subscriptions
          </p>
        </div>

        <AdManager placement="recommendations" />
      </div>
    </div>
  )
}
