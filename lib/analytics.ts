// Custom analytics tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // For Vercel Analytics, events are automatically tracked
  // But we can add custom event tracking here if needed

  if (typeof window !== "undefined") {
    // Track custom events (you can extend this later)
    console.log("Analytics Event:", eventName, properties)

    // If you add Google Analytics later, you can add gtag here:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, properties)
    // }
  }
}

// Specific tracking functions for your app
export const trackSubscriptionAdded = (subscriptionName: string, cost: number, category: string) => {
  trackEvent("subscription_added", {
    subscription_name: subscriptionName,
    monthly_cost: cost,
    category: category,
  })
}

export const trackSubscriptionRemoved = (subscriptionName: string, cost: number) => {
  trackEvent("subscription_removed", {
    subscription_name: subscriptionName,
    monthly_cost: cost,
  })
}

export const trackShowAdded = (showName: string, serviceName: string) => {
  trackEvent("show_added", {
    show_name: showName,
    service_name: serviceName,
  })
}

export const trackRecommendationViewed = (recommendationType: string, serviceName: string) => {
  trackEvent("recommendation_viewed", {
    recommendation_type: recommendationType,
    service_name: serviceName,
  })
}

export const trackFeatureUsed = (featureName: string) => {
  trackEvent("feature_used", {
    feature_name: featureName,
  })
}

export const trackPageView = (pageName: string) => {
  trackEvent("page_view", {
    page_name: pageName,
  })
}
