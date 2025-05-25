"use client"

import { useState, useEffect } from "react"

export interface LocationData {
  country: string
  countryCode: string
  currency: string
  currencySymbol: string
  timezone: string
}

const defaultLocation: LocationData = {
  country: "United States",
  countryCode: "US",
  currency: "USD",
  currencySymbol: "$",
  timezone: "America/New_York",
}

// Country to currency mapping
const countryToCurrency: Record<string, { currency: string; symbol: string }> = {
  US: { currency: "USD", symbol: "$" },
  CA: { currency: "CAD", symbol: "C$" },
  GB: { currency: "GBP", symbol: "£" },
  AU: { currency: "AUD", symbol: "A$" },
  DE: { currency: "EUR", symbol: "€" },
  FR: { currency: "EUR", symbol: "€" },
  IT: { currency: "EUR", symbol: "€" },
  ES: { currency: "EUR", symbol: "€" },
  NL: { currency: "EUR", symbol: "€" },
  JP: { currency: "JPY", symbol: "¥" },
  KR: { currency: "KRW", symbol: "₩" },
  IN: { currency: "INR", symbol: "₹" },
  BR: { currency: "BRL", symbol: "R$" },
  MX: { currency: "MXN", symbol: "$" },
  AR: { currency: "ARS", symbol: "$" },
  SE: { currency: "SEK", symbol: "kr" },
  NO: { currency: "NOK", symbol: "kr" },
  DK: { currency: "DKK", symbol: "kr" },
  CH: { currency: "CHF", symbol: "CHF" },
  PL: { currency: "PLN", symbol: "zł" },
  CZ: { currency: "CZK", symbol: "Kč" },
  HU: { currency: "HUF", symbol: "Ft" },
  RO: { currency: "RON", symbol: "lei" },
  BG: { currency: "BGN", symbol: "лв" },
  HR: { currency: "EUR", symbol: "€" },
  SI: { currency: "EUR", symbol: "€" },
  SK: { currency: "EUR", symbol: "€" },
  LT: { currency: "EUR", symbol: "€" },
  LV: { currency: "EUR", symbol: "€" },
  EE: { currency: "EUR", symbol: "€" },
  FI: { currency: "EUR", symbol: "€" },
  IE: { currency: "EUR", symbol: "€" },
  PT: { currency: "EUR", symbol: "€" },
  GR: { currency: "EUR", symbol: "€" },
  CY: { currency: "EUR", symbol: "€" },
  MT: { currency: "EUR", symbol: "€" },
  LU: { currency: "EUR", symbol: "€" },
  BE: { currency: "EUR", symbol: "€" },
  AT: { currency: "EUR", symbol: "€" },
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData>(defaultLocation)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    detectLocation()
  }, [])

  const detectLocation = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // First try to get from localStorage
      const savedLocation = localStorage.getItem("userLocation")
      if (savedLocation) {
        setLocation(JSON.parse(savedLocation))
        setIsLoading(false)
        return
      }

      // Try IP-based detection using a free service
      const response = await fetch("https://ipapi.co/json/")
      if (!response.ok) {
        throw new Error("Failed to detect location")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.reason || "Location detection failed")
      }

      const countryCode = data.country_code || "US"
      const currencyInfo = countryToCurrency[countryCode] || countryToCurrency.US

      const detectedLocation: LocationData = {
        country: data.country_name || "United States",
        countryCode,
        currency: currencyInfo.currency,
        currencySymbol: currencyInfo.symbol,
        timezone: data.timezone || "America/New_York",
      }

      setLocation(detectedLocation)
      localStorage.setItem("userLocation", JSON.stringify(detectedLocation))
    } catch (err) {
      console.error("Location detection failed:", err)
      setError(err instanceof Error ? err.message : "Location detection failed")
      // Fall back to default location
      setLocation(defaultLocation)
    } finally {
      setIsLoading(false)
    }
  }

  const updateLocation = (newLocation: LocationData) => {
    setLocation(newLocation)
    localStorage.setItem("userLocation", JSON.stringify(newLocation))
  }

  const resetLocation = () => {
    localStorage.removeItem("userLocation")
    detectLocation()
  }

  return {
    location,
    isLoading,
    error,
    updateLocation,
    resetLocation,
    detectLocation,
  }
}
