import type { Metadata } from "next"
import { Suspense } from "react"
import HomeScreen from "@/components/screens/home-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export const metadata: Metadata = {
  title: "Spotify Subscription Tracker - Monitor Your Music Streaming Costs",
  description:
    "Track your Spotify subscription costs, compare Premium plans, and optimize your music streaming budget. Real-time pricing for all Spotify plans worldwide.",
  keywords: [
    "spotify tracker",
    "spotify subscription cost",
    "spotify premium pricing",
    "music streaming budget",
    "spotify plans comparison",
  ],
  openGraph: {
    title: "Spotify Subscription Tracker - Monitor Your Music Streaming Costs",
    description:
      "Track your Spotify subscription costs, compare Premium plans, and optimize your music streaming budget.",
    url: "/spotify-tracker",
  },
  alternates: {
    canonical: "/spotify-tracker",
  },
}

export default function SpotifyTrackerPage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Spotify Subscription Tracker</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Monitor your Spotify costs, compare Premium plans, and optimize your music budget
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-green-800">Spotify Plans & Pricing</h2>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-green-700">Individual</h3>
                  <p className="text-sm text-gray-600">1 account, ad-free music</p>
                  <p className="text-lg font-bold">$10.99/month</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-green-700">Family</h3>
                  <p className="text-sm text-gray-600">6 accounts, family mix</p>
                  <p className="text-lg font-bold">$16.99/month</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h3 className="font-semibold text-green-700">Student</h3>
                  <p className="text-sm text-gray-600">1 account, student discount</p>
                  <p className="text-lg font-bold">$5.99/month</p>
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
