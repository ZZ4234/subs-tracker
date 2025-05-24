import { Suspense } from "react"
import HomeScreen from "@/components/screens/home-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export default function HomePage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <HomeScreen />
      </Suspense>
    </AppLayout>
  )
}
