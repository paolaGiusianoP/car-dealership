import type { Car, CarFilters } from '@/types/car'

export type SortOption =
  | 'recent'
  | 'price-asc'
  | 'price-desc'
  | 'year-desc'
  | 'mileage-asc'

export function filterCars(cars: Car[], filters: CarFilters): Car[] {
  return cars.filter((car) => {
    if (filters.brand && car.brand !== filters.brand) return false
    if (filters.fuel && car.fuel !== filters.fuel) return false
    if (filters.transmission && car.transmission !== filters.transmission)
      return false
    if (filters.condition && car.condition !== filters.condition) return false
    if (filters.minPrice !== undefined && car.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && car.price > filters.maxPrice) return false
    if (filters.minYear !== undefined && car.year < filters.minYear) return false
    if (filters.maxYear !== undefined && car.year > filters.maxYear) return false
    return true
  })
}

export function sortCars(cars: Car[], sort: SortOption): Car[] {
  const sorted = [...cars]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year)
    case 'mileage-asc':
      return sorted.sort((a, b) => a.mileage - b.mileage)
    case 'recent':
    default:
      return sorted
  }
}

export function getUniqueBrands(cars: Car[]): string[] {
  return Array.from(new Set(cars.map((c) => c.brand))).sort()
}

export function getPriceRange(cars: Car[]): { min: number; max: number } {
  const prices = cars.map((c) => c.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

export function getYearRange(cars: Car[]): { min: number; max: number } {
  const years = cars.map((c) => c.year)
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  }
}