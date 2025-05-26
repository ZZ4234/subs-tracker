import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get("country") || "US"

  try {
    // This would ideally scrape Netflix's pricing page
    // For now, we'll return curated data
    const pricing = await getNetflixPricingForCountry(country)

    return NextResponse.json(pricing)
  } catch (error) {
    console.error("Netflix pricing API error:", error)
    return NextResponse.json({ error: "Failed to fetch pricing" }, { status: 500 })
  }
}

async function getNetflixPricingForCountry(countryCode: string) {
  // In a real implementation, you might:
  // 1. Use Puppeteer to scrape Netflix pricing pages
  // 2. Use a third-party pricing API
  // 3. Maintain a database of current prices

  // For now, return updated manual pricing
  const pricingData: Record<string, any> = {
    US: { price: 15.49, currency: "USD", plan: "Standard" },
    CA: { price: 16.49, currency: "CAD", plan: "Standard" },
    GB: { price: 10.99, currency: "GBP", plan: "Standard" },
    AU: { price: 16.99, currency: "AUD", plan: "Standard" },
    DE: { price: 12.99, currency: "EUR", plan: "Standard" },
    // Add more countries...
  }

  const pricing = pricingData[countryCode] || pricingData.US

  return {
    serviceName: "Netflix",
    countryCode,
    currency: pricing.currency,
    price: pricing.price,
    plan: pricing.plan,
    lastUpdated: new Date().toISOString(),
    source: "manual_curation", // Could be "api", "scraping", etc.
  }
}
