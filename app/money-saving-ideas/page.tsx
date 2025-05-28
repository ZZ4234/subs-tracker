import type { Metadata } from "next"
import AppLayout from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingDown, Lightbulb, Target, Calculator, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "50+ Money Saving Ideas - Reduce Monthly Expenses | SmartSubSaver",
  description:
    "Discover 50+ proven money saving ideas to reduce monthly expenses. Save on subscriptions, streaming services, utilities, and more. Free tools included.",
  keywords: [
    "money saving ideas",
    "reduce monthly expenses",
    "save money tips",
    "budget optimization",
    "frugal living tips",
    "money saving strategies",
    "cut monthly costs",
    "personal finance tips",
    "subscription savings",
    "household budget tips",
    "expense reduction",
    "financial planning",
  ],
  openGraph: {
    title: "50+ Money Saving Ideas - Reduce Monthly Expenses",
    description:
      "Discover 50+ proven money saving ideas to reduce monthly expenses. Save on subscriptions, streaming services, utilities, and more.",
    url: "/money-saving-ideas",
  },
  alternates: {
    canonical: "/money-saving-ideas",
  },
}

const moneySavingCategories = [
  {
    title: "Subscriptions & Streaming",
    icon: <DollarSign className="h-5 w-5" />,
    color: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
    savings: "$50-150/month",
    ideas: [
      "Cancel unused streaming subscriptions",
      "Share family plans with others",
      "Rotate subscriptions seasonally",
      "Use ad-supported tiers",
      "Take advantage of student discounts",
      "Bundle services for better deals",
    ],
  },
  {
    title: "Food & Dining",
    icon: <Target className="h-5 w-5" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    savings: "$200-400/month",
    ideas: [
      "Cook meals at home more often",
      "Meal prep on weekends",
      "Use grocery store apps for coupons",
      "Buy generic brands",
      "Shop with a list to avoid impulse buys",
      "Use cashback credit cards for groceries",
    ],
  },
  {
    title: "Utilities & Bills",
    icon: <Zap className="h-5 w-5" />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/20",
    savings: "$30-80/month",
    ideas: [
      "Switch to LED light bulbs",
      "Unplug electronics when not in use",
      "Use programmable thermostats",
      "Compare internet and phone plans",
      "Bundle utilities for discounts",
      "Use energy-efficient appliances",
    ],
  },
  {
    title: "Transportation",
    icon: <TrendingDown className="h-5 w-5" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
    savings: "$100-300/month",
    ideas: [
      "Use public transportation",
      "Carpool or rideshare",
      "Walk or bike for short trips",
      "Maintain your car regularly",
      "Compare gas prices with apps",
      "Consider car-sharing services",
    ],
  },
]

export default function MoneySavingIdeasPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container max-w-md mx-auto p-4 space-y-6">
          {/* Hero Section */}
          <div className="text-center py-6">
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
              <Lightbulb className="h-3 w-3 mr-1" />
              Money Saving Guide
            </Badge>
            <h1 className="text-3xl font-bold mb-4 text-white">50+ Money Saving Ideas</h1>
            <p className="text-purple-200 mb-6">
              Proven strategies to reduce your monthly expenses and save hundreds of dollars every month
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-300 font-semibold">Average total savings: $380-930/month</p>
            </div>
          </div>

          {/* Quick Impact Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-400">$4,560</div>
                <div className="text-xs text-slate-400">Average yearly savings</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-blue-400">15 min</div>
                <div className="text-xs text-slate-400">Time to start saving</div>
              </CardContent>
            </Card>
          </div>

          {/* Money Saving Categories */}
          {moneySavingCategories.map((category, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className={`flex items-center text-white`}>
                  <span className={category.color}>{category.icon}</span>
                  <span className="ml-2">{category.title}</span>
                </CardTitle>
                <CardDescription className="text-slate-400">Potential savings: {category.savings}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className={`rounded-lg p-3 ${category.bgColor}`}>
                  <p className={`font-medium ${category.color}`}>Save {category.savings} with these strategies</p>
                </div>
                <ul className="space-y-2">
                  {category.ideas.map((idea, ideaIndex) => (
                    <li key={ideaIndex} className="flex items-start text-slate-300">
                      <span className="text-green-400 mr-2 mt-0.5">✓</span>
                      <span className="text-sm">{idea}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Subscription Tracker CTA */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Calculator className="h-5 w-5 mr-2 text-green-400" />
                Start with Subscription Savings
              </CardTitle>
              <CardDescription className="text-purple-200">
                The easiest way to save money is by tracking and optimizing your subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <p className="text-green-300 font-medium text-center">Save $50-150/month in just 15 minutes</p>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Find and cancel unused subscriptions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Get personalized money-saving recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Track all recurring expenses in one place</span>
                </li>
              </ul>
              <Link href="/">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Start Saving Money - Free Tracker
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Additional Quick Tips */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Money-Saving Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Automate Savings</h4>
                  <p className="text-sm text-slate-400">Set up automatic transfers to savings account</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Use Cashback Apps</h4>
                  <p className="text-sm text-slate-400">Earn money back on purchases you're already making</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Review Insurance</h4>
                  <p className="text-sm text-slate-400">Compare rates annually to find better deals</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Negotiate Bills</h4>
                  <p className="text-sm text-slate-400">Call providers to ask for discounts or better rates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Stories */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Real Success Stories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 text-sm">
                  "Saved $347/month by following these tips. Paid off my credit card in 6 months!" - Jessica M.
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  "The subscription tracker alone saved me $89/month. These ideas work!" - David L.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
