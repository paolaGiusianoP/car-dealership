import type { Metadata } from 'next'
import { Inter, Archivo, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { Preloader } from '@/components/preloader'
import { DoorProvider } from '@/components/door-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  axes: ['wdth'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ingenmotors.com'),

  title: {
    default: 'InGen Motors · Autos nuevos y usados en Montevideo',
    template: '%s · InGen Motors',
  },

  description:
    'Concesionario de autos nuevos y usados en Montevideo. Stock seleccionado, financiación a medida y test drive sin compromiso.',

  keywords: [
    'autos usados Montevideo',
    'concesionario Uruguay',
    'autos nuevos Montevideo',
    'financiación autos',
    'InGen Motors',
  ],

  authors: [{ name: 'InGen Motors' }],
  creator: 'InGen Motors',
  publisher: 'InGen Motors',

  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: 'https://ingenmotors.com',
    siteName: 'InGen Motors',
    title: 'InGen Motors · Autos nuevos y usados en Montevideo',
    description:
      'Stock seleccionado, financiación a medida y test drive sin compromiso.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'InGen Motors',
    description:
      'Concesionario de autos en Montevideo. Stock seleccionado y financiación a medida.',
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: 'https://ingenmotors.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      data-theme="gallery"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Preloader />
        <DoorProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </DoorProvider>
      </body>
    </html>
  )
}