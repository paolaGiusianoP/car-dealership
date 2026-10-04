'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { siteConfig } from '@/config/site'

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'
// Cortina en diagonal que cruza la pantalla de izquierda a derecha
const A = 'polygon(-12% 0, -12% 0, -24% 100%, -24% 100%)' 
const B = 'polygon(-12% 0, 112% 0, 100% 100%, -24% 100%)'
const C = 'polygon(112% 0, 112% 0, 100% 100%, 100% 100%)' 

const LABELS: Record<string, string> = { '/': 'Inicio', '/cars': 'Catálogo', '/financing': 'Financiación', '/about': 'Nosotros', '/contact': 'Contacto' }
const labelFor = (path: string) => LABELS[path] ?? (path.startsWith('/cars/') ? 'Ficha del auto' : siteConfig.name)

const DoorContext = createContext<(href: string) => void>(() => {})
export const useDoorNavigate = () => useContext(DoorContext)

const run = (el: HTMLElement, from: string, to: string, duration: number, delay = 0) =>
  el.animate([{ clipPath: from }, { clipPath: to }], { duration, delay, easing: EASE, fill: 'forwards' }).finished

export function DoorProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const red = useRef<HTMLDivElement>(null)
  const ink = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const waiter = useRef<(() => void) | null>(null)
  const [label, setLabel] = useState('')

  useEffect(() => { waiter.current?.(); waiter.current = null }, [pathname])

  const go = useCallback(async (href: string) => {
    const url = new URL(href, window.location.href)
    const target = url.pathname + url.search + url.hash
    const r = red.current, k = ink.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!r || !k || busy.current || reduced || url.pathname === window.location.pathname) { router.push(target); return }

    busy.current = true
    setLabel(labelFor(url.pathname))
    r.style.visibility = k.style.visibility = 'visible'
    await Promise.all([run(r, A, B, 520), run(k, A, B, 560, 130)])

    router.push(target)
    await new Promise<void>((res) => { waiter.current = res; setTimeout(res, 2500) })
    window.scrollTo({ top: 0, behavior: 'instant' })
    await new Promise((res) => setTimeout(res, 120))

    await Promise.all([run(k, B, C, 620), run(r, B, C, 560, 130)]) // la cortina se va primero y la franja roja cierra
    r.style.visibility = k.style.visibility = 'hidden'
    busy.current = false
  }, [router])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest?.('a') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
      e.preventDefault()
      e.stopPropagation() 
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [go])

  const hidden = { visibility: 'hidden' as const, clipPath: A }

  return (
    <DoorContext.Provider value={go}>
      {children}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
        <div ref={red} className="absolute inset-0 bg-accent will-change-[clip-path]" style={hidden} />
        <div ref={ink} className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink text-on-ink will-change-[clip-path]" style={hidden}>
          <span className="block h-1 w-16 bg-accent" />
          <p className="font-heading text-5xl font-extrabold uppercase tracking-[-0.02em] sm:text-7xl">{label}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-on-ink-muted">InGen Motors</p>
        </div>
      </div>
    </DoorContext.Provider>
  )
}
