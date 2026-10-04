'use client'

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  meta?: ReactNode          
}

export function PageHero({ eyebrow, title, children, meta }: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const on = () => setReady(true)
    if (document.documentElement.dataset.motorsReady === '1') on()
    window.addEventListener('motors:ready', on)
    const t = setTimeout(on, 7000)
    return () => { window.removeEventListener('motors:ready', on); clearTimeout(t) }
  }, [])

  const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

  return (
    <section
      data-ready={ready}
      className="relative isolate overflow-hidden border-b border-theme bg-theme px-6 pb-16 pt-20 text-theme sm:px-12 sm:pb-20 sm:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute left-0 top-20 hidden h-32 w-[3px] bg-accent sm:block"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <p className="rise flex items-center gap-3" style={d(700)}>
            <span className="plate">{eyebrow}</span>
          </p>
          {meta && (
            <div className="rise" style={d(780)}>
              {meta}
            </div>
          )}
        </div>

        {/* Titular */}
        <h1
          className="rise font-heading mt-6 max-w-5xl text-5xl font-bold leading-[0.94] tracking-[-0.03em] sm:text-7xl lg:text-[5.5rem]"
          style={d(820)}
        >
          {title}
        </h1>

        {/* Subtítulo */}
        {children && (
          <div
            className="rise mt-7 max-w-2xl font-body text-lg leading-relaxed text-muted"
            style={d(960)}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  )
}