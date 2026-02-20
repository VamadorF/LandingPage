import type { Metadata } from 'next'
import Link from 'next/link'
import { TermsContent } from '../components/contenidoLegal'

export const metadata: Metadata = {
    title: 'Términos y Condiciones',
    description:
        'Lee los Términos y Condiciones de uso de eJoi. Conoce tus derechos y obligaciones como usuario de nuestra plataforma de acompañamiento con IA.',
    alternates: {
        canonical: '/terminos',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function TerminosPage() {
    return (
        <main className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top center, rgba(186, 176, 237, 0.08) 0%, rgba(255, 255, 255, 0) 60%), #FEFEFE' }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>
                    <Link href="/" className="hover:underline transition-colors" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>
                        Inicio
                    </Link>
                    <span className="mx-2">/</span>
                    <span style={{ color: '#3C3C3B' }}>Términos y Condiciones</span>
                </nav>

                {/* Header */}
                <div className="mb-10 pb-8 border-b" style={{ borderBottomColor: 'rgba(186, 176, 237, 0.3)' }}>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#3C3C3B' }}>
                        Términos y Condiciones
                    </h1>
                    <p className="text-sm" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>
                        Última actualización: 20 de febrero de 2026
                    </p>
                </div>

                {/* Contenido */}
                <TermsContent />

                {/* Footer nav */}
                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm" style={{ borderTopColor: 'rgba(186, 176, 237, 0.3)', color: 'rgba(60, 60, 59, 0.6)' }}>
                    <Link href="/privacidad" className="hover:underline transition-colors" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
                        Política de Privacidad →
                    </Link>
                    <Link href="/cookies" className="hover:underline transition-colors" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
                        Política de Cookies →
                    </Link>
                    <Link href="/" className="hover:underline transition-colors sm:ml-auto" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </main>
    )
}
