'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById('preregister')
    formSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-24 py-8 sm:py-12 md:py-20" style={{
      background: 'radial-gradient(ellipse at bottom left, rgba(186, 176, 237, 0.18) 0%, rgba(186, 176, 237, 0.10) 30%, rgba(242, 10, 100, 0.04) 50%, rgba(255, 255, 255, 0) 75%), #FEFEFE'
    }}>
      {/* Background decoration - Lavanda atmosférica suave con más color */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ backgroundColor: 'rgba(186, 176, 237, 0.20)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" style={{ backgroundColor: 'rgba(186, 176, 237, 0.18)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" style={{ backgroundColor: 'rgba(186, 176, 237, 0.15)' }}></div>
        {/* Elementos decorativos adicionales con magenta suave */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-1000" style={{ backgroundColor: 'rgba(242, 10, 100, 0.08)' }}></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-3000" style={{ backgroundColor: 'rgba(242, 10, 100, 0.06)' }}></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
          <div className="relative h-12 sm:h-16 md:h-24 lg:h-32 xl:h-40 w-auto animate-fade-in-up">
            <Image
              src="/logos/eJoi_logos-01.png"
              alt="eJoi"
              width={320}
              height={160}
              className="h-full w-auto object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-ejoi-gris mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
          Tu compañera virtual
          <span className="block" style={{ color: '#F20A64' }}>
            con memoria
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-ejoi-gris mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2" style={{ color: 'rgba(60, 60, 59, 0.85)' }}>
          Una relacion continua, tu compañera recuerda quien eres. El vínculo crece contigo, conversacion a conversacion.
        </p>

        <div className="flex justify-center items-center mb-4 sm:mb-6 md:mb-8">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto min-h-[44px] px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base md:text-lg"
            style={{
              backgroundColor: '#F20A64',
              boxShadow: '0 4px 14px rgba(242, 10, 100, 0.25)'
            }}
          >
            Preregístrate ahora
          </button>
        </div>

        {/* App Store Buttons — Próximamente */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center items-center mb-4 sm:mb-6 md:mb-8">
          {/* App Store — deshabilitado */}
          <div
            aria-disabled="true"
            role="img"
            aria-label="App Store — Próximamente"
            className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(242, 10, 100, 0.08) 0%, rgba(186, 176, 237, 0.12) 100%)',
              border: '1.5px solid rgba(242, 10, 100, 0.20)',
              opacity: 0.7,
              cursor: 'not-allowed',
            }}
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 bg-transparent" style={{ opacity: 0.5 }}>
              <Image
                src="/logos/Apple_logo.png"
                alt="Apple"
                width={40}
                height={40}
                className="object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(97%) saturate(5000%) hue-rotate(318deg) brightness(90%)' }}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[9px] sm:text-[10px] md:text-xs font-medium" style={{ color: 'rgba(242, 10, 100, 0.6)' }}>Próximamente</span>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold" style={{ color: '#3C3C3B' }}>App Store</span>
            </div>
          </div>

          {/* Google Play — deshabilitado */}
          <div
            aria-disabled="true"
            role="img"
            aria-label="Google Play — Próximamente"
            className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(242, 10, 100, 0.08) 0%, rgba(186, 176, 237, 0.12) 100%)',
              border: '1.5px solid rgba(242, 10, 100, 0.20)',
              opacity: 0.7,
              cursor: 'not-allowed',
            }}
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0" style={{ opacity: 0.5 }}>
              <Image
                src="/logos/Android_logo.png"
                alt="Android"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[9px] sm:text-[10px] md:text-xs font-medium" style={{ color: 'rgba(242, 10, 100, 0.6)' }}>Próximamente</span>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold" style={{ color: '#3C3C3B' }}>Google Play</span>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-[11px] sm:text-xs md:text-sm" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#F20A64' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Memoria persistente</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#F20A64' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Avatar personalizado</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#F20A64' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Privacidad garantizada</span>
          </div>
        </div>
      </div>

    </section>
  )
}

