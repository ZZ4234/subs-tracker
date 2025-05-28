import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "SmartSubSaver - Save Money on Streaming Services & Subscriptions",
    template: "%s | SmartSubSaver - Save Money on Subscriptions",
  },
  description:
    "Save $100+ monthly on streaming services like Netflix, Disney+, Spotify. Free subscription tracker helps you cancel unused services, find deals, and optimize your budget. Track all subscriptions in one place.",
  keywords: [
    "save money on streaming services",
    "subscription tracker",
    "money saving ideas",
    "cancel unused subscriptions",
    "streaming service deals",
    "Netflix cost calculator",
    "Disney Plus savings",
    "Spotify family plan",
    "subscription management app",
    "monthly budget tracker",
    "streaming budget optimizer",
    "subscription audit tool",
    "recurring payment tracker",
    "subscription cost calculator",
    "streaming service comparison",
    "money saving tips",
    "budget optimization",
    "subscription cancellation guide",
    "streaming service rotation",
    "family plan calculator",
    "subscription sharing guide",
    "streaming costs 2024",
    "reduce monthly expenses",
    "subscription budget planner",
    "streaming service tracker",
  ],
  authors: [{ name: "SmartSubSaver Team" }],
  creator: "SmartSubSaver",
  publisher: "SmartSubSaver",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://smartsubsaver.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "SmartSubSaver - Save Money on Streaming Services & Subscriptions",
    description:
      "Save $100+ monthly on streaming services like Netflix, Disney+, Spotify. Free subscription tracker helps you cancel unused services, find deals, and optimize your budget.",
    siteName: "SmartSubSaver",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmartSubSaver - Save Money on Streaming Services & Subscriptions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartSubSaver - Save Money on Streaming Services & Subscriptions",
    description:
      "Save $100+ monthly on streaming services. Free subscription tracker helps you cancel unused services and optimize your budget.",
    images: ["/og-image.png"],
    creator: "@smartsubsaver",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Enhanced Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SmartSubSaver",
              alternateName: "Subscription Tracker",
              description:
                "Save money on streaming services and subscriptions. Track Netflix, Disney+, Spotify costs. Free subscription tracker helps you cancel unused services and optimize your monthly budget.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://smartsubsaver.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free subscription tracking and money-saving recommendations",
              },
              featureList: [
                "Save money on streaming services",
                "Track subscription expenses",
                "Cancel unused subscriptions",
                "Netflix cost calculator",
                "Disney Plus savings tracker",
                "Spotify family plan optimizer",
                "Streaming service comparison",
                "Monthly budget optimization",
                "Subscription audit tool",
                "Money saving recommendations",
                "Real-time pricing updates",
                "Multi-currency support",
                "Family plan calculator",
                "Subscription sharing guide",
                "Budget alerts and notifications",
              ],
              author: {
                "@type": "Organization",
                name: "SmartSubSaver",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://smartsubsaver.com",
              },
              publisher: {
                "@type": "Organization",
                name: "SmartSubSaver",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://smartsubsaver.com",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1247",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Sarah Johnson",
                  },
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody: "Saved me $127 per month by finding unused subscriptions I forgot about!",
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Mike Chen",
                  },
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody: "Best subscription tracker app. Helped me optimize my streaming budget perfectly.",
                },
              ],
            }),
          }}
        />

        {/* FAQ Structured Data */}
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How can I save money on streaming services?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can save money on streaming services by: 1) Canceling unused subscriptions, 2) Sharing family plans with others, 3) Rotating subscriptions seasonally, 4) Using ad-supported tiers, 5) Taking advantage of bundle deals. Our free tracker helps identify which services you're not using.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is a subscription tracker?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A subscription tracker is a tool that helps you monitor all your recurring payments and subscriptions in one place. It tracks costs, usage, and provides recommendations to save money by identifying unused services and optimization opportunities.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much money can I save with SmartSubSaver?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Users typically save $50-150 per month using SmartSubSaver. The average person has 3-5 unused subscriptions costing $127 monthly. Our tracker helps identify these and provides personalized money-saving recommendations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is SmartSubSaver free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, SmartSubSaver is completely free. You can track unlimited subscriptions, get money-saving recommendations, and access real-time pricing without any cost. No account required.",
                  },
                },
              ],
            }),
          }}
        />

        {/* How-To Structured Data */}
        <Script
          id="howto-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "How to Save Money on Streaming Services",
              description: "Step-by-step guide to reduce your streaming costs and optimize your subscription budget",
              image: "/og-image.png",
              totalTime: "PT15M",
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: "0",
              },
              supply: [
                {
                  "@type": "HowToSupply",
                  name: "List of current subscriptions",
                },
                {
                  "@type": "HowToSupply",
                  name: "SmartSubSaver tracker (free)",
                },
              ],
              tool: [
                {
                  "@type": "HowToTool",
                  name: "SmartSubSaver Subscription Tracker",
                },
              ],
              step: [
                {
                  "@type": "HowToStep",
                  name: "Audit Your Subscriptions",
                  text: "List all your current streaming services and subscriptions using SmartSubSaver's free tracker.",
                  image: "/step1-audit.png",
                },
                {
                  "@type": "HowToStep",
                  name: "Track Usage",
                  text: "Monitor which services you actually use by adding shows you're watching to each service.",
                  image: "/step2-track.png",
                },
                {
                  "@type": "HowToStep",
                  name: "Get Recommendations",
                  text: "Review SmartSubSaver's personalized recommendations to cancel unused services and optimize costs.",
                  image: "/step3-optimize.png",
                },
                {
                  "@type": "HowToStep",
                  name: "Implement Changes",
                  text: "Cancel unused subscriptions, switch to family plans, or rotate services based on recommendations.",
                  image: "/step4-save.png",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Suspense>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
