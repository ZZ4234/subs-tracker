import { type NextRequest, NextResponse } from "next/server"

// Simulated community pricing data (in a real app, this would be a database)
const communityPricing = {
  Netflix: {
    US: [
      { price: 15.49, plan: "Standard", reportedBy: "user123", reportedAt: "2024-01-15", verified: true },
      { price: 15.49, plan: "Standard", reportedBy: "user456", reportedAt: "2024-01-14", verified: true },
      { price: 15.49, plan: "Standard", reportedBy: "user789", reportedAt: "2024-01-13", verified: false },
    ],
    CA: [
      { price: 16.49, plan: "Standard", reportedBy: "user_ca1", reportedAt: "2024-01-15", verified: true },
      { price: 16.49, plan: "Standard", reportedBy: "user_ca2", reportedAt: "2024-01-14", verified: true },
    ],
    GB: [
      { price: 10.99, plan: "Standard", reportedBy: "user_uk1", reportedAt: "2024-01-15", verified: true },
      { price: 10.99, plan: "Standard", reportedBy: "user_uk2", reportedAt: "2024-01-12", verified: true },
    ],
    IN: [
      { price: 649, plan: "Premium", reportedBy: "user_in1", reportedAt: "2024-01-15", verified: true },
      { price: 649, plan: "Premium", reportedBy: "user_in2", reportedAt: "2024-01-14", verified: true },
    ],
  },
  "Disney+": {
    US: [
      { price: 7.99, plan: "Basic", reportedBy: "disney_fan1", reportedAt: "2024-01-15", verified: true },
      { price: 7.99, plan: "Basic", reportedBy: "disney_fan2", reportedAt: "2024-01-14", verified: true },
    ],
    CA: [{ price: 11.99, plan: "Basic", reportedBy: "ca_disney", reportedAt: "2024-01-15", verified: true }],
    IN: [{ price: 299, plan: "Super", reportedBy: "india_disney", reportedAt: "2024-01-15", verified: true }],
  },
  Spotify: {
    US: [
      { price: 10.99, plan: "Individual", reportedBy: "music_lover", reportedAt: "2024-01-15", verified: true },
      { price: 10.99, plan: "Individual", reportedBy: "spotify_user", reportedAt: "2024-01-14", verified: true },
    ],
    IN: [
      { price: 119, plan: "Individual", reportedBy: "india_user1", reportedAt: "2024-01-15", verified: true },
      { price: 119, plan: "Individual", reportedBy: "india_user2", reportedAt: "2024-01-13", verified: false },
    ],
    BR: [{ price: 19.9, plan: "Individual", reportedBy: "brazil_user1", reportedAt: "2024-01-15", verified: true }],
  },
  "Apple Music": {
    US: [{ price: 10.99, plan: "Individual", reportedBy: "apple_fan", reportedAt: "2024-01-15", verified: true }],
    IN: [{ price: 99, plan: "Individual", reportedBy: "india_apple", reportedAt: "2024-01-15", verified: true }],
  },
  "YouTube Premium": {
    US: [{ price: 13.99, plan: "Individual", reportedBy: "youtube_user", reportedAt: "2024-01-15", verified: true }],
    IN: [{ price: 129, plan: "Individual", reportedBy: "india_yt", reportedAt: "2024-01-15", verified: true }],
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const service = searchParams.get("service")
  const country = searchParams.get("country") || "US"

  if (!service) {
    return NextResponse.json({ error: "Service parameter required" }, { status: 400 })
  }

  try {
    console.log(`👥 Getting community pricing for ${service} in ${country}...`)

    const pricing = getCommunityPricing(service, country)

    if (!pricing) {
      return NextResponse.json({ error: "No community pricing found" }, { status: 404 })
    }

    return NextResponse.json(pricing)
  } catch (error) {
    console.error("Community pricing error:", error)
    return NextResponse.json({ error: "Failed to get community pricing" }, { status: 500 })
  }
}

function getCommunityPricing(service: string, countryCode: string) {
  const serviceData = communityPricing[service as keyof typeof communityPricing]
  if (!serviceData) return null

  const countryData = serviceData[countryCode as keyof typeof serviceData]
  if (!countryData || countryData.length === 0) return null

  // Filter for recent reports (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentReports = countryData.filter((report) => new Date(report.reportedAt) > thirtyDaysAgo)

  if (recentReports.length === 0) return null

  // Prioritize verified reports
  const verifiedReports = recentReports.filter((report) => report.verified)
  const reportsToUse = verifiedReports.length > 0 ? verifiedReports : recentReports

  // Calculate consensus price (most common price)
  const priceFrequency: Record<number, number> = {}
  reportsToUse.forEach((report) => {
    priceFrequency[report.price] = (priceFrequency[report.price] || 0) + 1
  })

  const consensusPrice = Number(
    Object.keys(priceFrequency).reduce((a, b) => (priceFrequency[Number(a)] > priceFrequency[Number(b)] ? a : b)),
  )

  // Get currency based on country
  const currencyMap: Record<string, string> = {
    US: "USD",
    CA: "CAD",
    GB: "GBP",
    AU: "AUD",
    DE: "EUR",
    FR: "EUR",
    IT: "EUR",
    ES: "EUR",
    NL: "EUR",
    JP: "JPY",
    KR: "KRW",
    IN: "INR",
    BR: "BRL",
    MX: "MXN",
  }

  const currency = currencyMap[countryCode] || "USD"
  const plan = reportsToUse[0].plan

  // Calculate confidence based on number of reports and verification
  const totalReports = reportsToUse.length
  const verifiedCount = reportsToUse.filter((r) => r.verified).length
  const verificationRatio = verifiedCount / totalReports

  let confidence: "high" | "medium" | "low" = "low"
  if (totalReports >= 3 && verificationRatio >= 0.7) {
    confidence = "high"
  } else if (totalReports >= 2 && verificationRatio >= 0.5) {
    confidence = "medium"
  }

  return {
    currency,
    price: consensusPrice,
    plan,
    confidence,
    reportCount: totalReports,
    verifiedCount,
    lastUpdated: new Date().toISOString(),
  }
}

// POST endpoint to submit community pricing (simplified for demo)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, country, price, plan, userToken } = body

    // In a real implementation, you would:
    // 1. Validate the user token
    // 2. Store in a database
    // 3. Implement rate limiting
    // 4. Add moderation/verification

    console.log(`👥 Community pricing submitted: ${service} in ${country} = ${price}`)

    // For demo purposes, we'll just log it
    return NextResponse.json({
      success: true,
      message: "Pricing submitted for review (demo mode)",
      note: "In production, this would be stored in a database",
    })
  } catch (error) {
    console.error("Failed to submit community pricing:", error)
    return NextResponse.json({ error: "Failed to submit pricing" }, { status: 500 })
  }
}
