import { cars } from '@/data/cars'
import { CarCard } from '@/components/car-card'
import { HomeHero } from '@/components/home-hero'
import { Reveal } from '@/components/reveal'
import { FinancingCalculator } from '@/components/financing-calculator'
import { getUniqueBrands } from '@/lib/filter-cars'
import { siteConfig } from '@/config/site'

const BENEFITS = [
  { title: 'Stock seleccionado', description: 'Cada auto pasa una inspección de 120 puntos antes de entrar al salón.' },
  { title: 'Financiación a medida', description: 'Trabajamos con los principales bancos y financieras del país.' },
  { title: 'Test drive sin cargo', description: 'Agendá el día y la hora que quieras. Te lo llevamos a tu casa.' },
  { title: 'Garantía real', description: 'Todos nuestros autos certificados incluyen garantía de 12 meses.' },
]

export default function Home() {
  const featured = cars.filter((c) => c.featured).slice(0, 6)
  const brands = getUniqueBrands(cars)

  return (
    <>
      <HomeHero />

      <div aria-label="Marcas disponibles" className="overflow-hidden border-y border-on-ink bg-ink-2 py-4 text-on-ink">
        <div className="marquee flex w-max font-mono text-xs font-bold uppercase tracking-[0.3em]">
          {[0, 1].map((k) => (
            <div key={k} aria-hidden={k === 1 || undefined} className="flex shrink-0 items-center gap-8 pr-8">
              {brands.map((b) => (
                <span key={b} className="flex items-center gap-8">
                  <span>{b}</span>
                  <span className="text-accent-light">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Destacados */}
      <section id="catalogo" className="px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 flex items-end justify-between gap-4 border-b border-theme pb-6">
            <div>
              <p className="label-eyebrow">Stock disponible</p>
              <h2 className="font-heading mt-2 text-4xl font-bold text-theme sm:text-6xl">Destacados</h2>
            </div>
            <a href="/cars" className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent hover:underline">
              Ver todos →
            </a>
          </Reveal>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car, i) => (
              <Reveal key={car.id} delay={(i % 3) * 110}><CarCard car={car} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="bg-ink px-6 py-24 text-on-ink sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-light">Financiación</p>
            <h2 className="font-heading mt-3 text-4xl font-bold sm:text-6xl">Calculá tu cuota en 10 segundos.</h2>
            <p className="mt-5 max-w-md font-body leading-relaxed text-on-ink-muted">
              Movés los controles y ves cuánto pagarías por mes. Sin compromiso: cuando tengas la cuota que te cierra, seguimos por WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7"><FinancingCalculator /></Reveal>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="bg-elevated px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="label-eyebrow">Por qué InGen Motors</p>
            <h2 className="font-heading mt-2 max-w-2xl text-4xl font-bold text-theme sm:text-6xl">
              Comprar un auto no tiene por qué ser complicado.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="border-t-2 border-theme pt-6">
                  <span className="plate">0{i + 1}</span>
                  <h3 className="font-heading mt-4 text-xl font-bold text-theme">{item.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-ink-2 px-6 py-28 text-on-ink sm:px-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-5xl font-bold sm:text-7xl">
            ¿Listo para <em className="text-accent-light">dar el paso</em>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg text-on-ink-muted">
            Escribinos por WhatsApp y coordinamos una visita al showroom o un test drive.
          </p>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9">
            Agendar visita →
          </a>
        </Reveal>
      </section>
    </>
  )
}