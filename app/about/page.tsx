import type { Metadata } from "next"
import AppLayout from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, BarChart3, TrendingUp, Shield, Globe, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About - Subscription Tracker",
  description:
    "Learn how Subscription Tracker helps you manage monthly expenses, track streaming services, and save money on subscriptions. Free, secure, and easy to use.",
  openGraph: {
    title: "About Subscription Tracker - Manage Your Monthly Expenses",
    description:
      "Learn how Subscription Tracker helps you manage monthly expenses, track streaming services, and save money on subscriptions. Free, secure, and easy to use.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container max-w-md mx-auto p-4 space-y-6">
          <div className="text-center py-6">
            <h1 className="text-2xl font-bold mb-2 text-white">About Subscription Tracker</h1>
            <p className="text-purple-200">
              Take control of your monthly subscriptions and streaming services. Track spending, discover unused
              services, and save money with smart recommendations.
            </p>
          </div>

          <div className="grid gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                  Save Money on Subscriptions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  The average person has 3-5 unused subscriptions costing $127 per month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">
                  Our smart recommendations help you identify unused services, find sharing opportunities, and optimize
                  your subscription portfolio. Users typically save 20-40% on their monthly expenses.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                  Track All Your Services
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Netflix, Disney+, Spotify, gym memberships, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">
                  Keep track of all your subscriptions in one place. Monitor what you're watching, calculate cost per
                  show, and get insights into your spending patterns across different categories.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
                  Smart Recommendations
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Get personalized advice to optimize your subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">
                  Our algorithm analyzes your usage patterns and suggests which services to cancel, share, or rotate.
                  Get recommendations for downgrading plans or finding better deals.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="text-center">
                  <Shield className="h-8 w-8 mx-auto text-green-400 mb-2" />
                  <CardTitle className="text-base text-white">Secure & Private</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-300">
                    Your data stays on your device. No account required, no personal information collected.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="text-center">
                  <Globe className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                  <CardTitle className="text-base text-white">Global Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-300">
                    Supports multiple currencies and regional pricing for accurate tracking worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="text-center">
                  <Zap className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                  <CardTitle className="text-base text-white">Real-time Pricing</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-300">
                    Get current pricing for popular services based on your location and currency.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Add Your Subscriptions</h4>
                    <p className="text-sm text-slate-400">
                      Track Netflix, Spotify, gym memberships, and any recurring service. Use our quick-add feature for
                      popular services.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Monitor Your Usage</h4>
                    <p className="text-sm text-slate-400">
                      Add shows you're watching to see which services you actually use and calculate cost per show.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Get Smart Recommendations</h4>
                    <p className="text-sm text-slate-400">
                      Discover ways to save money, find unused subscriptions, and optimize your monthly budget.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1 text-white">Is Subscription Tracker free to use?</h4>
                  <p className="text-sm text-slate-400">
                    Yes, Subscription Tracker is completely free. We may show relevant ads and affiliate recommendations
                    to support the service.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">Do I need to create an account?</h4>
                  <p className="text-sm text-slate-400">
                    No account required. Your data is stored locally on your device for privacy and security.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">How accurate is the pricing information?</h4>
                  <p className="text-sm text-slate-400">
                    We use real-time pricing APIs and regularly updated databases to provide accurate pricing for your
                    region. You can always manually adjust prices if needed.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-white">Can I export my data?</h4>
                  <p className="text-sm text-slate-400">
                    Yes, you can export your subscription data at any time. Your data belongs to you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
