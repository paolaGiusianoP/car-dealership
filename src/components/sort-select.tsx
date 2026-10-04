'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const OPTIONS = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'year-desc', label: 'Año: más nuevo primero' },
  { value: 'mileage-asc', label: 'Km: menor primero' },
]

export function SortSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get('sort') ?? 'recent'

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'recent') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-theme-md border border-strong bg-card px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-theme outline-none focus:border-accent"
      aria-label="Ordenar por"
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}