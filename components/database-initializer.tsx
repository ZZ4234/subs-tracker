"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Database, CheckCircle, AlertCircle } from "lucide-react"

export default function DatabaseInitializer() {
  const [status, setStatus] = useState<"idle" | "initializing" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const initializeDatabase = async () => {
    setStatus("initializing")
    setError(null)

    try {
      const response = await fetch("/api/init-db", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        // Refresh the page after successful initialization
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setStatus("error")
        setError(data.error || "Failed to initialize database")
      }
    } catch (err) {
      setStatus("error")
      setError("Network error occurred")
    }
  }

  // Auto-initialize on component mount
  useEffect(() => {
    initializeDatabase()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "initializing" && <Loader2 className="h-12 w-12 animate-spin text-violet-600" />}
            {status === "success" && <CheckCircle className="h-12 w-12 text-green-600" />}
            {status === "error" && <AlertCircle className="h-12 w-12 text-red-600" />}
            {status === "idle" && <Database className="h-12 w-12 text-violet-600" />}
          </div>
          <CardTitle>
            {status === "initializing" && "Setting up your database..."}
            {status === "success" && "Database ready!"}
            {status === "error" && "Setup failed"}
            {status === "idle" && "Initializing database..."}
          </CardTitle>
          <CardDescription>
            {status === "initializing" && "Please wait while we set up your subscription tracker database."}
            {status === "success" && "Your subscription tracker is ready to use. Redirecting..."}
            {status === "error" && "There was an error setting up the database."}
            {status === "idle" && "Preparing your subscription tracker..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "error" && (
            <div className="space-y-4">
              <p className="text-sm text-red-600">{error}</p>
              <Button onClick={initializeDatabase} className="w-full">
                Try Again
              </Button>
            </div>
          )}
          {status === "initializing" && <p className="text-sm text-muted-foreground">This may take a few moments...</p>}
          {status === "success" && (
            <p className="text-sm text-green-600">Redirecting to your subscription tracker...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
