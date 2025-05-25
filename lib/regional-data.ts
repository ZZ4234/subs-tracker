import type { PopularService } from "./types"

// Exchange rates (in a real app, you'd fetch these from an API)
const exchangeRates: Record<string, number> = {
  USD: 1.0,
  CAD: 1.35,
  GBP: 0.79,
  EUR: 0.92,
  AUD: 1.52,
  JPY: 149.0,
  KRW: 1320.0,
  INR: 83.0,
  BRL: 5.0,
  MXN: 17.0,
  SEK: 10.5,
  NOK: 10.8,
  DKK: 6.9,
  CHF: 0.88,
  PLN: 4.0,
  CZK: 22.5,
  HUF: 360.0,
  RON: 4.6,
  BGN: 1.8,
}

// Regional pricing adjustments (multipliers for base USD price)
const regionalPricing: Record<string, Record<string, number>> = {
  Netflix: {
    US: 1.0,
    CA: 0.95,
    GB: 1.1,
    AU: 0.85,
    DE: 0.9,
    FR: 0.9,
    IT: 0.85,
    ES: 0.8,
    NL: 0.9,
    JP: 0.7,
    KR: 0.6,
    IN: 0.3,
    BR: 0.4,
    MX: 0.5,
    SE: 1.0,
    NO: 1.2,
    DK: 1.1,
    CH: 1.3,
    PL: 0.6,
    CZ: 0.5,
    HU: 0.5,
    RO: 0.4,
    BG: 0.4,
  },
  "Disney+": {
    US: 1.0,
    CA: 0.95,
    GB: 1.0,
    AU: 0.9,
    DE: 0.85,
    FR: 0.85,
    IT: 0.8,
    ES: 0.8,
    NL: 0.85,
    JP: 0.8,
    KR: 0.7,
    IN: 0.4,
    BR: 0.5,
    SE: 0.9,
    NO: 1.0,
    DK: 0.95,
    CH: 1.1,
    PL: 0.6,
    CZ: 0.5,
    HU: 0.5,
    RO: 0.4,
    BG: 0.4,
  },
  Spotify: {
    US: 1.0,
    CA: 0.95,
    GB: 1.0,
    AU: 0.9,
    DE: 1.0,
    FR: 1.0,
    IT: 1.0,
    ES: 1.0,
    NL: 1.0,
    JP: 0.8,
    KR: 0.6,
    IN: 0.15,
    BR: 0.3,
    MX: 0.4,
    SE: 1.0,
    NO: 1.1,
    DK: 1.0,
    CH: 1.2,
    PL: 0.5,
    CZ: 0.4,
    HU: 0.4,
    RO: 0.3,
    BG: 0.3,
  },
  // Australian services - these are already in AUD, so we need to convert to USD first
  Stan: {
    AU: 1.0, // Base price is already in AUD
  },
  "Foxtel Now": {
    AU: 1.0, // Base price is already in AUD
  },
  Binge: {
    AU: 1.0, // Base price is already in AUD
  },
  "Kayo Sports": {
    AU: 1.0, // Base price is already in AUD
  },
}

export function convertPrice(baseUsdPrice: number, targetCurrency: string): number {
  const rate = exchangeRates[targetCurrency] || 1
  return baseUsdPrice * rate
}

export function getRegionalPrice(
  serviceName: string,
  basePrice: number,
  countryCode: string,
  targetCurrency: string,
): number {
  // For Australian services, the base price is already in AUD
  const australianServices = [
    "Stan",
    "Foxtel Now",
    "Binge",
    "Kayo Sports",
    "ABC iview",
    "SBS On Demand",
    "7plus",
    "9Now",
    "10 play",
  ]

  if (australianServices.includes(serviceName) && countryCode === "AU") {
    // If target currency is AUD, return as-is
    if (targetCurrency === "AUD") {
      return basePrice
    }
    // If target currency is not AUD, convert from AUD to target
    const audToUsd = 1 / exchangeRates.AUD // Convert AUD to USD first
    const usdPrice = basePrice * audToUsd
    return convertPrice(usdPrice, targetCurrency)
  }

  // For UK services
  const ukServices = ["BBC iPlayer", "ITV Hub", "All 4", "My5", "Sky Go", "NOW TV"]
  if (ukServices.includes(serviceName) && countryCode === "GB") {
    if (targetCurrency === "GBP") {
      return basePrice
    }
    const gbpToUsd = 1 / exchangeRates.GBP
    const usdPrice = basePrice * gbpToUsd
    return convertPrice(usdPrice, targetCurrency)
  }

  // For other regional services, handle similarly...

  // Get regional pricing multiplier for global services
  const serviceRegionalPricing = regionalPricing[serviceName]
  const regionalMultiplier = serviceRegionalPricing?.[countryCode] || 1.0

  // Apply regional pricing
  const regionalUsdPrice = basePrice * regionalMultiplier

  // Convert to target currency
  return convertPrice(regionalUsdPrice, targetCurrency)
}

export function isServiceAvailable(serviceName: string, countryCode: string): boolean {
  // This is now handled by the availability array in the service data
  return true // The filtering is done in getAvailableServices
}

export function getAvailableServices(services: PopularService[], countryCode: string): PopularService[] {
  return services.filter((service) => {
    // If no availability specified, assume it's available everywhere
    if (!service.availability || service.availability.length === 0) {
      return true
    }
    return service.availability.includes(countryCode)
  })
}

export function formatCurrency(amount: number, currency: string, symbol: string): string {
  // Handle special formatting for different currencies
  switch (currency) {
    case "JPY":
    case "KRW":
      // No decimal places for these currencies
      return `${symbol}${Math.round(amount).toLocaleString()}`
    case "HUF":
      // No decimal places, different formatting
      return `${Math.round(amount).toLocaleString()} ${symbol}`
    case "CZK":
    case "PLN":
    case "RON":
    case "BGN":
      // Different symbol placement
      return `${amount.toFixed(2)} ${symbol}`
    case "SEK":
    case "NOK":
    case "DKK":
      // Symbol after amount
      return `${amount.toFixed(2)} ${symbol}`
    default:
      // Standard formatting (USD, EUR, GBP, etc.)
      return `${symbol}${amount.toFixed(2)}`
  }
}

// Get localized service names
export function getLocalizedServiceName(serviceName: string, countryCode: string): string {
  const localizations: Record<string, Record<string, string>> = {
    "HBO Max": {
      US: "Max",
      CA: "Crave",
      GB: "Sky Atlantic",
      AU: "Binge",
    },
    Hulu: {
      JP: "Hulu Japan",
    },
  }

  return localizations[serviceName]?.[countryCode] || serviceName
}
