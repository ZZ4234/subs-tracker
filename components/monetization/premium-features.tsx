"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, TrendingUp, Bell, Download, Users, BarChart3 } from "lucide-react"

interface PremiumFeature {
  icon: React.ReactNode
  title: string
  description: string
  included: boolean
}

const freeFeatures: PremiumFeature[] = [
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Basic Subscription Tracking",
    description: "Track up to 10 subscriptions",
    included: true,
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Monthly Cost Overview",
    description: "See your total monthly spending",
    included: true,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Real-time Pricing",
    description: "Current pricing for popular services",
    included: true,
  },
]

const premiumFeatures: PremiumFeature[] = [
  {
    icon: <Bell className="h-5 w-5" />,
    title: "Price Change Alerts",
    description: "Get notified when subscription prices change",
    included: false,
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Export & Reports",
    description: "Download detailed spending reports (PDF/CSV)",
    included: false,
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Family Sharing Calculator",
    description: "Optimize costs for shared subscriptions",
    included: false,
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Advanced Analytics",
    description: "Spending trends, forecasts, and insights",
    included: false,
  },
  {
    icon: <Crown className="h-5 w-5" />,
    title: "Unlimited Subscriptions",
    description: "Track unlimited services and custom subscriptions",
    included: false,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Priority Support",
    description: "Get help within 24 hours",
    included: false,
  },
]

export default function PremiumFeatures() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Upgrade to SmartSubSaver Pro</h2>
        <p className="text-muted-foreground">Unlock advanced features to save even more money</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Free Plan
              <Badge variant="secondary">Current</Badge>
            </CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="text-3xl font-bold">
              $0<span className="text-lg font-normal">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {freeFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="relative border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-purple-600 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Most Popular
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Pro Plan
              <Badge variant="outline" className="border-purple-200">
                Save $50+/month
              </Badge>
            </CardTitle>
            <CardDescription>Advanced tools for serious savers</CardDescription>
            <div className="text-3xl font-bold">
              $4.99
              <span className="text-lg font-normal">/month</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Pays for itself by finding just one unnecessary subscription!
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Include all free features */}
            {freeFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}

            {/* Premium features */}
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-1 bg-purple-100 rounded-full">{feature.icon}</div>
                <div>
                  <div className="font-medium">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}

            <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700" size="lg">
              Upgrade to Pro - $4.99/month
            </Button>

            <div className="text-center text-xs text-muted-foreground">30-day money-back guarantee</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
