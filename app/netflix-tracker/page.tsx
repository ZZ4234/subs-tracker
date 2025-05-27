import type { Metadata } from "next"
import { Suspense } from "react"
import HomeScreen from "@/components/screens/home-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export const metadata: Metadata = {
  title: "Netflix Subscription Tracker - Monitor Your Netflix Costs",
  description:
    "Track your Netflix subscription costs, compare plans, and get recommendations to optimize your streaming budget. Real-time pricing for all Netflix plans worldwide.",
  keywords: [
    "netflix tracker",
    "netflix subscription cost",
    "netflix plans comparison",
    "netflix pricing",
    "streaming budget",
  ],
  openGraph: {
    title: "Netflix Subscription Tracker - Monitor Your Netflix Costs",
    description:
      "Track your Netflix subscription costs, compare plans, and get recommendations to optimize your streaming budget.",
    url: "/netflix-tracker",
  },
  alternates: {
    canonical: "/netflix-tracker",
  },
}

export default function NetflixTrackerPage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Netflix Subscription Tracker</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Monitor your Netflix costs, compare plans, and optimize your streaming budget
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-red-800">Netflix Plans & Pricing</h2>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-red-700">Basic</h3>
                  <p className="text-sm text-gray-600">Standard definition, 1 screen</p>
                  <p className="text-lg font-bold">$6.99/month</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-red-700">Standard</h3>
                  <p className="text-sm text-gray-600">HD, 2 screens</p>
                  <p className="text-lg font-bold">$15.49/month</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-red-700">Premium</h3>
                  <p className="text-sm text-gray-600">4K, 4 screens</p>
                  <p className="text-lg font-bold">$22.99/month</p>
                </div>
              </div>
            </div>
          </div>
          <HomeScreen />
        </div>
      </Suspense>
    </AppLayout>
  )
}
