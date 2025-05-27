"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, ExternalLink, BarChart3 } from "lucide-react"

export default function RevenueDashboard() {
  // This would connect to your analytics/payment systems
  const revenueData = {
    monthlyRevenue: 1247,
    affiliateEarnings: 892,
    premiumSubscriptions: 23,
    totalUsers: 1456,
    conversionRate: 1.6,
    topAffiliatePartner: "Honey",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Revenue Dashboard</h2>
        <p className="text-muted-foreground">Track your SmartSubSaver monetization performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affiliate Earnings</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.affiliateEarnings}</div>
            <p className="text-xs text-muted-foreground">71% of total revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pro Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueData.premiumSubscriptions}</div>
            <p className="text-xs text-muted-foreground">{revenueData.conversionRate}% conversion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active monthly users</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Affiliates</CardTitle>
            <CardDescription>Your highest earning affiliate partnerships</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">🍯</div>
                <span className="font-medium">Honey</span>
              </div>
              <div className="text-right">
                <div className="font-medium">$342</div>
                <div className="text-xs text-muted-foreground">28 conversions</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">💰</div>
                <span className="font-medium">Rakuten</span>
              </div>
              <div className="text-right">
                <div className="font-medium">$275</div>
                <div className="text-xs text-muted-foreground">11 conversions</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">📊</div>
                <span className="font-medium">YNAB</span>
              </div>
              <div className="text-right">
                <div className="font-medium">$156</div>
                <div className="text-xs text-muted-foreground">26 conversions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Goals</CardTitle>
            <CardDescription>Track progress toward your monthly targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Monthly Target</span>
                <span className="text-sm text-muted-foreground">$1,247 / $2,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pro Subscribers</span>
                <span className="text-sm text-muted-foreground">23 / 50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "46%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
