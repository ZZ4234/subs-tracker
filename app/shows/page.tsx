import { Suspense } from "react"
import ShowsScreen from "@/components/screens/shows-screen"
import LoadingScreen from "@/components/loading-screen"
import AppLayout from "@/components/app-layout"

export default function ShowsPage() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <ShowsScreen />
      </Suspense>
    </AppLayout>
  )
}
