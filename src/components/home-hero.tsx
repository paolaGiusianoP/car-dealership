'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { siteConfig } from '@/config/site'
import { CountUp } from './count-up'

const HEADLIGHT = { x: '52%', y: '60%' }

const STREAKS = [
  { top: '24%', t: '5.5s', d: '0s', o: 0.35 },
  { top: '38%', t: '4.2s', d: '1.4s', o: 0.5 },
  { top: '57%', t: '6.5s', d: '0.6s', o: 0.3 },
  { top: '72%', t: '4.8s', d: '2.2s', o: 0.45 },
]

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const on = () => setReady(true)
    if (document.documentElement.dataset.motorsReady === '1') on()
    window.addEventListener('motors:ready', on)
    const t = setTimeout(on, 7000)
    return () => { window.removeEventListener('motors:ready', on); clearTimeout(t) }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      el.style.setProperty('--p', (total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0).toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    const onMove = (e: PointerEvent) => {
      el.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
      el.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('pointermove', onMove) }
  }, [])

  const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

  return (
    <section
      ref={ref}
      data-ready={ready}
      className="relative h-[240svh] bg-ink text-on-ink"
      style={{ '--ox': HEADLIGHT.x, '--oy': HEADLIGHT.y } as CSSProperties}
    >
      <div className="sticky top-0 isolate h-svh overflow-hidden">
        <div className="hero-photo absolute inset-0 -z-10">
          <img src={siteConfig.heroImage} alt="" className="h-full w-full object-cover" />
          <span className="headlight" aria-hidden="true" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-3/4 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />

        {/* Líneas de velocidad */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {STREAKS.map((s, i) => (
            <span key={i} className="streak" style={{ top: s.top, '--t': s.t, '--d2': s.d, '--o': s.o } as CSSProperties} />
          ))}
        </div>

        <div className="hero-copy relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-12">
          <div className="rise flex flex-wrap items-center gap-3" style={d(100)}>
            <span className="plate">Showroom</span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-white/80">Autos nuevos y usados · Montevideo</span>
          </div>

          <h1 className="font-heading mt-6 font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(2.1rem, 7vw, 6.5rem)' }}>
            <span className="rise block" style={d(250)}>Elegí tu</span>
            <span className="rise block" style={d(400)}>próximo <span className="text-accent-light">auto.</span></span>
          </h1>

          <p className="rise mt-6 max-w-md font-body text-lg leading-relaxed text-white/75" style={d(560)}>
            Stock seleccionado, financiación a medida y test drive sin compromiso.
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3" style={d(700)}>
            <Link href="/cars" className="btn-primary">Ver catálogo →</Link>
            <Link href="/financing" className="btn-ghost-ink">Calcular mi cuota</Link>
          </div>

          <dl className="rise mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70" style={d(850)}>
            <div className="flex items-baseline gap-2"><dt className="sr-only">Inspección</dt><dd className="text-xl font-bold text-white"><CountUp to={120} /></dd> puntos de inspección</div>
            <div className="flex items-baseline gap-2"><dt className="sr-only">Garantía</dt><dd className="text-xl font-bold text-white"><CountUp to={12} /></dd> meses de garantía</div>
            <div className="flex items-center">Test drive sin cargo</div>
          </dl>
        </div>

        {/* Fundido a negro al final del recorrido y pista para seguir */}
        <div aria-hidden="true" className="hero-fade pointer-events-none absolute inset-0 bg-ink" />
        <div className="hero-next pointer-events-none absolute inset-x-0 bottom-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/70">Entrá al showroom</p>
        </div>
      </div>
    </section>
  )
}
