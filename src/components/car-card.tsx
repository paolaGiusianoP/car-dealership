import type { Car } from '@/types/car'
import Image from 'next/image'
import Link from 'next/link'
import { paintColor } from '@/lib/paint'

const CONDITION = { New: 'Nuevo', Certified: 'Certificado', Used: 'Usado' } as const
const FUEL = { Gasoline: 'Nafta', Diesel: 'Diésel', Hybrid: 'Híbrido', Electric: 'Eléctrico' } as const
const TRANSMISSION = { Manual: 'Manual', Automatic: 'Automática' } as const

export function CarCard({ car }: { car: Car }) {
  const price = `${car.currency === 'USD' ? 'US$' : '$U'} ${new Intl.NumberFormat('es-UY', { maximumFractionDigits: 0 }).format(car.price)}`
  const km = car.mileage === 0 ? '0 km' : `${new Intl.NumberFormat('es-UY').format(car.mileage)} km`

  return (
    <Link
      href={`/cars/${car.slug}`}
      className="group relative block overflow-hidden rounded-theme-lg border border-theme bg-card shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-card-hover"
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <Image
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
        />

        {/* Gradiente que se intensifica en hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/85"
        />

        {/* Plate de condición */}
        <span className="plate absolute left-3 top-3">{CONDITION[car.condition]}</span>

        {/* Badge destacado */}
        {car.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-theme-sm border border-accent/40 bg-ink/85 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-accent-light backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Destacado
          </span>
        )}

        {/* Precio con chip de fondo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <p className="rounded-theme-md bg-ink/70 px-3 py-1.5 font-heading text-2xl font-bold leading-none text-white backdrop-blur-sm">
            {price}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
          {car.year}
        </p>
        <h3 className="font-heading mt-1 text-xl font-bold leading-tight text-theme transition-colors duration-300 group-hover:text-accent">
          {car.brand} {car.model}
        </h3>
        <p className="mt-0.5 font-body text-sm text-muted">{car.version}</p>

        {/* Color */}
        <p className="mt-3 flex items-center gap-2 font-body text-xs text-muted">
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full border border-black/20"
            style={{ background: paintColor(car.color) }}
          />
          {car.color}
        </p>

        {/* Specs */}
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-theme pt-4 text-center">
          {[
            ['Km', km],
            ['Combustible', FUEL[car.fuel]],
            ['Caja', TRANSMISSION[car.transmission]],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[9px] uppercase tracking-widest text-dim">{k}</dt>
              <dd className="mt-0.5 font-body text-xs font-semibold text-theme">{v}</dd>
            </div>
          ))}
        </dl>

        {/* CTA */}
        <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
          Ver ficha
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </div>

      {/* Barra inferior de acento en hover — el detalle "plate" */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
      />
    </Link>
  )
}