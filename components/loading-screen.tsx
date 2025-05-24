import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoadingScreen() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center py-4">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-10 w-24 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-20" />
        </div>

        <div className="grid gap-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="p-4 flex flex-row items-center">
                <Skeleton className="w-12 h-12 rounded-md mr-3" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
