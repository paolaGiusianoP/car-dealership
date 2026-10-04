'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'

const status = (v: number) =>
  v < 25 ? 'Encendiendo motor…' : v < 60 ? 'Calentando…' : v < 95 ? 'Preparando el showroom…' : 'Listo para salir'

const preload = (src: string) =>
  new Promise<void>((res) => { const i = new Image(); i.onload = i.onerror = () => res(); i.src = src })

const store = {
  get: () => { try { return sessionStorage.getItem('motors-seen') === '1' } catch { return false } },
  set: () => { try { sessionStorage.setItem('motors-seen', '1') } catch { } },
}

const TICKS = Array.from({ length: 11 }, (_, i) => -90 + i * 18)

export function Preloader() {
  const [pct, setPct] = useState(0)
  const [lift, setLift] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const MIN = store.get() ? 600 : 1900
    const start = performance.now()
    let loaded = false, p = 0, raf = 0, finished = false
    const timers: ReturnType<typeof setTimeout>[] = []

    Promise.race([
      Promise.all([document.fonts?.ready, preload(siteConfig.heroImage)]),
      new Promise((r) => setTimeout(r, 4000)),
    ]).then(() => { loaded = true })

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / MIN)
      p += (Math.min(1 - Math.pow(1 - t, 3), loaded ? 1 : 0.92) - p) * 0.15
      setPct(Math.round(p * 100))
      if (loaded && t >= 1 && p > 0.985 && !finished) {
        finished = true
        setPct(100)
        store.set()
        timers.push(setTimeout(() => {
          setLift(true)
          root.dataset.motorsReady = '1'
          window.dispatchEvent(new Event('motors:ready'))
        }, 350))
        timers.push(setTimeout(() => { root.style.overflow = ''; setGone(true) }, 1350))
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); root.style.overflow = '' }
  }, [])

  if (gone) return null

  return (
    <div
      role="status"
      aria-label="Cargando"
      className="fixed inset-0 z-[100] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
      style={{ clipPath: lift ? 'polygon(112% 0, 112% 0, 100% 100%, 100% 100%)' : 'polygon(-12% 0, 112% 0, 100% 100%, -24% 100%)' }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center bg-ink px-6 text-on-ink">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-on-ink-muted">{siteConfig.tagline}</p>

        <div className="relative mt-8 w-full max-w-sm" aria-hidden="true">
          <svg viewBox="0 0 240 140" className="w-full">
            <path d="M20 120 A100 100 0 0 1 220 120" fill="none" stroke="rgba(243,236,224,0.14)" strokeWidth="6" strokeLinecap="round" />
            <path d="M20 120 A100 100 0 0 1 220 120" pathLength={100} fill="none" stroke="#ff3b30" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="100" strokeDashoffset={100 - pct} />
            {TICKS.map((a) => (
              <line key={a} x1="120" y1="28" x2="120" y2="36" stroke="rgba(243,236,224,0.35)" strokeWidth="2"
                style={{ transform: `rotate(${a}deg)`, transformOrigin: '120px 120px' }} />
            ))}
            <g style={{ transform: `rotate(${-90 + pct * 1.8}deg)`, transformOrigin: '120px 120px' }}>
              <line x1="120" y1="120" x2="120" y2="42" stroke="#f3ece0" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="120" cy="120" r="8" fill="#ff3b30" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <p className="font-heading text-5xl tabular-nums">{Math.round(pct * 2.4)}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-ink-muted">km/h</p>
          </div>
        </div>

        <p className="font-heading mt-10 text-4xl italic">
          InGen <span className="text-accent-light">Motors</span>
        </p>
        <p className="mt-3 h-5 font-mono text-[11px] uppercase tracking-[0.3em] text-on-ink-muted">{status(pct)}</p>
      </div>
    </div>
  )
}
