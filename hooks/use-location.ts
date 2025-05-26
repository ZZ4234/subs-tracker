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
        const parsed = JSON.parse(savedLocation)
        // Check if saved location is less than 24 hours old
        const savedTime = localStorage.getItem("userLocationTime")
        if (savedTime && Date.now() - Number.parseInt(savedTime) < 24 * 60 * 60 * 1000) {
          setLocation(parsed)
          setIsLoading(false)
          return
        }
      }

      // Try multiple geo-location services for better accuracy
      let locationData = null

      // Method 1: Try ipapi.co (most reliable)
      try {
        const response = await fetch("https://ipapi.co/json/", { timeout: 5000 })
        if (response.ok) {
          locationData = await response.json()
          if (!locationData.error) {
            console.log("Location detected via ipapi.co:", locationData.country_name)
          }
        }
      } catch (err) {
        console.log("ipapi.co failed, trying backup...")
      }

      // Method 2: Backup service - ip-api.com
      if (!locationData || locationData.error) {
        try {
          const response = await fetch("http://ip-api.com/json/", { timeout: 5000 })
          if (response.ok) {
            const data = await response.json()
            if (data.status === "success") {
              locationData = {
                country_name: data.country,
                country_code: data.countryCode,
                timezone: data.timezone,
              }
              console.log("Location detected via ip-api.com:", data.country)
            }
          }
        } catch (err) {
          console.log("ip-api.com failed, trying final backup...")
        }
      }

      // Method 3: Final backup - ipinfo.io
      if (!locationData || locationData.error) {
        try {
          const response = await fetch("https://ipinfo.io/json", { timeout: 5000 })
          if (response.ok) {
            const data = await response.json()
            locationData = {
              country_name: data.country, // This gives country code, we'll map it
              country_code: data.country,
              timezone: data.timezone,
            }
            console.log("Location detected via ipinfo.io:", data.country)
          }
        } catch (err) {
          console.log("All geo-location services failed")
        }
      }

      if (!locationData || locationData.error) {
        throw new Error("All geo-location services failed")
      }

      const countryCode = locationData.country_code || "US"
      const currencyInfo = countryToCurrency[countryCode] || countryToCurrency.US

      const detectedLocation: LocationData = {
        country: locationData.country_name || getCountryName(countryCode) || "United States",
        countryCode,
        currency: currencyInfo.currency,
        currencySymbol: currencyInfo.symbol,
        timezone: locationData.timezone || "America/New_York",
      }

      setLocation(detectedLocation)
      localStorage.setItem("userLocation", JSON.stringify(detectedLocation))
      localStorage.setItem("userLocationTime", Date.now().toString())

      console.log("Final detected location:", detectedLocation)
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

// Helper function to get country name from country code
function getCountryName(countryCode: string): string {
  const countryNames: Record<string, string> = {
    US: "United States",
    CA: "Canada",
    GB: "United Kingdom",
    AU: "Australia",
    DE: "Germany",
    FR: "France",
    IT: "Italy",
    ES: "Spain",
    NL: "Netherlands",
    JP: "Japan",
    KR: "South Korea",
    IN: "India",
    BR: "Brazil",
    MX: "Mexico",
    SE: "Sweden",
    NO: "Norway",
    DK: "Denmark",
    CH: "Switzerland",
    PL: "Poland",
    // Add more as needed
  }
  return countryNames[countryCode] || countryCode
}
