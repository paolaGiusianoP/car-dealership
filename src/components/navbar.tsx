'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'

const NAV = [
  { label: 'Catálogo', href: '/cars' },
  { label: 'Financiación', href: '/financing' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Contacto', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const home = pathname === '/'
  const onDark = (home && !scrolled) || open

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [open])

  const tel = `tel:${siteConfig.phone.replace(/\s/g, '')}`
  const testDrive = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola! Quisiera agendar un test drive.')}`

  return (
    <>
     <header
        className={`${home ? 'fixed inset-x-0' : 'sticky'} top-0 z-40 border-b transition-[background-color,border-color,color,backdrop-filter] duration-500 ${
          onDark
            ? 'border-white/10 bg-ink/55 text-white backdrop-blur-xl'
            : 'border-theme bg-bg/90 text-theme backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-12">
          <Link href="/" aria-label="InGen Motors, inicio" className="flex items-center gap-3">
            <span className="grid h-8 w-8 -skew-x-12 place-items-center bg-accent text-accent-text">
              <span className="font-heading skew-x-12 text-lg font-extrabold">I</span>
            </span>
            <span className="font-heading text-[15px] font-extrabold uppercase tracking-[0.16em]">
              InGen <span className="font-medium opacity-70">Motors</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
                  className="group relative py-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-80">
                  {item.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-accent transition-transform duration-500 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={tel}
              className="hidden items-center gap-2 text-[12px] font-medium text-on-ink-muted transition-colors hover:text-white xl:flex"
            >
              {/* ícono */}
              {siteConfig.phone}
            </a>
            <a href={testDrive} target="_blank" rel="noopener noreferrer"
              className="hidden bg-accent px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-text transition-colors hover:bg-accent-hover sm:inline-block">
              Test drive
            </a>
            <button type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center lg:hidden">
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div aria-hidden={!open}
        className={`fixed inset-0 z-30 flex flex-col justify-between bg-ink px-6 pb-8 pt-28 text-on-ink transition-all duration-500 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <nav aria-label="Principal móvil" className="flex flex-col">
          {NAV.map((item, i) => (
            <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
              className={`font-heading border-b border-on-ink py-5 text-4xl font-bold transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-5">
          <a href={tel} className="block font-mono text-sm tracking-widest text-on-ink-muted">{siteConfig.phone}</a>
          <a href={testDrive} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">Agendar test drive →</a>
          <p className="font-body text-xs text-on-ink-muted">{siteConfig.address}</p>
        </div>
      </div>
    </>
  )
}
