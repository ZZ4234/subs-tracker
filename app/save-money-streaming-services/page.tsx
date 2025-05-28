import type { Metadata } from "next"
import AppLayout from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, RotateCcw, Calculator, Target, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How to Save Money on Streaming Services - 7 Proven Strategies | SmartSubSaver",
  description:
    "Save $100+ monthly on Netflix, Disney+, Spotify with proven strategies. Cancel unused subscriptions, share family plans, rotate services. Free tracker included.",
  keywords: [
    "save money streaming services",
    "reduce streaming costs",
    "cancel unused subscriptions",
    "streaming service deals",
    "Netflix savings tips",
    "Disney Plus cost reduction",
    "Spotify family plan",
    "streaming budget optimization",
    "subscription rotation strategy",
    "family plan sharing",
    "streaming service comparison",
    "money saving streaming tips",
  ],
  openGraph: {
    title: "How to Save Money on Streaming Services - 7 Proven Strategies",
    description:
      "Save $100+ monthly on Netflix, Disney+, Spotify with proven strategies. Cancel unused subscriptions, share family plans, rotate services.",
    url: "/save-money-streaming-services",
  },
  alternates: {
    canonical: "/save-money-streaming-services",
  },
}

export default function SaveMoneyStreamingPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container max-w-md mx-auto p-4 space-y-6">
          {/* Hero Section */}
          <div className="text-center py-6">
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">💰 Money Saving Guide</Badge>
            <h1 className="text-3xl font-bold mb-4 text-white">Save $100+ Monthly on Streaming Services</h1>
            <p className="text-purple-200 mb-6">
              7 proven strategies to reduce your Netflix, Disney+, Spotify costs without missing your favorite content
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-300 font-semibold">
                Average savings: $127/month • Takes 15 minutes to implement
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-400">$127</div>
                <div className="text-xs text-slate-400">Average monthly savings</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-blue-400">3-5</div>
                <div className="text-xs text-slate-400">Unused subscriptions per person</div>
              </CardContent>
            </Card>
          </div>

          {/* Strategy 1: Cancel Unused Subscriptions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Target className="h-5 w-5 mr-2 text-red-400" />
                1. Cancel Unused Subscriptions
              </CardTitle>
              <CardDescription className="text-slate-400">
                The #1 money-saving strategy - eliminate what you don't use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-300 font-medium">Potential savings: $50-80/month</p>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Review bank statements for forgotten subscriptions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Use our free tracker to identify unused services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Cancel services you haven't used in 30+ days</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Strategy 2: Family Plan Sharing */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="h-5 w-5 mr-2 text-blue-400" />
                2. Share Family Plans
              </CardTitle>
              <CardDescription className="text-slate-400">Split costs with family and friends legally</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-300 font-medium">Potential savings: $30-50/month</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-slate-300">Netflix Standard</span>
                  <span className="text-green-400">$7.75/person (2 screens)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-slate-300">Spotify Family</span>
                  <span className="text-green-400">$2.83/person (6 accounts)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-slate-300">Disney+ Bundle</span>
                  <span className="text-green-400">$10/person (2 people)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy 3: Subscription Rotation */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <RotateCcw className="h-5 w-5 mr-2 text-purple-400" />
                3. Rotate Subscriptions
              </CardTitle>
              <CardDescription className="text-slate-400">Subscribe only when you need them</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                <p className="text-purple-300 font-medium">Potential savings: $40-60/month</p>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Subscribe for 1-2 months when new seasons release</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Binge your content then cancel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Set calendar reminders for cancellation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Strategy 4: Use Ad-Supported Tiers */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                4. Choose Ad-Supported Plans
              </CardTitle>
              <CardDescription className="text-slate-400">Save 40-50% with minimal ads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-slate-300">Netflix Basic (ads)</span>
                  <span className="text-green-400">$6.99 vs $15.49</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-slate-300">Hulu (ads)</span>
                  <span className="text-green-400">$7.99 vs $14.99</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-slate-300">Disney+ Basic</span>
                  <span className="text-green-400">$7.99 vs $13.99</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Free Tracker CTA */}
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Calculator className="h-5 w-5 mr-2 text-green-400" />
                Start Saving Today - Free Tracker
              </CardTitle>
              <CardDescription className="text-purple-200">
                Use our free subscription tracker to implement these strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Track all subscriptions in one place</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Get personalized money-saving recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Calculate potential savings instantly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Monitor usage and optimize costs</span>
                </li>
              </ul>
              <Link href="/">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Start Saving Money Now - Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Additional Strategies */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">More Money-Saving Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">5. Student Discounts</h4>
                  <p className="text-sm text-slate-400">Get 50% off most services with .edu email</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">6. Bundle Deals</h4>
                  <p className="text-sm text-slate-400">Verizon, T-Mobile often include streaming services</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">7. Free Alternatives</h4>
                  <p className="text-sm text-slate-400">Tubi, Pluto TV, YouTube offer free content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Stories */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Success Stories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 text-sm">
                  "Saved $127/month by canceling 4 unused subscriptions I forgot about!" - Sarah J.
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  "Family plan sharing cut my streaming costs in half. Brilliant!" - Mike C.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
