import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CountUp } from '@/components/count-up'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Nosotros · InGen Motors',
  description: 'Conocé la historia de InGen Motors, nuestra filosofía de trabajo y el equipo detrás del showroom en Montevideo.',
}

const STATS = [
  { to: 2020, suffix: '', label: 'Año de fundación' },
  { to: 30, suffix: '+', label: 'Autos vendidos por mes' },
  { to: 120, suffix: '', label: 'Puntos de inspección' },
  { to: 12, suffix: '', label: 'Meses de garantía' },
]

const VALUES = [
  { number: '01', title: 'Curaduría, no volumen', description: 'No tenemos 500 autos. Tenemos los correctos. Cada unidad pasa una inspección de 120 puntos antes de entrar al salón. Si no pasa, no se vende.' },
  { number: '02', title: 'Precio justo, siempre', description: 'Trabajamos con márgenes razonables y precios publicados sin "consultar". Sabemos lo que valen nuestros autos y lo mostramos con transparencia.' },
  { number: '03', title: 'Acompañamiento real', description: 'No te vendemos un auto y desaparecemos. Te acompañamos en el proceso de financiación, transferencia, seguro y service post-venta.' },
  { number: '04', title: 'Garantía sin letra chica', description: 'Todos nuestros autos certificados incluyen 12 meses de garantía. Sin asteriscos, sin condiciones ocultas.' },
]

const TEAM = [
  { name: 'Martín Rodríguez', role: 'Fundador & Director', bio: '20 años en el rubro automotor. Obsesionado con el detalle y con encontrar el auto correcto para cada persona.' },
  { name: 'Lucía Fernández', role: 'Asesora Comercial', bio: 'Especialista en financiación y post-venta. La persona que te va a acompañar desde la primera consulta hasta la entrega.' },
  { name: 'Diego Costa', role: 'Jefe de Taller', bio: 'Ex mecánico de concesionario oficial. Responsable de las inspecciones de 120 puntos que definen qué autos entran al salón.' },
]

export default function AboutPage() {
  return (
    <div className="bg-theme">
      <PageHero eyebrow="Sobre nosotros" title={<>Somos una automotora <span className="italic text-accent">que no se parece</span> a una automotora.</>}>
        InGen Motors nació en 2020 con una idea simple: comprar un auto usado no tiene que ser una experiencia estresante. Sin vueltas, sin presión, sin letra chica.
      </PageHero>

      {/* Números */}
      <section aria-label="InGen Motors en números" className="border-y border-on-ink bg-ink-2 px-6 py-10 text-on-ink sm:px-12">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="font-heading text-5xl font-bold text-accent-light sm:text-6xl"><CountUp to={s.to} suffix={s.suffix} /></dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-ink-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Historia */}
      <section className="px-6 py-24 sm:px-12">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="label-eyebrow">Nuestra historia</p>
            <h2 className="font-heading mt-3 text-4xl font-bold leading-tight text-theme sm:text-5xl">Empezamos con tres autos. Hoy tenemos un showroom.</h2>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-muted">
              <p>En 2020, Martín Rodríguez dejó su trabajo en un concesionario oficial para arrancar algo propio. La idea era simple: comprar autos usados en buen estado, arreglarlos, y venderlos con precios honestos y garantía real.</p>
              <p>Arrancó con tres autos en un garage prestado en Punta Carretas. A los seis meses ya tenía lista de espera. A los dos años, alquiló el showroom actual en Av. Roosevelt. Hoy InGen Motors vende más de 30 autos por mes, todos con garantía de 12 meses.</p>
              <p>Lo que no cambió es la filosofía: cada auto que entra al showroom pasa por una inspección de 120 puntos. Si no está impecable, no se vende. Así de simple.</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="slats relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-theme-lg border border-on-ink">
              <span className="plate">Foto del showroom</span>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 bg-[#0d0b09]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="border-t border-theme bg-elevated px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="label-eyebrow">Cómo trabajamos</p>
            <h2 className="font-heading mt-3 text-4xl font-bold leading-tight text-theme sm:text-5xl">Cuatro cosas que no negociamos.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.number} delay={(i % 2) * 120}>
                <div className="border-t-2 border-theme pt-6">
                  <span className="plate">{v.number}</span>
                  <h3 className="font-heading mt-4 text-2xl font-bold text-theme">{v.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="label-eyebrow">El equipo</p>
            <h2 className="font-heading mt-3 text-4xl font-bold leading-tight text-theme sm:text-5xl">Personas, no vendedores.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((p, i) => (
              <Reveal key={p.name} delay={i * 110}>
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-theme-lg border border-theme bg-card">
                  <p className="font-heading text-7xl font-bold text-accent/40">{p.name.split(' ').map((n) => n[0]).join('')}</p>
                </div>
                <h3 className="font-heading mt-5 text-xl font-bold text-theme">{p.name}</h3>
                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-accent">{p.role}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">{p.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2 px-6 py-24 text-on-ink sm:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-bold leading-tight sm:text-6xl">¿Listo para <em className="text-accent-light">conocernos</em>?</h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-on-ink-muted">Pasá por el showroom, agendá un test drive o escribinos por WhatsApp. Te esperamos con un café.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/cars" className="btn-primary">Ver el catálogo →</Link>
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost-ink">Escribinos por WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
