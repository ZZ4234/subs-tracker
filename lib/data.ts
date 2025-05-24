import type { Category, PopularService } from "./types"
import {
  Tv,
  Dumbbell,
  Music,
  ShoppingBag,
  Smartphone,
  Cloud,
  Newspaper,
  Coffee,
  Utensils,
  BookOpen,
  Tag,
} from "lucide-react"

export const defaultCategories: Category[] = [
  {
    id: "streaming",
    name: "Streaming",
    icon: "Tv",
    color: "bg-purple-500",
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: "Dumbbell",
    color: "bg-green-500",
  },
  {
    id: "music",
    name: "Music",
    icon: "Music",
    color: "bg-pink-500",
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "ShoppingBag",
    color: "bg-blue-500",
  },
  {
    id: "apps",
    name: "Apps",
    icon: "Smartphone",
    color: "bg-orange-500",
  },
  {
    id: "cloud",
    name: "Cloud Storage",
    icon: "Cloud",
    color: "bg-sky-500",
  },
  {
    id: "news",
    name: "News",
    icon: "Newspaper",
    color: "bg-red-500",
  },
  {
    id: "food",
    name: "Food & Drink",
    icon: "Coffee",
    color: "bg-amber-500",
  },
  {
    id: "dining",
    name: "Dining",
    icon: "Utensils",
    color: "bg-emerald-500",
  },
  {
    id: "education",
    name: "Education",
    icon: "BookOpen",
    color: "bg-indigo-500",
  },
  {
    id: "other",
    name: "Other",
    icon: "Tag",
    color: "bg-gray-500",
  },
]

export const popularServices: PopularService[] = [
  {
    name: "Netflix",
    categoryId: "streaming",
    monthlyCost: 15.49,
    description: "Standard Plan (HD)",
    logoUrl: "/netflix-inspired-logo.png",
  },
  {
    name: "Disney+",
    categoryId: "streaming",
    monthlyCost: 7.99,
    description: "Basic Plan",
    logoUrl: "/disney-plus-logo.png",
  },
  {
    name: "Hulu",
    categoryId: "streaming",
    monthlyCost: 7.99,
    description: "With Ads",
    logoUrl: "/hulu-logo.png",
  },
  {
    name: "HBO Max",
    categoryId: "streaming",
    monthlyCost: 15.99,
    description: "Ad-Free",
    logoUrl: "/hbo-max-logo.png",
  },
  {
    name: "Amazon Prime Video",
    categoryId: "streaming",
    monthlyCost: 8.99,
    description: "Video only",
    logoUrl: "/amazon-prime-video-logo.png",
  },
  {
    name: "Apple TV+",
    categoryId: "streaming",
    monthlyCost: 6.99,
    description: "Standard Plan",
    logoUrl: "/apple-tv-plus-logo.png",
  },
  {
    name: "Paramount+",
    categoryId: "streaming",
    monthlyCost: 5.99,
    description: "Essential Plan",
    logoUrl: "/paramount-plus-logo.png",
  },
  {
    name: "Peacock",
    categoryId: "streaming",
    monthlyCost: 5.99,
    description: "Premium Plan",
    logoUrl: "/peacock-logo.png",
  },
  {
    name: "Spotify",
    categoryId: "music",
    monthlyCost: 9.99,
    description: "Individual Plan",
  },
  {
    name: "Apple Music",
    categoryId: "music",
    monthlyCost: 10.99,
    description: "Individual Plan",
  },
  {
    name: "YouTube Premium",
    categoryId: "music",
    monthlyCost: 11.99,
    description: "Individual Plan",
  },
  {
    name: "Planet Fitness",
    categoryId: "fitness",
    monthlyCost: 10.0,
    description: "Basic Membership",
  },
  {
    name: "LA Fitness",
    categoryId: "fitness",
    monthlyCost: 29.99,
    description: "Single Club Access",
  },
  {
    name: "Peloton",
    categoryId: "fitness",
    monthlyCost: 12.99,
    description: "App Membership",
  },
  {
    name: "Amazon Prime",
    categoryId: "shopping",
    monthlyCost: 14.99,
    description: "Monthly Membership",
  },
  {
    name: "Instacart+",
    categoryId: "shopping",
    monthlyCost: 9.99,
    description: "Monthly Membership",
  },
  {
    name: "iCloud+",
    categoryId: "cloud",
    monthlyCost: 2.99,
    description: "50GB Storage",
  },
  {
    name: "Google One",
    categoryId: "cloud",
    monthlyCost: 1.99,
    description: "100GB Storage",
  },
  {
    name: "Dropbox",
    categoryId: "cloud",
    monthlyCost: 11.99,
    description: "Plus Plan",
  },
  {
    name: "New York Times",
    categoryId: "news",
    monthlyCost: 4.25,
    description: "Basic Digital Access",
  },
  {
    name: "Washington Post",
    categoryId: "news",
    monthlyCost: 4.0,
    description: "Digital Access",
  },
  {
    name: "ChatGPT Plus",
    categoryId: "apps",
    monthlyCost: 20.0,
    description: "Premium Access",
  },
  {
    name: "Adobe Creative Cloud",
    categoryId: "apps",
    monthlyCost: 54.99,
    description: "All Apps Plan",
  },
  {
    name: "Microsoft 365",
    categoryId: "apps",
    monthlyCost: 6.99,
    description: "Personal Plan",
  },
]

export function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case "Tv":
      return Tv
    case "Dumbbell":
      return Dumbbell
    case "Music":
      return Music
    case "ShoppingBag":
      return ShoppingBag
    case "Smartphone":
      return Smartphone
    case "Cloud":
      return Cloud
    case "Newspaper":
      return Newspaper
    case "Coffee":
      return Coffee
    case "Utensils":
      return Utensils
    case "BookOpen":
      return BookOpen
    case "Tag":
    default:
      return Tag
  }
}
