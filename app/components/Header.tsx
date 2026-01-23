'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? 'rgba(254, 254, 254, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(186, 176, 237, 0.15)' : 'none',
        boxShadow: isScrolled ? '0 2px 8px rgba(186, 176, 237, 0.08)' : 'none'
      }}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 lg:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg transition-opacity hover:opacity-80"
            style={{ 
              '--tw-ring-color': 'rgba(242, 10, 100, 0.3)'
            } as React.CSSProperties}
            aria-label="Ir al inicio"
          >
            <div className="relative h-8 sm:h-10 md:h-14 lg:h-16 w-auto transition-transform duration-300 hover:scale-105">
              <Image
                src="/logos/eJoi_logos-01.png"
                alt="eJoi"
                width={180}
                height={64}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </button>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection('caracteristicas')}
              className="text-sm lg:text-base font-medium transition-colors duration-200 min-h-[44px] px-3"
              style={{ color: 'rgba(60, 60, 59, 0.8)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F20A64'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(60, 60, 59, 0.8)'
              }}
            >
              Características
            </button>
            <button
              onClick={() => scrollToSection('arquetipos')}
              className="text-sm lg:text-base font-medium transition-colors duration-200 min-h-[44px] px-3"
              style={{ color: 'rgba(60, 60, 59, 0.8)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F20A64'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(60, 60, 59, 0.8)'
              }}
            >
              Arquetipos
            </button>
            <button
              onClick={() => scrollToSection('preregister')}
              className="text-sm lg:text-base font-semibold rounded-full px-5 py-2.5 min-h-[44px] transition-all duration-300"
              style={{ 
                backgroundColor: '#F20A64',
                color: 'white',
                boxShadow: '0 2px 8px rgba(242, 10, 100, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(242, 10, 100, 0.35)'
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(242, 10, 100, 0.25)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Preregístrate
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors"
            style={{ color: '#3C3C3B' }}
            aria-label="Menú"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t" style={{ borderTopColor: 'rgba(186, 176, 237, 0.15)' }}>
            <div className="flex flex-col gap-2 pt-4">
              <button
                onClick={() => scrollToSection('caracteristicas')}
                className="text-base font-medium transition-colors duration-200 min-h-[44px] px-4 text-left rounded-lg hover:bg-opacity-10"
                style={{ 
                  color: 'rgba(60, 60, 59, 0.8)',
                  backgroundColor: 'rgba(186, 176, 237, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F20A64'
                  e.currentTarget.style.backgroundColor = 'rgba(242, 10, 100, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(60, 60, 59, 0.8)'
                  e.currentTarget.style.backgroundColor = 'rgba(186, 176, 237, 0.05)'
                }}
              >
                Características
              </button>
              <button
                onClick={() => scrollToSection('arquetipos')}
                className="text-base font-medium transition-colors duration-200 min-h-[44px] px-4 text-left rounded-lg hover:bg-opacity-10"
                style={{ 
                  color: 'rgba(60, 60, 59, 0.8)',
                  backgroundColor: 'rgba(186, 176, 237, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F20A64'
                  e.currentTarget.style.backgroundColor = 'rgba(242, 10, 100, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(60, 60, 59, 0.8)'
                  e.currentTarget.style.backgroundColor = 'rgba(186, 176, 237, 0.05)'
                }}
              >
                Arquetipos
              </button>
              <button
                onClick={() => scrollToSection('preregister')}
                className="text-base font-semibold rounded-lg px-4 py-2.5 min-h-[44px] transition-all duration-300 text-left"
                style={{ 
                  backgroundColor: '#F20A64',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(242, 10, 100, 0.25)'
                }}
              >
                Preregístrate
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

