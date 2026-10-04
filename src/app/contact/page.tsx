import type { Metadata } from 'next'
import { cars } from '@/data/cars'
import { ContactForm } from '@/components/contact-form'
import { OpenNow } from '@/components/open-now'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contacto · InGen Motors',
  description: 'Escribinos, llamanos o visitanos. Estamos en Montevideo para ayudarte a encontrar tu próximo auto.',
}

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52339.50908875064!2d-56.195884792687025!3d-34.92603617322278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f819e0be26dff%3A0x5721a12a2943bc00!2sPunta%20Carretas%2C%2011300%20Montevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses!2suy!4v1790811739106!5m2!1ses!2suy'

export default function ContactPage() {
  return (
    <div className="bg-theme">
      <PageHero eyebrow="Contacto" title="Estamos para ayudarte">
        Escribinos por WhatsApp, llená el formulario o visitanos en el showroom. Te respondemos en menos de 24 horas hábiles.
      </PageHero>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-theme">Mandanos un mensaje</h2>
            <p className="mt-3 font-body text-sm text-muted">Completá el formulario y se abre WhatsApp con tu mensaje listo para enviar.</p>
            <div className="mt-8"><ContactForm cars={cars} /></div>
          </Reveal>

          <Reveal delay={150} className="space-y-8">
            <div className="rounded-theme-lg bg-ink p-6 text-on-ink shadow-card">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent-light">Respuesta inmediata</p>
              <h3 className="font-heading mt-2 text-2xl font-bold">¿Preferís WhatsApp?</h3>
              <p className="mt-2 font-body text-sm text-on-ink-muted">Escribinos y te respondemos al instante en horario comercial.</p>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">Abrir WhatsApp →</a>
            </div>

            <dl className="space-y-6">
              <div>
                <dt className="label-eyebrow">Showroom</dt>
                <dd><a href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="font-heading mt-2 block text-lg font-semibold text-theme transition-colors hover:text-accent">{siteConfig.address} ↗</a></dd>
              </div>
              <div>
                <dt className="label-eyebrow">Teléfono</dt>
                <dd><a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="mt-2 block font-body text-base text-theme transition-colors hover:text-accent">{siteConfig.phone}</a></dd>
              </div>
              <div>
                <dt className="label-eyebrow">Email</dt>
                <dd><a href={`mailto:${siteConfig.email}`} className="mt-2 block font-body text-base text-theme transition-colors hover:text-accent">{siteConfig.email}</a></dd>
              </div>
              <div>
                <dt className="label-eyebrow flex items-center justify-between"><span>Horarios</span><OpenNow /></dt>
                <dd className="mt-3 space-y-2 font-body text-sm text-muted">
                  {[siteConfig.hours.weekdays, siteConfig.hours.saturdays].map((h) => (
                    <p key={h} className="border-b border-dashed border-strong pb-2">{h}</p>
                  ))}
                  <p className="text-dim">Domingos cerrado</p>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-theme">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <iframe title={`Mapa de ${siteConfig.name}`} src={MAP_EMBED} className="absolute inset-0 h-full w-full"
            style={{ border: 0, filter: 'sepia(0.35) saturate(0.9) contrast(0.95)' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </section>
    </div>
  )
}
