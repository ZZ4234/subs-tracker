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
      <div className="space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold mb-2">Subscription Management Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert tips, guides, and strategies to help you save money and optimize your subscriptions.
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-base">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                    Read more →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <h4 className="font-medium">Streaming Services</h4>
                <p className="text-sm text-muted-foreground">Netflix, Disney+, HBO Max guides</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium">Money Saving</h4>
                <p className="text-sm text-muted-foreground">Tips to reduce monthly costs</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium">Budget Management</h4>
                <p className="text-sm text-muted-foreground">Track and optimize spending</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium">Service Reviews</h4>
                <p className="text-sm text-muted-foreground">Honest reviews and comparisons</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
