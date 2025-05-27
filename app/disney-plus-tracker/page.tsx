import type { Metadata } from "next"
import { Suspense } from "react"
import HomeScreen from "@/components/screens/home-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export const metadata: Metadata = {
  title: "Disney+ Subscription Tracker - Monitor Your Disney Plus Costs",
  description:
    "Track your Disney+ subscription costs, compare bundle options, and optimize your family streaming budget. Real-time pricing for Disney+ plans worldwide.",
  keywords: [
    "disney plus tracker",
    "disney+ subscription cost",
    "disney bundle pricing",
    "family streaming budget",
    "disney plus plans",
  ],
  openGraph: {
    title: "Disney+ Subscription Tracker - Monitor Your Disney Plus Costs",
    description:
      "Track your Disney+ subscription costs, compare bundle options, and optimize your family streaming budget.",
    url: "/disney-plus-tracker",
  },
  alternates: {
    canonical: "/disney-plus-tracker",
  },
}

export default function DisneyPlusTrackerPage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Disney+ Subscription Tracker</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Monitor your Disney+ costs, compare bundles, and optimize your family streaming budget
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Disney+ Plans & Bundles</h2>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-blue-700">Disney+ Basic</h3>
                  <p className="text-sm text-gray-600">With ads, HD streaming</p>
                  <p className="text-lg font-bold">$7.99/month</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-blue-700">Disney+ Premium</h3>
                  <p className="text-sm text-gray-600">No ads, 4K streaming</p>
                  <p className="text-lg font-bold">$13.99/month</p>
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
