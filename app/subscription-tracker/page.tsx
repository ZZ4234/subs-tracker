import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Free Subscription Tracker - Manage All Your Subscriptions | SmartSubSaver",
  description:
    "Track Netflix, Disney+, Spotify & all subscriptions in one place. Free subscription tracker helps you save money, cancel unused services, and optimize your budget.",
  keywords: [
    "subscription tracker",
    "subscription management",
    "track subscriptions",
    "subscription organizer",
    "monthly subscription tracker",
    "subscription audit tool",
    "recurring payment tracker",
    "subscription cost calculator",
    "subscription monitoring app",
    "subscription budget tracker",
  ],
  alternates: {
    canonical: "/subscription-tracker",
  },
}

export default function SubscriptionTrackerPage() {
  // Redirect to home page for SEO consolidation
  redirect("/")
}
