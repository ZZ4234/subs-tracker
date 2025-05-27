import type { Metadata } from "next"
import AppLayout from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How to Save $100+ Per Month on Streaming Services",
  description:
    "Discover proven strategies to reduce your streaming costs without missing your favorite shows. Learn about rotation, sharing, and optimization techniques.",
  openGraph: {
    title: "How to Save $100+ Per Month on Streaming Services",
    description:
      "Discover proven strategies to reduce your streaming costs without missing your favorite shows. Learn about rotation, sharing, and optimization techniques.",
    url: "/blog/save-money-streaming-services",
  },
  alternates: {
    canonical: "/blog/save-money-streaming-services",
  },
}

export default function BlogPostPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container max-w-md mx-auto p-4 space-y-6">
          <div className="text-center py-6">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Streaming
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Money Saving
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Netflix
              </Badge>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">How to Save $100+ Per Month on Streaming Services</h1>
            <p className="text-slate-400">Published on January 15, 2024 • 5 min read</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <p className="text-slate-300 leading-relaxed">
                  The average household now spends over $200 per month on streaming services. With Netflix, Disney+, HBO
                  Max, Hulu, Amazon Prime, Apple TV+, and countless others, it's easy to see how costs add up quickly.
                  But with the right strategies, you can cut your streaming budget by $100 or more without missing your
                  favorite content.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">1. The Rotation Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">
                  Instead of maintaining year-round subscriptions to every service, rotate between them based on what
                  you're actively watching:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>
                    <strong className="text-white">Subscribe for 1-2 months</strong> when new seasons of your favorite
                    shows release
                  </li>
                  <li>
                    <strong className="text-white">Binge your content</strong> then cancel until the next season
                  </li>
                  <li>
                    <strong className="text-white">Use free trials</strong> strategically for new services
                  </li>
                  <li>
                    <strong className="text-white">Set calendar reminders</strong> to cancel before renewal dates
                  </li>
                </ul>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-green-300 font-medium">Potential savings: $50-80/month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">2. Family Plan Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">
                  Most streaming services offer family plans that cost only slightly more than individual subscriptions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>
                    <strong className="text-white">Netflix Standard:</strong> $15.49 vs $6.99 Basic (supports 2 screens)
                  </li>
                  <li>
                    <strong className="text-white">Disney+ Bundle:</strong> $19.99 for Disney+, Hulu, and ESPN+
                  </li>
                  <li>
                    <strong className="text-white">Spotify Family:</strong> $16.99 for 6 accounts vs $10.99 individual
                  </li>
                  <li>
                    <strong className="text-white">YouTube Premium Family:</strong> $22.99 for 6 accounts vs $11.99
                    individual
                  </li>
                </ul>
                <p className="text-slate-300">
                  Share costs with family members or trusted friends to reduce your portion significantly.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-green-300 font-medium">Potential savings: $30-50/month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">3. Bundle Deals and Promotions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">Take advantage of legitimate bundle offers:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>
                    <strong className="text-white">Verizon Unlimited:</strong> Often includes Disney+ and Apple Music
                  </li>
                  <li>
                    <strong className="text-white">T-Mobile Magenta:</strong> Includes Netflix and Apple TV+
                  </li>
                  <li>
                    <strong className="text-white">Amazon Prime:</strong> Includes Prime Video, Music, and shipping
                  </li>
                  <li>
                    <strong className="text-white">Student discounts:</strong> 50% off most major services
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">4. Free and Ad-Supported Alternatives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">Consider free or cheaper ad-supported versions:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>
                    <strong className="text-white">Tubi, Pluto TV, Crackle:</strong> Completely free with ads
                  </li>
                  <li>
                    <strong className="text-white">Hulu (with ads):</strong> $7.99 vs $14.99 ad-free
                  </li>
                  <li>
                    <strong className="text-white">Peacock Premium:</strong> $5.99 with ads vs $11.99 ad-free
                  </li>
                  <li>
                    <strong className="text-white">YouTube:</strong> Free with ads vs $11.99 Premium
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Action Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ol className="list-decimal pl-6 space-y-2 text-slate-300">
                  <li>List all your current subscriptions and their costs</li>
                  <li>Track what you actually watch for 30 days</li>
                  <li>Cancel services you haven't used in the past month</li>
                  <li>Switch to family plans and share costs where possible</li>
                  <li>Set up a rotation schedule for seasonal content</li>
                  <li>Use our Subscription Tracker to monitor ongoing usage</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-purple-600/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Ready to Start Saving?</CardTitle>
                <CardDescription className="text-purple-200">
                  Use our free Subscription Tracker to monitor your services and get personalized recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="/"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Start Tracking Your Subscriptions
                </Link>
              </CardContent>
            </Card>

            <div className="border-t border-slate-700 pt-6">
              <Link href="/blog" className="text-purple-400 hover:text-purple-300 transition-colors">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
