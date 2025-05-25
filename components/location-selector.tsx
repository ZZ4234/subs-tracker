"use client"

import { useState } from "react"
import { Globe, MapPin, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLocation, type LocationData } from "@/hooks/use-location"

const countries = [
  { code: "US", name: "United States", currency: "USD", symbol: "$" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "C$" },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£" },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "A$" },
  { code: "DE", name: "Germany", currency: "EUR", symbol: "€" },
  { code: "FR", name: "France", currency: "EUR", symbol: "€" },
  { code: "IT", name: "Italy", currency: "EUR", symbol: "€" },
  { code: "ES", name: "Spain", currency: "EUR", symbol: "€" },
  { code: "NL", name: "Netherlands", currency: "EUR", symbol: "€" },
  { code: "JP", name: "Japan", currency: "JPY", symbol: "¥" },
  { code: "KR", name: "South Korea", currency: "KRW", symbol: "₩" },
  { code: "IN", name: "India", currency: "INR", symbol: "₹" },
  { code: "BR", name: "Brazil", currency: "BRL", symbol: "R$" },
  { code: "MX", name: "Mexico", currency: "MXN", symbol: "$" },
  { code: "SE", name: "Sweden", currency: "SEK", symbol: "kr" },
  { code: "NO", name: "Norway", currency: "NOK", symbol: "kr" },
  { code: "DK", name: "Denmark", currency: "DKK", symbol: "kr" },
  { code: "CH", name: "Switzerland", currency: "CHF", symbol: "CHF" },
  { code: "PL", name: "Poland", currency: "PLN", symbol: "zł" },
]

export default function LocationSelector() {
  const { location, isLoading, updateLocation, resetLocation } = useLocation()
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(location.countryCode)

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode)
    if (country) {
      const newLocation: LocationData = {
        country: country.name,
        countryCode: country.code,
        currency: country.currency,
        currencySymbol: country.symbol,
        timezone: location.timezone, // Keep existing timezone
      }
      updateLocation(newLocation)
      setSelectedCountry(countryCode)
      setOpen(false)
    }
  }

  const handleAutoDetect = () => {
    resetLocation()
    setOpen(false)
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
        Detecting...
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8">
          <Globe className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">{location.country}</span>
          <span className="sm:hidden">{location.countryCode}</span>
          <Badge variant="secondary" className="ml-1 text-xs">
            {location.currencySymbol}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Select Your Location
          </DialogTitle>
          <DialogDescription>
            Choose your country to see relevant services and pricing in your local currency.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Location</label>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div>
                <div className="font-medium">{location.country}</div>
                <div className="text-sm text-muted-foreground">
                  Currency: {location.currency} ({location.currencySymbol})
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleAutoDetect}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Auto-detect
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Or Choose Manually</label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center justify-between w-full">
                      <span>{country.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {country.symbol}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
