export interface Category {
  id: string
  name: string
  icon: string
  color: string
  isCustom?: boolean
}

export interface Service {
  id: string
  name: string
  monthlyCost: number
  logoUrl?: string
  categoryId: string
  description?: string
  realTimePricing?: boolean // New field to indicate if real-time pricing was used
  pricingSource?: "api" | "scraping" | "manual" | "community" // New field to track pricing source
  pricingConfidence?: "high" | "medium" | "low" // New field for pricing confidence
  lastPriceUpdate?: string // New field for when price was last updated
}

export interface Show {
  id: string
  title: string
  serviceId: string
}

export interface PopularService {
  name: string
  categoryId: string
  monthlyCost: number
  description?: string
  logoUrl?: string
  availability?: string[] // Array of country codes where service is available
  useRealTimePricing?: boolean // New flag to indicate this service supports real-time pricing
  alternativeNames?: Record<string, string> // Alternative names by country
}

export interface PricingUpdate {
  serviceName: string
  countryCode: string
  oldPrice: number
  newPrice: number
  currency: string
  source: string
  timestamp: string
}
