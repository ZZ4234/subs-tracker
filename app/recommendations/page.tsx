import { Suspense } from "react"
import RecommendationsScreen from "@/components/screens/recommendations-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export default function RecommendationsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <RecommendationsScreen />
      </Suspense>
    </AppLayout>
  )
}
