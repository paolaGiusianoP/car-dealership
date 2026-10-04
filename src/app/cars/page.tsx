import type { Metadata } from 'next'
import Link from 'next/link'
import { cars } from '@/data/cars'
import { CarCard } from '@/components/car-card'
import { CarFilters } from '@/components/car-filters'
import { SortSelect } from '@/components/sort-select'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { filterCars, sortCars, type SortOption } from '@/lib/filter-cars'
import { siteConfig } from '@/config/site'
import type { CarFilters as CarFiltersType, Condition, Fuel, Transmission } from '@/types/car'

export const metadata: Metadata = {
  title: 'Catálogo · InGen Motors',
  description: 'Autos nuevos, usados y certificados en Montevideo. Filtrá por marca, combustible, transmisión o precio.',
}

type PageProps = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function CarsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const str = (k: string) => (typeof params[k] === 'string' ? (params[k] as string) : undefined)

  const filters: CarFiltersType = {
    brand: str('brand'),
    fuel: str('fuel') as Fuel | undefined,
    transmission: str('transmission') as Transmission | undefined,
    condition: str('condition') as Condition | undefined,
    maxPrice: str('maxPrice') ? Number(str('maxPrice')) : undefined,
  }
  const sort = (str('sort') as SortOption | undefined) ?? 'recent'
  const sorted = sortCars(filterCars(cars, filters), sort)

  return (
    <>
      <PageHero
        eyebrow="Catálogo completo"
        title="Nuestro stock"
        meta={
          <div className="text-right">
            <p className="font-heading text-4xl font-bold text-accent sm:text-5xl">
              {cars.length}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
              autos disponibles
            </p>
          </div>
        }
      >
        Filtrá por marca, combustible o precio para encontrar el tuyo.
      </PageHero>

      <section className="px-6 py-12 sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[270px_1fr]">
        <CarFilters
          cars={cars}
          currentFilters={filters}
          resultCount={sorted.length}
          totalCount={cars.length}
        />
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-theme pb-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted" aria-live="polite">
                {sorted.length} {sorted.length === 1 ? 'resultado' : 'resultados'}
              </p>
              <SortSelect />
            </div>

            {sorted.length > 0 ? (
              <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {sorted.map((car, i) => (
                  <Reveal key={car.id} delay={(i % 3) * 90}><CarCard car={car} /></Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-theme-lg border border-dashed border-strong px-6 py-20 text-center">
                <p className="font-heading text-2xl font-bold text-theme">No encontramos autos con esos filtros</p>
                <p className="mx-auto mt-3 max-w-md font-body text-sm text-muted">
                  Probá quitar algún filtro, o contanos qué buscás y te avisamos cuando entre.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link href="/cars" className="btn-secondary">Limpiar filtros</Link>
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola! No encontré el auto que busco en la web. ¿Me avisan cuando entre algo similar?')}`}
                    target="_blank" rel="noopener noreferrer" className="btn-primary">Avisame por WhatsApp →</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
