import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Contacto',
    description:
        '¿Tienes alguna pregunta o sugerencia? Ponte en contacto con el equipo de eJoi.',
    alternates: {
        canonical: '/contacto',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function ContactoPage() {
    return (
        <main className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top center, rgba(186, 176, 237, 0.08) 0%, rgba(255, 255, 255, 0) 60%), #FEFEFE' }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>
                    <Link href="/" className="hover:underline" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>
                        Inicio
                    </Link>
                    <span className="mx-2">/</span>
                    <span style={{ color: '#3C3C3B' }}>Contacto</span>
                </nav>

                {/* Header */}
                <div className="mb-10 pb-8 border-b" style={{ borderBottomColor: 'rgba(186, 176, 237, 0.3)' }}>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#3C3C3B' }}>
                        Contacto
                    </h1>
                    <p className="text-sm" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>
                        ¿Tienes alguna consulta o sugerencia? Estamos aquí para escucharte.
                    </p>
                </div>

                {/* Placeholder — reemplazar con formulario o datos de contacto */}
                <div className="rounded-2xl p-8 text-center space-y-4" style={{ border: '1.5px dashed rgba(186, 176, 237, 0.5)', background: 'rgba(186, 176, 237, 0.04)' }}>
                    <div className="text-4xl">✉️</div>
                    <h2 className="text-xl font-semibold" style={{ color: '#3C3C3B' }}>
                        Próximamente
                    </h2>
                    <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
                        Estamos preparando nuestro formulario de contacto. Mientras tanto, puedes escribirnos directamente a{' '}
                        <a
                            href="mailto:contacto@ejoi.cl"
                            className="font-medium underline"
                            style={{ color: '#F20A64' }}
                        >
                            contacto@ejoi.cl
                        </a>
                    </p>
                </div>

                {/* Footer nav */}
                <div className="mt-12 pt-8 border-t text-sm" style={{ borderTopColor: 'rgba(186, 176, 237, 0.3)' }}>
                    <Link href="/" className="hover:underline" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </main>
    )
}
