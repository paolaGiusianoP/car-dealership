import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { cars } from '@/data/cars'
import { CarGallery } from '@/components/car-gallery'
import { CarSpecs } from '@/components/car-specs'
import { CarCard } from '@/components/car-card'
import { WhatsAppCta } from '@/components/whatsapp-cta'
import { FinancingCalculator } from '@/components/financing-calculator'
import { Reveal } from '@/components/reveal'
import { monthlyPayment, usd } from '@/lib/finance'
import { siteConfig } from '@/config/site'

type PageProps = { params: Promise<{ slug: string }> }

const CONDITION = { New: 'Nuevo', Certified: 'Certificado', Used: 'Usado' } as const
const FUEL = { Gasoline: 'Nafta', Diesel: 'Diésel', Hybrid: 'Híbrido', Electric: 'Eléctrico' } as const

export async function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const car = cars.find((c) => c.slug === slug)
  if (!car) return { title: 'Auto no encontrado · InGen Motors' }
  const title = `${car.brand} ${car.model} ${car.year} · InGen Motors`
  const description = `${car.brand} ${car.model} ${car.version} ${car.year} · ${car.mileage === 0 ? '0 km' : `${car.mileage.toLocaleString('es-UY')} km`} · ${usd(car.price)}. ${car.description}`
  return { title, description, openGraph: { title, description, images: car.images[0] ? [car.images[0]] : [] } }
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params
  const car = cars.find((c) => c.slug === slug)
  if (!car) notFound()

  const price = `${car.currency === 'USD' ? 'US$' : '$U'} ${new Intl.NumberFormat('es-UY', { maximumFractionDigits: 0 }).format(car.price)}`
  const name = `${car.brand} ${car.model} ${car.version} (${car.year})`
  const fromMonthly = usd(monthlyPayment(car.price * 0.7, 0.035, 36)) // 30 % de anticipo, 36 cuotas

  const similar = cars
    .filter((c) => c.id !== car.id && (c.brand === car.brand || Math.abs(c.price - car.price) < car.price * 0.2))
    .slice(0, 3)

  const testDrive = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola! Quiero agendar un test drive del ${name}.`)}`
  const askUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola! Me interesa el ${name}. ¿Está disponible?`)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.brand} ${car.model} ${car.version}`,
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    color: car.color,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    image: car.images,
    offers: { '@type': 'Offer', price: car.price, priceCurrency: car.currency, availability: 'https://schema.org/InStock' },
  }

  return (
    <div className="bg-theme pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-theme px-6 py-4 sm:px-12">
        <nav aria-label="Ruta" className="mx-auto flex max-w-7xl items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-dim">
          <Link href="/" className="hover:text-accent">Inicio</Link><span>/</span>
          <Link href="/cars" className="hover:text-accent">Catálogo</Link><span>/</span>
          <span className="text-theme">{car.brand} {car.model}</span>
        </nav>
      </div>

      <section className="px-6 py-12 sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <CarGallery images={car.images} alt={`${car.brand} ${car.model}`} />

            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-theme">Descripción</h2>
              <p className="mt-4 font-body text-base leading-relaxed text-muted">{car.description}</p>
            </Reveal>

            {car.features.length > 0 && (
              <Reveal>
                <h2 className="font-heading text-2xl font-bold text-theme">Equipamiento</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <li key={f} className="rounded-theme-full border border-strong bg-card px-4 py-2 font-body text-sm text-muted">{f}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <div>
            <div className="sticky top-24 space-y-6 rounded-theme-lg border border-theme bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="plate">{CONDITION[car.condition]}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-dim">{car.year} · {FUEL[car.fuel]}</span>
              </div>

              <div>
                <h1 className="font-heading text-3xl font-bold leading-tight text-theme">{car.brand} {car.model}</h1>
                <p className="mt-1 font-body text-base text-muted">{car.version}</p>
              </div>

              <div className="border-y border-theme py-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Precio</p>
                <p className="font-heading mt-1 text-4xl font-bold text-accent">{price}</p>
                <a href="#financiar" className="mt-2 inline-block font-body text-xs text-muted underline-offset-4 hover:text-accent hover:underline">
                  Desde {fromMonthly} por mes · simular cuotas →
                </a>
              </div>

              <CarSpecs car={car} />

              <div className="space-y-3 pt-2">
                <WhatsAppCta car={car} variant="primary" />
                <a href={testDrive} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">Agendar test drive</a>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="block text-center font-mono text-[11px] font-bold uppercase tracking-widest text-muted hover:text-accent">
                  Llamar · {siteConfig.phone}
                </a>
              </div>

              <div className="border-t border-theme pt-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Showroom</p>
                <p className="mt-1 font-body text-xs text-muted">{siteConfig.address}</p>
                <p className="mt-1 font-body text-xs text-muted">{siteConfig.hours.weekdays}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financiar este auto */}
      <section id="financiar" className="bg-ink px-6 py-20 text-on-ink sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-light">Financiación</p>
            <h2 className="font-heading mt-3 text-4xl font-bold sm:text-5xl">Simulá la cuota de este {car.brand} {car.model}.</h2>
            <p className="mt-5 max-w-md font-body leading-relaxed text-on-ink-muted">
              Elegí el anticipo y la cantidad de cuotas. Cuando tengas una cuota que te cierre, seguimos por WhatsApp con el número cargado.
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <FinancingCalculator initialPrice={car.price} lockPrice carName={name} />
          </Reveal>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="px-6 py-16 sm:px-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-heading text-3xl font-bold text-theme">Autos similares</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((c, i) => <Reveal key={c.id} delay={i * 100}><CarCard car={c} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      {/* Barra fija en celular */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-on-ink bg-ink px-5 py-3 text-on-ink lg:hidden">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-on-ink-muted">{car.brand} {car.model}</p>
          <p className="font-heading text-xl font-bold">{price}</p>
        </div>
        <a href={askUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Consultar</a>
      </div>
    </div>
  )
}
