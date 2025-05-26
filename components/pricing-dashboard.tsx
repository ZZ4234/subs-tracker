"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, Search, Users, Database, RefreshCw, TrendingUp, AlertTriangle, Info } from "lucide-react"
import type { Service } from "@/lib/types"
import { updateAllServicesPricing, getSupportedServices } from "@/lib/pricing-api"
import { useLocation } from "@/hooks/use-location"

interface PricingDashboardProps {
  services: Service[]
  onServicesUpdate: (services: Service[]) => void
}

export default function PricingDashboard({ services, onServicesUpdate }: PricingDashboardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const { location } = useLocation()

  const supportedServices = getSupportedServices()
  const userSupportedServices = services.filter((service) => supportedServices.includes(service.name))

  const getPricingSourceIcon = (source?: string) => {
    switch (source) {
      case "api":
        return <Wifi className="h-4 w-4 text-green-600" />
      case "scraping":
        return <Search className="h-4 w-4 text-blue-600" />
      case "community":
        return <Users className="h-4 w-4 text-purple-600" />
      default:
        return <Database className="h-4 w-4 text-gray-600" />
    }
  }

  const getPricingSourceLabel = (source?: string) => {
    switch (source) {
      case "api":
        return "Live API"
      case "scraping":
        return "Exchange Rate + Regional"
      case "community":
        return "Community Reports"
      default:
        return "Manual Curation"
    }
  }

  const getConfidenceColor = (confidence?: string) => {
    switch (confidence) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTimeSinceUpdate = (lastUpdated?: string) => {
    if (!lastUpdated) return "Never"

    const now = new Date()
    const updated = new Date(lastUpdated)
    const diffMs = now.getTime() - updated.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays}d ago`
    } else if (diffHours > 0) {
      return `${diffHours}h ago`
    } else {
      return "Just now"
    }
  }

  const updateAllPricing = async () => {
    setIsUpdating(true)
    setUpdateProgress(0)

    try {
      console.log(`🔄 Updating pricing for ${userSupportedServices.length} services...`)

      const pricingResults = await updateAllServicesPricing(location.countryCode)

      // Update services with new pricing
      const updatedServices = services.map((service) => {
        const newPricing = pricingResults[service.name]
        if (newPricing) {
          return {
            ...service,
            monthlyCost: newPricing.price,
            realTimePricing: true,
            pricingSource: newPricing.source,
            pricingConfidence: newPricing.confidence,
            lastPriceUpdate: newPricing.lastUpdated,
          }
        }
        return service
      })

      onServicesUpdate(updatedServices)
      setLastUpdate(new Date().toISOString())
      setUpdateProgress(100)

      console.log(`✅ Updated ${Object.keys(pricingResults).length} services`)
    } catch (error) {
      console.error("Failed to update pricing:", error)
    } finally {
      setIsUpdating(false)
      setTimeout(() => setUpdateProgress(0), 2000)
    }
  }

  const sourceCounts = services.reduce(
    (acc, service) => {
      const source = service.pricingSource || "manual"
      acc[source] = (acc[source] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const confidenceCounts = services.reduce(
    (acc, service) => {
      const confidence = service.pricingConfidence || "medium"
      acc[confidence] = (acc[confidence] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const outdatedServices = services.filter((service) => {
    if (!service.lastPriceUpdate) return true
    const daysSinceUpdate = (Date.now() - new Date(service.lastPriceUpdate).getTime()) / (1000 * 60 * 60 * 24)
    return daysSinceUpdate > 7
  })

  return (
    <div className="space-y-4">
      {/* Environment Variables Info */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Demo Mode:</strong> This app works without API keys! It uses exchange rates + regional pricing for
          accurate estimates. To enable live API pricing, add <code>RAPIDAPI_KEY</code> to your environment variables.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Pricing Intelligence
              </CardTitle>
              <CardDescription>Real-time pricing data for your subscriptions</CardDescription>
            </div>
            <Button onClick={updateAllPricing} disabled={isUpdating || userSupportedServices.length === 0} size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isUpdating ? "animate-spin" : ""}`} />
              Update Pricing
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isUpdating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Updating pricing data...</span>
                <span>{updateProgress}%</span>
              </div>
              <Progress value={updateProgress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{sourceCounts.api || 0}</div>
              <div className="text-sm text-muted-foreground">Live API</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{sourceCounts.scraping || 0}</div>
              <div className="text-sm text-muted-foreground">Exchange Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{sourceCounts.community || 0}</div>
              <div className="text-sm text-muted-foreground">Community</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{sourceCounts.manual || 0}</div>
              <div className="text-sm text-muted-foreground">Manual</div>
            </div>
          </div>

          {lastUpdate && (
            <div className="text-center text-sm text-muted-foreground">
              Last updated: {getTimeSinceUpdate(lastUpdate)}
            </div>
          )}
        </CardContent>
      </Card>

      {outdatedServices.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Outdated Pricing
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300">
              {outdatedServices.length} service{outdatedServices.length !== 1 ? "s" : ""} may have outdated pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {outdatedServices.slice(0, 3).map((service) => (
                <div key={service.id} className="flex justify-between items-center">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-sm text-muted-foreground">{getTimeSinceUpdate(service.lastPriceUpdate)}</span>
                </div>
              ))}
              {outdatedServices.length > 3 && (
                <div className="text-sm text-muted-foreground">+{outdatedServices.length - 3} more services</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>Pricing sources and confidence levels for your subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-3">
                  {getPricingSourceIcon(service.pricingSource)}
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {getPricingSourceLabel(service.pricingSource)} • {getTimeSinceUpdate(service.lastPriceUpdate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getConfidenceColor(service.pricingConfidence)}>
                    {service.pricingConfidence || "medium"}
                  </Badge>
                  <span className="font-medium">${service.monthlyCost.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Pricing Works</CardTitle>
          <CardDescription>Understanding our pricing sources and accuracy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start space-x-3">
              <Wifi className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Live API (Highest Accuracy)</h4>
                <p className="text-sm text-muted-foreground">
                  Direct from service APIs when available. Requires API keys to be configured.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Search className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Exchange Rate + Regional (Good Accuracy)</h4>
                <p className="text-sm text-muted-foreground">
                  Uses current exchange rates and regional pricing adjustments for accurate estimates.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Community Reports (Variable Accuracy)</h4>
                <p className="text-sm text-muted-foreground">
                  User-submitted pricing data with verification and consensus algorithms.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Database className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Manual Curation (Baseline Accuracy)</h4>
                <p className="text-sm text-muted-foreground">
                  Manually researched and updated pricing data as a reliable fallback.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported Services</CardTitle>
          <CardDescription>Services that support enhanced pricing updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {supportedServices.map((serviceName) => {
              const userHasService = services.some((s) => s.name === serviceName)
              return (
                <div
                  key={serviceName}
                  className={`p-2 rounded text-sm text-center ${
                    userHasService
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {serviceName}
                  {userHasService && " ✓"}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
