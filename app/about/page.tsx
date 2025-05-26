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
      <div className="space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold mb-2">About Subscription Tracker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take control of your monthly subscriptions and streaming services. Track spending, discover unused services,
            and save money with smart recommendations.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Save Money on Subscriptions
              </CardTitle>
              <CardDescription>The average person has 3-5 unused subscriptions costing $127 per month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our smart recommendations help you identify unused services, find sharing opportunities, and optimize
                your subscription portfolio. Users typically save 20-40% on their monthly expenses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Track All Your Services
              </CardTitle>
              <CardDescription>Netflix, Disney+, Spotify, gym memberships, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Keep track of all your subscriptions in one place. Monitor what you're watching, calculate cost per
                show, and get insights into your spending patterns across different categories.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Smart Recommendations
              </CardTitle>
              <CardDescription>Get personalized advice to optimize your subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our algorithm analyzes your usage patterns and suggests which services to cancel, share, or rotate. Get
                recommendations for downgrading plans or finding better deals.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Your data stays on your device. No account required, no personal information collected.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Globe className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Global Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Supports multiple currencies and regional pricing for accurate tracking worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Zap className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <CardTitle className="text-lg">Real-time Pricing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Get current pricing for popular services based on your location and currency.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Add Your Subscriptions</h4>
                  <p className="text-sm text-muted-foreground">
                    Track Netflix, Spotify, gym memberships, and any recurring service. Use our quick-add feature for
                    popular services.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Monitor Your Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    Add shows you're watching to see which services you actually use and calculate cost per show.
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
                    Discover ways to save money, find unused subscriptions, and optimize your monthly budget.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Is Subscription Tracker free to use?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, Subscription Tracker is completely free. We may show relevant ads and affiliate recommendations
                  to support the service.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Do I need to create an account?</h4>
                <p className="text-sm text-muted-foreground">
                  No account required. Your data is stored locally on your device for privacy and security.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">How accurate is the pricing information?</h4>
                <p className="text-sm text-muted-foreground">
                  We use real-time pricing APIs and regularly updated databases to provide accurate pricing for your
                  region. You can always manually adjust prices if needed.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Can I export my data?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can export your subscription data at any time. Your data belongs to you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
