import { Suspense } from "react"
import type { Metadata } from "next"
import RecommendationsScreen from "@/components/screens/recommendations-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export const metadata: Metadata = {
  title: "Recommendations - Optimize Your Spending",
  description:
    "Get personalized recommendations to save money on your subscriptions. Find unused services, discover sharing opportunities, and optimize your monthly budget.",
  openGraph: {
    title: "Save Money on Subscriptions - Recommendations",
    description:
      "Get personalized recommendations to save money on your subscriptions. Find unused services, discover sharing opportunities, and optimize your monthly budget.",
    url: "/recommendations",
  },
  alternates: {
    canonical: "/recommendations",
  },
}

export default function RecommendationsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <RecommendationsScreen />
      </Suspense>
    </AppLayout>
  )
}
