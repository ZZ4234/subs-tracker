import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Service, Show } from "./types"
import { formatCurrency } from "./regional-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotalCost(services: Service[]): number {
  return services.reduce((total, service) => total + service.monthlyCost, 0)
}

export function getRecommendationsToRemove(services: Service[], shows: Show[]): Service[] {
  // Find services with no shows
  const servicesWithNoShows = services.filter((service) => !shows.some((show) => show.serviceId === service.id))

  // Sort by cost (highest first) to recommend removing the most expensive unused services
  return servicesWithNoShows.sort((a, b) => b.monthlyCost - a.monthlyCost)
}

export function getServiceLogoUrl(serviceName: string): string {
  // Map common streaming services to placeholder images
  // In a real app, you might want to use actual logos or a more sophisticated approach
  const name = serviceName.toLowerCase()

  if (name.includes("netflix")) {
    return "/netflix-inspired-logo.png"
  } else if (name.includes("disney")) {
    return "/disney-plus-logo.png"
  } else if (name.includes("hulu")) {
    return "/hulu-logo.png"
  } else if (name.includes("hbo") || name.includes("max")) {
    return "/hbo-max-logo.png"
  } else if (name.includes("prime") || name.includes("amazon")) {
    return "/amazon-prime-video-logo.png"
  } else if (name.includes("apple")) {
    return "/apple-tv-plus-logo.png"
  } else if (name.includes("paramount")) {
    return "/paramount-plus-logo.png"
  } else if (name.includes("peacock")) {
    return "/peacock-logo.png"
  }

  // Default placeholder for other services
  return "/placeholder.svg?height=40&width=40&query=Streaming service logo"
}

// Add a new utility function for formatting prices with location
export function formatPrice(amount: number, currency: string, symbol: string): string {
  return formatCurrency(amount, currency, symbol)
}
