"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Users, RotateCcw, DollarSign } from "lucide-react"
import type { Service, Show } from "@/lib/types"
import { getRecommendationsToRemove } from "@/lib/utils"
import { trackPageView, trackRecommendationViewed } from "@/lib/analytics"

export default function RecommendationsScreen() {
  const [services, setServices] = useState<Service[]>([])
  const [shows, setShows] = useState<Show[]>([])

  useEffect(() => {
    // Track page view
    trackPageView("recommendations_screen")

    // Load data from localStorage
    const savedServices = localStorage.getItem("subscriptions")
    const savedShows = localStorage.getItem("watchingShows")

    if (savedServices) {
      setServices(JSON.parse(savedServices))
    }

    if (savedShows) {
      setShows(JSON.parse(savedShows))
    }
  }, [])

  const recommendations = getRecommendationsToRemove(services, shows)
  const totalPotentialSavings = recommendations.reduce((sum, service) => sum + service.monthlyCost, 0)

  const handleRecommendationView = (type: string, serviceName: string) => {
    trackRecommendationViewed(type, serviceName)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-2xl font-bold mb-1">Smart Recommendations</h1>
        <p className="text-muted-foreground">Optimize your subscriptions and save money</p>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Subscriptions Yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your subscriptions to get personalized money-saving recommendations
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Potential Savings Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
                Potential Monthly Savings
              </CardTitle>
              <CardDescription>Money you could save by optimizing your subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">${totalPotentialSavings.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mt-1">
                From {recommendations.length} unused service{recommendations.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          {/* Unused Services */}
          {recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RotateCcw className="h-5 w-5 mr-2 text-amber-600" />
                  Unused Services
                </CardTitle>
                <CardDescription>Services with no shows tracked - consider canceling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    onClick={() => handleRecommendationView("unused_service", service.name)}
                  >
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">No shows tracked</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">${service.monthlyCost.toFixed(2)}/mo</div>
                      <Badge variant="outline" className="text-xs">
                        Cancel to save
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* General Money-Saving Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Money-Saving Tips
              </CardTitle>
              <CardDescription>General strategies to reduce your subscription costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <h4 className="font-medium mb-1">Share Family Plans</h4>
                  <p className="text-sm text-muted-foreground">
                    Split costs with family or friends for services like Netflix, Spotify, and Disney+
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <h4 className="font-medium mb-1">Rotate Subscriptions</h4>
                  <p className="text-sm text-muted-foreground">
                    Subscribe only when you need them, cancel when you're done watching
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <h4 className="font-medium mb-1">Look for Student Discounts</h4>
                  <p className="text-sm text-muted-foreground">
                    Many services offer 50% off for students with valid .edu email
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <h4 className="font-medium mb-1">Bundle Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Look for bundles like Disney+ with Hulu and ESPN+ for better value
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {recommendations.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Badge className="mb-4 bg-green-100 text-green-800">All Good!</Badge>
                  <h3 className="text-lg font-semibold mb-2">Your Subscriptions Look Optimized</h3>
                  <p className="text-muted-foreground">
                    All your services have shows tracked. Keep monitoring to stay optimized!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
