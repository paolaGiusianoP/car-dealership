import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-theme bg-elevated">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <p className="font-heading text-2xl font-bold text-theme">
              InGen <span className="italic text-accent">Motors</span>
            </p>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-muted">
              Concesionario de autos nuevos y usados en Montevideo. Stock
              seleccionado, financiación a medida y test drive sin compromiso.
            </p>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Escribinos por WhatsApp →
            </a>
          </div>

          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dim">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Catálogo', href: '/cars' },
                { label: 'Nosotros', href: '/about' },
                { label: 'Financiación', href: '/financing' },
                { label: 'Contacto', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dim">
              Contacto
            </p>
            <ul className="mt-4 space-y-3 font-body text-sm text-muted">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="pt-1">
                <p className="text-dim text-xs uppercase tracking-wider">Showroom</p>
                <p className="mt-1">{siteConfig.address}</p>
              </li>
              <li>
                <p className="text-dim text-xs uppercase tracking-wider">Horarios</p>
                <p className="mt-1">{siteConfig.hours.weekdays}</p>
                <p>{siteConfig.hours.saturdays}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-theme pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim">
            © {year} InGen Motors · Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-mono text-[10px] uppercase tracking-widest text-dim transition-colors hover:text-accent"
            >
              Privacidad
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[10px] uppercase tracking-widest text-dim transition-colors hover:text-accent"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}