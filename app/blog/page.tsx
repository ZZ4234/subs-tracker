import type { Metadata } from "next"
import AppLayout from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog - Subscription Management Tips & Guides",
  description:
    "Learn how to save money on subscriptions, manage streaming services, and optimize your monthly budget with expert tips and guides.",
  openGraph: {
    title: "Subscription Management Blog - Tips & Guides",
    description:
      "Learn how to save money on subscriptions, manage streaming services, and optimize your monthly budget with expert tips and guides.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
}

const blogPosts = [
  {
    title: "How to Save $100+ Per Month on Streaming Services",
    description: "Discover proven strategies to reduce your streaming costs without missing your favorite shows.",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["Streaming", "Money Saving", "Netflix"],
    slug: "save-money-streaming-services",
  },
  {
    title: "The Hidden Cost of Subscription Creep",
    description: "Why the average person pays for 5 unused subscriptions and how to avoid this costly trap.",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["Budget", "Psychology", "Money Management"],
    slug: "subscription-creep-hidden-costs",
  },
  {
    title: "Netflix vs Disney+ vs HBO Max: Which is Worth It in 2024?",
    description:
      "Compare the top streaming services by content, price, and value to find the best fit for your viewing habits.",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["Streaming", "Comparison", "Reviews"],
    slug: "streaming-services-comparison-2024",
  },
  {
    title: "Family Subscription Sharing: Legal Ways to Split Costs",
    description:
      "Learn the rules and best practices for sharing subscriptions with family members to save money legally.",
    date: "2024-01-01",
    readTime: "6 min read",
    tags: ["Family", "Sharing", "Legal"],
    slug: "family-subscription-sharing-guide",
  },
]

export default function BlogPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container max-w-md mx-auto p-4 space-y-6">
          <div className="text-center py-6">
            <h1 className="text-2xl font-bold mb-2 text-white">Subscription Management Blog</h1>
            <p className="text-purple-200">
              Expert tips, guides, and strategies to help you save money and optimize your subscriptions.
            </p>
          </div>

          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
              >
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg text-white">
                    <Link href={`/blog/${post.slug}`} className="hover:text-purple-300 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-slate-400">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{post.readTime}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-purple-400 hover:text-purple-300"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white">Streaming Services</h4>
                  <p className="text-sm text-slate-400">Netflix, Disney+, HBO Max guides</p>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white">Money Saving</h4>
                  <p className="text-sm text-slate-400">Tips to reduce monthly costs</p>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white">Budget Management</h4>
                  <p className="text-sm text-slate-400">Track and optimize spending</p>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <h4 className="font-medium text-white">Service Reviews</h4>
                  <p className="text-sm text-slate-400">Honest reviews and comparisons</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
