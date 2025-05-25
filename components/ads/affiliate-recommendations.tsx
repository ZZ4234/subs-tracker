"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star } from "lucide-react"

interface AffiliateProduct {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  rating: number
  imageUrl: string
  affiliateUrl: string
  category: string
  features: string[]
}

const affiliateProducts: AffiliateProduct[] = [
  {
    id: "1",
    name: "Honey Browser Extension",
    description: "Automatically find and apply coupon codes at checkout to save money on your subscriptions",
    price: "Free",
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=80&width=80&query=Honey logo",
    affiliateUrl: "https://honey.com",
    category: "Money Saving",
    features: ["Auto-apply coupons", "Price tracking", "Cashback rewards"],
  },
  {
    id: "2",
    name: "Rakuten Cashback",
    description: "Earn cashback on purchases from thousands of stores including subscription services",
    price: "Free + Cashback",
    rating: 4.6,
    imageUrl: "/placeholder.svg?height=80&width=80&query=Rakuten logo",
    affiliateUrl: "https://rakuten.com",
    category: "Cashback",
    features: ["Up to 10% cashback", "Quarterly payments", "Browser extension"],
  },
  {
    id: "3",
    name: "YNAB (You Need A Budget)",
    description: "Budgeting app that helps you track and manage all your subscriptions and expenses",
    price: "$14.99/mo",
    originalPrice: "$16.99/mo",
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=80&width=80&query=YNAB budget app logo",
    affiliateUrl: "https://ynab.com",
    category: "Budgeting",
    features: ["Subscription tracking", "Goal setting", "Debt payoff tools"],
  },
]

export default function AffiliateRecommendations() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-1">Recommended Tools</h2>
        <p className="text-sm text-muted-foreground">Save even more money with these helpful tools</p>
      </div>

      <div className="grid gap-4">
        {affiliateProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{product.price}</div>
                  {product.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">{product.originalPrice}</div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm mb-3">{product.description}</CardDescription>
              <div className="flex flex-wrap gap-1 mb-3">
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              <Button asChild size="sm" className="w-full">
                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                  Learn More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          * We may earn a commission from purchases made through these links at no extra cost to you
        </p>
      </div>
    </div>
  )
}
