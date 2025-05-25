"use client"

import { useState, useEffect } from "react"
import GoogleAdSense from "./google-adsense"
import BannerAd from "./banner-ad"
import AffiliateRecommendations from "./affiliate-recommendations"

interface AdManagerProps {
  placement: "home-top" | "home-bottom" | "recommendations" | "between-services"
  className?: string
}

export default function AdManager({ placement, className = "" }: AdManagerProps) {
  const [showAds, setShowAds] = useState(true)

  // Check if user has dismissed ads recently
  useEffect(() => {
    const dismissedAds = localStorage.getItem("dismissedAds")
    if (dismissedAds) {
      const dismissedTime = Number.parseInt(dismissedAds)
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60)
      if (hoursSinceDismissed < 24) {
        setShowAds(false)
      }
    }
  }, [])

  const handleAdDismiss = () => {
    localStorage.setItem("dismissedAds", Date.now().toString())
    setShowAds(false)
  }

  if (!showAds) return null

  switch (placement) {
    case "home-top":
      return (
        <div className={className}>
          <BannerAd
            title="Save More with Honey"
            description="Automatically find coupon codes for your subscriptions and save money at checkout"
            imageUrl="/placeholder.svg?height=64&width=64&query=Honey browser extension logo"
            ctaText="Get Honey Free"
            ctaUrl="https://honey.com"
            onClose={handleAdDismiss}
          />
        </div>
      )

    case "home-bottom":
      return (
        <div className={className}>
          <GoogleAdSense
            adSlot="1234567890" // Replace with your actual ad slot
            style={{ display: "block", height: "100px" }}
            className="my-4"
          />
        </div>
      )

    case "recommendations":
      return (
        <div className={className}>
          <AffiliateRecommendations />
        </div>
      )

    case "between-services":
      return (
        <div className={className}>
          <BannerAd
            title="Track Your Budget with YNAB"
            description="Take control of your subscriptions and spending with the award-winning budgeting app"
            imageUrl="/placeholder.svg?height=64&width=64&query=YNAB budgeting app logo"
            ctaText="Try Free for 34 Days"
            ctaUrl="https://ynab.com"
            dismissible={false}
          />
        </div>
      )

    default:
      return null
  }
}
