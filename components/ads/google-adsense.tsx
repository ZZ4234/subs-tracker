"use client"

import type React from "react"

import { useEffect } from "react"

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function GoogleAdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
  className = "",
}: GoogleAdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}
