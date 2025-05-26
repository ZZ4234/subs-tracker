import { Suspense } from "react"
import type { Metadata } from "next"
import ShowsScreen from "@/components/screens/shows-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export const metadata: Metadata = {
  title: "Shows - Track What You're Watching",
  description:
    "Keep track of all the shows and movies you're watching across different streaming services. Optimize your subscriptions based on your viewing habits.",
  openGraph: {
    title: "Track Your Shows - Subscription Tracker",
    description:
      "Keep track of all the shows and movies you're watching across different streaming services. Optimize your subscriptions based on your viewing habits.",
    url: "/shows",
  },
  alternates: {
    canonical: "/shows",
  },
}

export default function ShowsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <ShowsScreen />
      </Suspense>
    </AppLayout>
  )
}
