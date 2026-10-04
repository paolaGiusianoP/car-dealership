'use client'

import { useState, type FormEvent } from 'react'
import { useDoorNavigate } from './door-provider'

const PRICE_OPTIONS = [20000, 30000, 40000, 50000, 70000]

export function HomeSearchBar({ brands }: { brands: string[] }) {
  const go = useDoorNavigate()
  const [brand, setBrand] = useState('')
  const [fuel, setFuel] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const search = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (brand) params.set('brand', brand)
    if (fuel) params.set('fuel', fuel)
    if (maxPrice) params.set('maxPrice', maxPrice)
    go(`/cars${params.toString() ? `?${params}` : ''}`)
  }

  const field =
    'w-full appearance-none rounded-theme-md border border-theme bg-card px-4 py-3 ' +
    'font-body text-sm text-theme outline-none transition-colors ' +
    'hover:border-strong focus:border-accent'

  const fieldLabel =
    'mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-dim'

  return (
    <section
      id="buscador"
      className="relative z-10 border-b border-theme bg-elevated px-6 py-12 sm:px-12 sm:py-14"
    >
      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-eyebrow">Buscador rápido</p>
            <h2 className="font-heading mt-2 text-2xl font-bold text-theme sm:text-3xl">
              Encontrá tu auto en segundos
            </h2>
          </div>
          <a
            href="/cars"
            className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent hover:underline"
          >
            Ver todo el catálogo →
          </a>
        </div>

        {/* Form */}
        <form
          onSubmit={search}
          className="grid gap-3 rounded-theme-lg border border-theme bg-card p-3 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        >
          {/* Marca */}
          <label className="block">
            <span className={fieldLabel}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
              Marca
            </span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className={field}>
              <option value="">Todas las marcas</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>

          {/* Combustible */}
          <label className="block">
            <span className={fieldLabel}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M3 22h12V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v18Z" />
                <path d="M15 10h2a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8l-3-3" />
              </svg>
              Combustible
            </span>
            <select value={fuel} onChange={(e) => setFuel(e.target.value)} className={field}>
              <option value="">Todos</option>
              <option value="Gasoline">Nafta</option>
              <option value="Diesel">Diésel</option>
              <option value="Hybrid">Híbrido</option>
              <option value="Electric">Eléctrico</option>
            </select>
          </label>

          {/* Precio máximo */}
          <label className="block">
            <span className={fieldLabel}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Precio máximo
            </span>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={field}>
              <option value="">Sin límite</option>
              {PRICE_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  Hasta US$ {v.toLocaleString('es-UY')}
                </option>
              ))}
            </select>
          </label>

          {/* Botón */}
          <button
            type="submit"
            className="group inline-flex h-[46px] items-center justify-center gap-2 rounded-theme-md bg-accent px-7 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent-text transition-all duration-300 hover:bg-accent-hover hover:gap-3 sm:col-span-2 lg:col-span-1"
          >
            Buscar
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        </form>
      </div>
    </section>
  )
}