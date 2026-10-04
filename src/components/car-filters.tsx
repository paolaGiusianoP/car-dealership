'use client'

import { useMemo, useState, useTransition, type ReactNode } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Car, CarFilters as Filters } from '@/types/car'
import { getUniqueBrands } from '@/lib/filter-cars'

const FUEL = [['Gasoline', 'Nafta'], ['Diesel', 'Diésel'], ['Hybrid', 'Híbrido'], ['Electric', 'Eléctrico']] as const
const CONDITION = [['New', 'Nuevo'], ['Certified', 'Certificado'], ['Used', 'Usado']] as const
const TRANSMISSION = [['Manual', 'Manual'], ['Automatic', 'Automática']] as const
const PRICES = [20000, 30000, 40000, 50000, 70000]

const LABELS: Record<string, Record<string, string>> = {
  fuel: { Gasoline: 'Nafta', Diesel: 'Diésel', Hybrid: 'Híbrido', Electric: 'Eléctrico' },
  condition: { New: 'Nuevo', Certified: 'Certificado', Used: 'Usado' },
  transmission: { Manual: 'Manual', Automatic: 'Automática' },
  maxPrice: { '20000': 'Hasta US$ 20.000', '30000': 'Hasta US$ 30.000', '40000': 'Hasta US$ 40.000', '50000': 'Hasta US$ 50.000', '70000': 'Hasta US$ 70.000' },
}

type Props = {
  cars: Car[]
  currentFilters: Filters
  resultCount: number
  totalCount: number
}

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-theme-full border px-3.5 py-1.5 font-body text-sm transition-all duration-200 ${
      active
        ? 'border-accent bg-accent text-accent-text'
        : 'border-strong text-muted hover:border-accent hover:text-accent'
    }`}
  >
    {children}
  </button>
)

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dim">{title}</p>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
)

export function CarFilters({ cars, currentFilters, resultCount, totalCount }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const [open, setOpen] = useState(false)
  const [pending, start] = useTransition()

  const brands = useMemo(() => getUniqueBrands(cars), [cars])
  const f = currentFilters

  const activeFilters = useMemo(() => {
    const items: { key: string; value: string; label: string }[] = []
    if (f.brand) items.push({ key: 'brand', value: f.brand, label: f.brand })
    if (f.fuel) items.push({ key: 'fuel', value: f.fuel, label: LABELS.fuel[f.fuel] ?? f.fuel })
    if (f.condition) items.push({ key: 'condition', value: f.condition, label: LABELS.condition[f.condition] ?? f.condition })
    if (f.transmission) items.push({ key: 'transmission', value: f.transmission, label: LABELS.transmission[f.transmission] ?? f.transmission })
    if (f.maxPrice !== undefined) items.push({ key: 'maxPrice', value: String(f.maxPrice), label: LABELS.maxPrice[String(f.maxPrice)] ?? `Hasta US$ ${f.maxPrice}` })
    return items
  }, [f])

  const count = activeFilters.length

  const push = (p: URLSearchParams) =>
    start(() => router.push(`${pathname}${p.toString() ? `?${p}` : ''}`, { scroll: false }))

  const toggle = (key: string, value: string | number, current: unknown) => {
    const p = new URLSearchParams(sp.toString())
    if (String(current) === String(value)) p.delete(key)
    else p.set(key, String(value))
    push(p)
  }

  const removeFilter = (key: string) => {
    const p = new URLSearchParams(sp.toString())
    p.delete(key)
    push(p)
  }

  const clearAll = () => push(new URLSearchParams())

  return (
    <aside
      aria-busy={pending}
      aria-label="Filtros de búsqueda"
      className={`transition-opacity ${pending ? 'opacity-60' : ''}`}
    >
      {/* Toggle en mobile */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="btn-secondary w-full lg:hidden"
      >
        Filtros{count > 0 && ` (${count})`} {open ? '↑' : '↓'}
      </button>

      <div className={`${open ? 'mt-6 block' : 'hidden'} lg:sticky lg:top-24 lg:mt-0 lg:block`}>
        {/* Header con contador */}
        <div className="border-b border-theme pb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-theme">Filtros</h2>
            {count > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">
            <span className="text-accent">{resultCount}</span>
            <span className="mx-1 text-dim">/</span>
            <span>{totalCount} autos</span>
          </p>
        </div>

        {/* Chips de filtros activos */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {activeFilters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => removeFilter(item.key)}
                className="group inline-flex items-center gap-1.5 rounded-theme-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-accent-text"
              >
                {item.label}
                <span aria-hidden="true" className="text-xs leading-none">×</span>
              </button>
            ))}
          </div>
        )}

        {/* Grupos */}
        <div className="mt-6 space-y-7">
          <Group title="Marca">
            {brands.map((b) => (
              <Chip key={b} active={f.brand === b} onClick={() => toggle('brand', b, f.brand)}>
                {b}
              </Chip>
            ))}
          </Group>

          <Group title="Combustible">
            {FUEL.map(([v, l]) => (
              <Chip key={v} active={f.fuel === v} onClick={() => toggle('fuel', v, f.fuel)}>
                {l}
              </Chip>
            ))}
          </Group>

          <Group title="Condición">
            {CONDITION.map(([v, l]) => (
              <Chip key={v} active={f.condition === v} onClick={() => toggle('condition', v, f.condition)}>
                {l}
              </Chip>
            ))}
          </Group>

          <Group title="Transmisión">
            {TRANSMISSION.map(([v, l]) => (
              <Chip key={v} active={f.transmission === v} onClick={() => toggle('transmission', v, f.transmission)}>
                {l}
              </Chip>
            ))}
          </Group>

          <Group title="Precio máximo">
            {PRICES.map((v) => (
              <Chip key={v} active={f.maxPrice === v} onClick={() => toggle('maxPrice', v, f.maxPrice)}>
                US$ {v / 1000} mil
              </Chip>
            ))}
          </Group>
        </div>

        {count > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-accent hover:underline lg:hidden"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </aside>
  )
}