import { Suspense } from "react"
import type { Metadata } from "next"
import HomeScreen from "@/components/screens/home-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export const metadata: Metadata = {
  title: "Home - Track Your Subscriptions",
  description:
    "Start tracking your monthly subscriptions and streaming services. See your total monthly costs and get personalized recommendations to save money.",
  openGraph: {
    title: "Subscription Tracker - Track Your Monthly Expenses",
    description:
      "Start tracking your monthly subscriptions and streaming services. See your total monthly costs and get personalized recommendations to save money.",
    url: "/",
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
