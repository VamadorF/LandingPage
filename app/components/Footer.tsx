'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at top center, rgba(186, 176, 237, 0.08) 0%, rgba(255, 255, 255, 0) 60%), #FEFEFE',
      borderTopColor: 'rgba(186, 176, 237, 0.2)'
    }}>
      {/* Elemento decorativo sutil */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 rounded-full mix-blend-multiply filter blur-3xl opacity-15" style={{ backgroundColor: 'rgba(186, 176, 237, 0.10)' }}></div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <div className="mb-3 sm:mb-4">
              <div className="relative h-8 sm:h-10 w-auto inline-block">
                <Image
                  src="/logos/eJoi_logos-01.png"
                  alt="eJoi"
                  width={120}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-sm sm:text-base mb-4 sm:mb-5 max-w-md" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
              Tu compañera virtual con memoria. Una relación continua diseñada para crear
              hábito y apego mediante continuidad emocional.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {/* Redes sociales */}
              <a
                href="https://www.instagram.com/ejoiofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(186, 176, 237, 0.1)',
                  color: '#3C3C3B'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(242, 10, 100, 0.12)'
                  e.currentTarget.style.color = '#F20A64'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(186, 176, 237, 0.1)'
                  e.currentTarget.style.color = '#3C3C3B'
                }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://x.com/eJoiOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(186, 176, 237, 0.1)',
                  color: '#3C3C3B'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(242, 10, 100, 0.12)'
                  e.currentTarget.style.color = '#F20A64'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(186, 176, 237, 0.1)'
                  e.currentTarget.style.color = '#3C3C3B'
                }}
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg text-ejoi-gris">Enlaces</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/#caracteristicas"
                  className="min-h-[44px] flex items-center text-sm sm:text-base transition-colors duration-200"
                  style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(60, 60, 59, 0.7)'
                  }}
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  href="/#arquetipos"
                  className="min-h-[44px] flex items-center text-sm sm:text-base transition-colors duration-200"
                  style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(60, 60, 59, 0.7)'
                  }}
                >
                  Arquetipos
                </Link>
              </li>
              <li>
                <Link
                  href="/#preregister"
                  className="min-h-[44px] flex items-center text-sm sm:text-base transition-colors duration-200"
                  style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(60, 60, 59, 0.7)'
                  }}
                >
                  Preregistro
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg text-ejoi-gris">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/terminos" className="min-h-[44px] block text-sm sm:text-base transition-colors duration-200 py-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(60, 60, 59, 0.7)'
                  }}
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="min-h-[44px] block text-sm sm:text-base transition-colors duration-200 py-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(60, 60, 59, 0.7)'
                  }}
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="min-h-[44px] block text-sm sm:text-base transition-colors duration-200 py-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(60, 60, 59, 0.7)'
                  }}
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="min-h-[44px] block text-sm sm:text-base transition-colors duration-200 py-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(60, 60, 59, 0.7)'
                  }}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm" style={{
          borderTopColor: 'rgba(186, 176, 237, 0.2)',
          color: 'rgba(60, 60, 59, 0.6)'
        }}>
          <p>&copy; {currentYear} eJoi. Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado y desarrollado con ❤️ en Chile</p>
        </div>
      </div>
    </footer>
  )
}

