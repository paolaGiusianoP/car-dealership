import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Política de Privacidad · InGen Motors',
  description:
    'Cómo recopilamos, usamos y protegemos tu información personal en InGen Motors.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-theme">
      <section className="border-b border-theme px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="label-eyebrow">Legal</p>
          <h1 className="mt-3 font-heading text-5xl font-bold leading-tight text-theme sm:text-6xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 font-body text-sm text-muted">
            Última actualización: 2 de octubre de 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="prose prose-invert mx-auto max-w-3xl">
          <div className="space-y-10 font-body text-base leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-theme [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-theme [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_a]:text-accent [&_a]:underline">

            <div>
              <h2>1. Información que recopilamos</h2>
              <p>
                En {siteConfig.name} recopilamos información personal que nos
                proporcionás voluntariamente a través de los formularios del
                sitio, el WhatsApp, el teléfono o el email. Esta información
                incluye:
              </p>
              <ul>
                <li>Nombre y apellido</li>
                <li>Teléfono de contacto</li>
                <li>Dirección de email</li>
                <li>Información sobre el auto de tu interés</li>
                <li>Cualquier otra información que decidas compartirnos</li>
              </ul>
            </div>

            <div>
              <h2>2. Cómo usamos tu información</h2>
              <p>Usamos tu información para:</p>
              <ul>
                <li>Responder a tus consultas sobre autos disponibles</li>
                <li>Coordinar test drives y visitas al showroom</li>
                <li>Asistirte con el proceso de financiación</li>
                <li>Enviarte información relevante sobre stock y promociones</li>
                <li>Cumplir con obligaciones legales y contables</li>
              </ul>
            </div>

            <div>
              <h2>3. Compartir información con terceros</h2>
              <p>
                No vendemos, alquilamos ni compartimos tu información personal
                con terceros, excepto en los siguientes casos:
              </p>
              <ul>
                <li>
                  Con bancos y financieras, cuando solicitás una financiación
                  (con tu consentimiento previo)
                </li>
                <li>
                  Con autoridades competentes, cuando la ley lo requiere
                </li>
                <li>
                  Con proveedores de servicios que nos ayudan a operar el sitio
                  (bajo acuerdos de confidencialidad)
                </li>
              </ul>
            </div>

            <div>
              <h2>4. Cookies y tecnologías similares</h2>
              <p>
                Utilizamos cookies propias y de terceros para mejorar tu
                experiencia en el sitio, analizar el tráfico y personalizar
                contenido. Podés desactivar las cookies desde la configuración
                de tu navegador, aunque esto puede afectar el funcionamiento de
                algunas secciones.
              </p>
            </div>

            <div>
              <h2>5. Seguridad de la información</h2>
              <p>
                Implementamos medidas técnicas y organizativas razonables para
                proteger tu información contra accesos no autorizados,
                alteraciones o pérdidas. Sin embargo, ningún sistema es 100%
                seguro, por lo que no podemos garantizar seguridad absoluta.
              </p>
            </div>

            <div>
              <h2>6. Tus derechos</h2>
              <p>Tenés derecho a:</p>
              <ul>
                <li>Acceder a la información que tenemos sobre vos</li>
                <li>Rectificar datos incorrectos o incompletos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al tratamiento de tus datos</li>
                <li>Solicitar la portabilidad de tu información</li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, escribinos a{' '}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            </div>

            <div>
              <h2>7. Menores de edad</h2>
              <p>
                Nuestros servicios no están dirigidos a menores de 18 años. No
                recopilamos intencionalmente información de menores. Si sos
                padre o tutor y creés que tu hijo nos proporcionó información,
                contactanos para eliminarla.
              </p>
            </div>

            <div>
              <h2>8. Cambios en esta política</h2>
              <p>
                Podemos actualizar esta política periódicamente. Te recomendamos
                revisarla cada tanto. La fecha de última actualización aparece
                al inicio de esta página.
              </p>
            </div>

            <div>
              <h2>9. Contacto</h2>
              <p>
                Si tenés dudas sobre esta política, escribinos a{' '}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> o
                al <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="border-t border-theme px-6 py-12 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="btn-secondary">
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  )
}