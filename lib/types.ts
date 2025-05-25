export interface Category {
  id: string
  name: string
  icon: string
  color: string
  isCustom?: boolean
}

export interface Service {
  id: string
  name: string
  monthlyCost: number
  logoUrl?: string
  categoryId: string
  description?: string
}

export interface Show {
  id: string
  title: string
  serviceId: string
}

export interface PopularService {
  name: string
  categoryId: string
  monthlyCost: number
  description?: string
  logoUrl?: string
  availability?: string[] // Array of country codes where service is available
}
