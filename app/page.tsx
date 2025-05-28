import { Suspense } from "react"
import type { Metadata } from "next"
import HomeScreen from "@/components/screens/home-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export const metadata: Metadata = {
  title: "Save Money on Streaming Services - Free Subscription Tracker | SmartSubSaver",
  description:
    "Save $100+ monthly on Netflix, Disney+, Spotify & more. Free subscription tracker finds unused services, compares prices, and optimizes your streaming budget. Start saving today!",
  keywords: [
    "save money streaming services",
    "subscription tracker free",
    "cancel unused subscriptions",
    "Netflix cost calculator",
    "streaming budget optimizer",
    "money saving ideas",
    "subscription management",
    "reduce monthly expenses",
    "streaming service deals",
    "budget tracking app",
  ],
  openGraph: {
    title: "Save Money on Streaming Services - Free Subscription Tracker",
    description:
      "Save $100+ monthly on Netflix, Disney+, Spotify & more. Free subscription tracker finds unused services and optimizes your streaming budget.",
    url: "/",
    images: [
      {
        url: "/og-save-money-streaming.png",
        width: 1200,
        height: 630,
        alt: "Save Money on Streaming Services with SmartSubSaver",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <HomeScreen />
      </Suspense>
    </AppLayout>
  )
}
