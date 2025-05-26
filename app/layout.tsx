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
    default: "Subscription Tracker - Manage Your Monthly Expenses",
    template: "%s | Subscription Tracker",
  },
  description:
    "Track all your subscriptions, streaming services, and recurring expenses in one place. Get recommendations to save money and optimize your monthly budget.",
  keywords: [
    "subscription tracker",
    "monthly expenses",
    "streaming services",
    "budget management",
    "subscription management",
    "save money",
    "Netflix tracker",
    "Disney Plus tracker",
    "subscription optimizer",
  ],
  authors: [{ name: "Subscription Tracker" }],
  creator: "Subscription Tracker",
  publisher: "Subscription Tracker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-app.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Subscription Tracker - Manage Your Monthly Expenses",
    description:
      "Track all your subscriptions, streaming services, and recurring expenses in one place. Get recommendations to save money and optimize your monthly budget.",
    siteName: "Subscription Tracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Subscription Tracker - Manage Your Monthly Expenses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Tracker - Manage Your Monthly Expenses",
    description:
      "Track all your subscriptions, streaming services, and recurring expenses in one place. Get recommendations to save money.",
    images: ["/og-image.png"],
    creator: "@subscriptiontracker",
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
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
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

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Subscription Tracker",
              description:
                "Track all your subscriptions, streaming services, and recurring expenses in one place. Get recommendations to save money and optimize your monthly budget.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-app.vercel.app",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Track subscription expenses",
                "Monitor streaming services",
                "Get money-saving recommendations",
                "Analyze spending patterns",
                "Multi-currency support",
                "Real-time pricing updates",
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
