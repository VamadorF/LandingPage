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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
          Tu compañera virtual
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            con memoria
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
          Una relación continua, no un chatbot. Tu compañera recuerda tus gustos, 
          hitos y contexto para que el vínculo evolucione y no se reinicie en cada conversación.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 md:mb-8">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
          >
            Preregístrate ahora
          </button>
          <a
            href="#caracteristicas"
            className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-base sm:text-lg border border-gray-200"
          >
            Conoce más
          </a>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 md:mb-8">
          <a
            href="https://apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 sm:gap-3 bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 bg-transparent">
              <Image
                src="/logos/Apple_logo.png"
                alt="Apple"
                width={40}
                height={40}
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] sm:text-xs text-gray-400">Descarga en</span>
              <span className="text-xs sm:text-sm font-semibold">App Store</span>
            </div>
          </a>
          <a
            href="https://android.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 sm:gap-3 bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/logos/Android_logo.png"
                alt="Android"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] sm:text-xs text-gray-400">Disponible en</span>
              <span className="text-xs sm:text-sm font-semibold">Google Play</span>
            </div>
          </a>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Memoria persistente</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Avatar personalizado</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Privacidad garantizada</span>
          </div>
        </div>
      </div>

    </section>
  )
}

