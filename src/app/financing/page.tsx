import type { Metadata } from 'next'
import Link from 'next/link'
import { FinancingCalculator } from '@/components/financing-calculator'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Financiación · InGen Motors',
  description: 'Calculá tu cuota mensual y conocé todas las opciones de financiación que ofrecemos en InGen Motors.',
}

const STEPS = [
  { number: '01', title: 'Elegí tu auto', description: 'Mirá el catálogo, seleccioná el auto que te guste y consultá por WhatsApp.' },
  { number: '02', title: 'Hacé la solicitud', description: 'Te enviamos el formulario del banco. Lo completás online en menos de 10 minutos.' },
  { number: '03', title: 'Aprobación en 48h', description: 'El banco analiza tu perfil y te da una respuesta en un máximo de 2 días hábiles.' },
  { number: '04', title: 'Firmás y te lo llevás', description: 'Firmás la documentación, transferimos el auto y te lo entregamos en el showroom.' },
]

const BANKS = [
  { name: 'Banco República', rate: '2.8% - 3.5%', terms: '12-48 meses' },
  { name: 'Itaú', rate: '3.0% - 3.8%', terms: '12-60 meses' },
  { name: 'Santander', rate: '3.2% - 4.0%', terms: '12-48 meses' },
  { name: 'BBVA', rate: '3.5% - 4.2%', terms: '12-36 meses' },
]

const PERKS = ['Sin gastos de otorgamiento', 'Sin penalización por cancelación anticipada', 'Se puede financiar hasta el 100% del valor', 'Aprobación en 48 horas']

export default function FinancingPage() {
  return (
    <div className="bg-theme">
      <PageHero eyebrow="Financiación" title={<>Tu próximo auto, <span className="italic text-accent">en cuotas.</span></>}>
        Trabajamos con los principales bancos del país para darte las mejores condiciones. Calculá tu cuota estimada y después lo ajustamos juntos según tu perfil crediticio.
      </PageHero>

      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-24">
            <p className="label-eyebrow">Simulador</p>
            <h2 className="font-heading mt-3 text-4xl font-bold leading-tight text-theme">Calculá tu cuota</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-muted">
              Movés los valores y ves cómo cambia la cuota en tiempo real. No necesitás dejar datos: es solo para que tengas una idea.
            </p>
            <ul className="mt-8 space-y-4 border-t border-theme pt-6">
              {PERKS.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}><FinancingCalculator /></Reveal>
        </div>
      </section>

      <section className="border-t border-theme bg-elevated px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="label-eyebrow">El proceso</p>
            <h2 className="font-heading mt-3 text-4xl font-bold leading-tight text-theme sm:text-5xl">Cuatro pasos. Cero estrés.</h2>
          </Reveal>
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div aria-hidden="true" className="absolute left-0 right-0 top-3 hidden border-t-2 border-dashed border-strong lg:block" />
            {STEPS.map((s, i) => (
              <Reveal key={s.number} delay={i * 120}>
                <li className="relative">
                  <span className="plate relative bg-white">{s.number}</span>
                  <h3 className="font-heading mt-5 text-xl font-bold text-theme">{s.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted">{s.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="label-eyebrow">Nuestros aliados</p>
            <h2 className="font-heading mt-3 text-4xl font-bold leading-tight text-theme sm:text-5xl">Trabajamos con los principales bancos.</h2>
            <p className="mt-4 max-w-2xl font-body text-base text-muted">Tasas estimadas según perfil crediticio. Consultanos para el detalle actualizado de cada banco.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 overflow-x-auto rounded-theme-lg border border-theme bg-card">
              <table className="w-full min-w-[480px]">
                <thead className="border-b border-theme bg-elevated">
                  <tr>{['Banco', 'Tasa mensual', 'Plazo'].map((h) => (
                    <th key={h} scope="col" className="px-6 py-4 text-left font-mono text-[10px] font-bold uppercase tracking-widest text-dim">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {BANKS.map((b) => (
                    <tr key={b.name} className="border-b border-theme transition-colors last:border-b-0 hover:bg-accent/5">
                      <td className="font-heading px-6 py-4 text-base font-semibold text-theme">{b.name}</td>
                      <td className="px-6 py-4 font-mono text-sm text-muted">{b.rate}</td>
                      <td className="px-6 py-4 font-mono text-sm text-muted">{b.terms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-4 font-body text-xs text-dim">* Las tasas son estimativas y están sujetas a cambios sin previo aviso. La aprobación final depende del análisis crediticio del banco.</p>
        </div>
      </section>

      <section className="bg-ink-2 px-6 py-24 text-on-ink sm:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-bold leading-tight sm:text-6xl">¿Preaprobamos tu crédito?</h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-on-ink-muted">
            Mandanos tus datos y te ayudamos a hacer la simulación formal con el banco que más te convenga. Sin compromiso.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">Consultar por WhatsApp →</a>
            <Link href="/cars" className="btn-ghost-ink">Ver el catálogo</Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
