import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LegalHub } from './components/legalHub'
import CookiePopup from './components/Cookiepopup'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const siteUrl = new URL('https://e-joi.cl') 
const siteName = 'eJoi'

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'eJoi – Compañera Virtual con IA y Memoria Persistente',
    template: '%s | eJoi',
  },
  description:
    'eJoi: tu compañera virtual con IA que recuerda tus gustos y contexto. Más que un chatbot, una relación continua. Preregístrate gratis.',
  applicationName: siteName,
  keywords: [
    'eJoi',
    'compañera virtual',
    'compañero virtual',
    'inteligencia artificial',
    'IA',
    'chatbot con memoria',
    'memoria persistente',
    'avatar personalizado',
    'asistente virtual',
    'acompañamiento emocional',
    'Chile',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    title: 'eJoi – Tu Compañera Virtual con IA que Te Recuerda',
    description:
      'Más que un chatbot: eJoi es una compañera virtual con inteligencia artificial y memoria persistente. Recuerda tus gustos, hitos y contexto para que el vínculo evolucione.',
    url: '/',
    siteName,
    locale: 'es_CL',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@eJoiOfficial',
    creator: '@eJoiOfficial',
    title: 'eJoi – Compañera Virtual con IA y Memoria Persistente',
    description:
      'Más que un chatbot: una compañera virtual que recuerda tus gustos y contexto. Avatar personalizado, memoria persistente y relación continua.',
  },

  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <LegalHub />
        <CookiePopup />
        {children}
      </body>
    </html>
  )
}
