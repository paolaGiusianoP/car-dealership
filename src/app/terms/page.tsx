import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Términos y Condiciones · InGen Motors',
  description:
    'Términos y condiciones de uso del sitio web de InGen Motors y de nuestros servicios de venta de autos.',
}

export default function TermsPage() {
  return (
    <div className="bg-theme">
      <section className="border-b border-theme px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="label-eyebrow">Legal</p>
          <h1 className="mt-3 font-heading text-5xl font-bold leading-tight text-theme sm:text-6xl">
            Términos y Condiciones
          </h1>
          <p className="mt-4 font-body text-sm text-muted">
            Última actualización: 2 de octubre de 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-10 font-body text-base leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-theme [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:list-disc [&_a]:text-accent [&_a]:underline">

            <div>
              <h2>1. Aceptación de los términos</h2>
              <p>
                Al acceder y usar el sitio web de {siteConfig.name}, aceptás
                estos Términos y Condiciones en su totalidad. Si no estás de
                acuerdo, te pedimos que no utilices el sitio.
              </p>
            </div>

            <div>
              <h2>2. Uso del sitio</h2>
              <p>Te comprometés a usar el sitio de manera lícita. No podés:</p>
              <ul>
                <li>Usar el sitio para fines ilegales o no autorizados</li>
                <li>Intentar acceder a áreas restringidas sin autorización</li>
                <li>Interferir con el funcionamiento del sitio</li>
                <li>Reproducir, duplicar o copiar contenido sin permiso</li>
                <li>Usar sistemas automatizados para extraer información</li>
              </ul>
            </div>

            <div>
              <h2>3. Información sobre los autos</h2>
              <p>
                Nos esforzamos por mantener la información del catálogo
                actualizada y precisa. Sin embargo:
              </p>
              <ul>
                <li>Los precios pueden cambiar sin previo aviso</li>
                <li>
                  Las fotos son ilustrativas y pueden no reflejar exactamente el
                  estado actual del auto
                </li>
                <li>
                  El stock está sujeto a disponibilidad. Un auto publicado puede
                  estar reservado o vendido
                </li>
                <li>
                  Las especificaciones técnicas son orientativas y deben
                  confirmarse en el showroom
                </li>
              </ul>
            </div>

            <div>
              <h2>4. Proceso de compra</h2>
              <p>
                La publicación de un auto en el sitio no constituye una oferta
                vinculante. El proceso de compra se formaliza mediante:
              </p>
              <ul>
                <li>Visita al showroom para ver el auto en persona</li>
                <li>Firma de un contrato de compraventa</li>
                <li>Pago del precio acordado (contado o financiado)</li>
                <li>Transferencia del vehículo a tu nombre</li>
              </ul>
            </div>

            <div>
              <h2>5. Financiación</h2>
              <p>
                Las simulaciones de financiación publicadas en el sitio son
                orientativas y no constituyen una oferta de crédito. La
                aprobación final depende del análisis crediticio del banco o
                financiera elegida.
              </p>
            </div>

            <div>
              <h2>6. Garantía</h2>
              <p>
                Los autos certificados por {siteConfig.name} incluyen 12 meses
                de garantía sobre mecánica y caja, con las condiciones
                detalladas en el contrato de compraventa. Los autos usados no
                certificados se venden en el estado en que se encuentran.
              </p>
            </div>

            <div>
              <h2>7. Propiedad intelectual</h2>
              <p>
                Todo el contenido del sitio (textos, imágenes, logos, diseño) es
                propiedad de {siteConfig.name} o de sus licenciantes. No podés
                reproducirlo sin autorización previa por escrito.
              </p>
            </div>

            <div>
              <h2>8. Limitación de responsabilidad</h2>
              <p>
                {siteConfig.name} no se hace responsable por daños indirectos,
                incidentales o consecuentes derivados del uso del sitio o de la
                imposibilidad de usarlo. Nuestra responsabilidad total se limita
                al monto que hayas pagado por los servicios.
              </p>
            </div>

            <div>
              <h2>9. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Los cambios entran en vigencia al publicarse
                en el sitio. Es tu responsabilidad revisarlos periódicamente.
              </p>
            </div>

            <div>
              <h2>10. Ley aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de la República Oriental
                del Uruguay. Cualquier disputa se resolverá en los tribunales
                competentes de Montevideo.
              </p>
            </div>

            <div>
              <h2>11. Contacto</h2>
              <p>
                Para consultas sobre estos términos, escribinos a{' '}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
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