import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const siteUrl = new URL('https://e-joi.cl') 
const siteName = 'eJoi'

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'eJoi - Tu compañera virtual con memoria',
    template: '%s | eJoi',
  },
  description:
    'Plataforma de acompañamiento personal con IA. Una relación continua con un avatar virtual que recuerda tus gustos, logros y contexto para que el vínculo evolucione.',
  applicationName: siteName,
  keywords: ['IA', 'compañera virtual', 'compañero virtual', 'chatbot', 'memoria persistente', 'avatar', 'Chile', 'compañia', 'asistente virtual'],
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
    title: 'eJoi - Tu compañer@ virtual con memoria',
    description:
      'Plataforma de acompañamiento personal con IA. Una relación continua con un compañer@ virtual que recuerda tu contexto.',
    url: '/',
    siteName,
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/og.jpg', 
        width: 1200,
        height: 630,
        alt: 'eJoi - Tu compañer@ virtual con memoria',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'eJoi - Tu compañer@ virtual con memoria',
    description:
      'Plataforma de acompañamiento personal con IA. Una relación continua con un compañer@ virtual que recuerda.',
    images: ['/og.jpg'],
  },

  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
