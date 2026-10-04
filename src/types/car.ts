export type Fuel = 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric'
export type Transmission = 'Manual' | 'Automatic'
export type Condition = 'New' | 'Used' | 'Certified'

export type Car = {
  id: string
  slug: string
  brand: string
  model: string
  version: string
  year: number
  mileage: number
  price: number
  currency: 'USD' | 'UYU'
  fuel: Fuel
  transmission: Transmission
  condition: Condition
  color: string
  doors: number
  description: string
  featured: boolean
  images: string[]
  features: string[]
}

export type CarFilters = {
  brand?: string
  fuel?: Fuel
  transmission?: Transmission
  condition?: Condition
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
}