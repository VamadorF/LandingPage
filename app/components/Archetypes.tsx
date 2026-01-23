'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Archetype {
  id: string
  name: string
  imageRealista: string
  imageAnime: string
  description: string
  objectPositionRealista?: string
  objectPositionAnime?: string
}

const archetypesFemeninos: Archetype[] = [
  {
    id: 'anfitriona',
    name: 'La Anfitriona',
    imageRealista: '/arquetipos/Anfitriona.jpg',
    imageAnime: '/anime/Anime_anfitriona.png',
    description: 'Cálida, acogedora y siempre atenta. Perfecta para quienes buscan compañía reconfortante y conversaciones que nutren el alma.',
    objectPositionRealista: 'center 35%',
    objectPositionAnime: 'center 25%',
  },
  {
    id: 'ejecutiva',
    name: 'La Ejecutiva',
    imageRealista: '/arquetipos/ejecutiva.jpg',
    imageAnime: '/anime/Anime_ejecutiva.png',
    description: 'Profesional, inteligente y orientada a resultados. Ideal para conversaciones estimulantes y apoyo en tus objetivos personales y profesionales.',
    objectPositionRealista: 'center 20%',
    objectPositionAnime: 'center 20%',
  },
  {
    id: 'musa',
    name: 'La Musa',
    imageRealista: '/arquetipos/La Musa.jpg',
    imageAnime: '/anime/Anime_musa.png',
    description: 'Creativa, inspiradora y bohemia. Tu compañera ideal para explorar ideas, arte y la belleza en las pequeñas cosas de la vida.',
    objectPositionRealista: 'center 30%',
    objectPositionAnime: 'center 30%',
  },
  {
    id: 'porrista',
    name: 'La Porrista',
    imageRealista: '/arquetipos/porrista.jpg',
    imageAnime: '/anime/Anime_porrista.png',
    description: 'Energética, positiva y motivadora. Siempre lista para animarte y celebrar tus logros, sin importar qué tan grandes o pequeños sean.',
    objectPositionRealista: 'center 30%',
    objectPositionAnime: 'center 25%',
  },
]

const archetypesMasculinos: Archetype[] = [
  {
    id: 'ejecutivo',
    name: 'El Ejecutivo',
    imageRealista: '/arquetipos/Ejecutivo.png',
    imageAnime: '/anime/anime_ejecutivo.png',
    description: 'Arquetipo de autoridad racional. Presencia pulida, autocontrol y estatus profesional. Proyecta competencia, liderazgo silencioso y fiabilidad. Decide con claridad, mantiene el control sin necesidad de imponerse.',
    objectPositionRealista: 'center 30%',
    objectPositionAnime: 'center 30%',
  },
  {
    id: 'artesano',
    name: 'El Artesano',
    imageRealista: '/arquetipos/Artesano.png',
    imageAnime: '/anime/Anime_artesano.png',
    description: 'Arquetipo de masculinidad constructiva. Manos que crean, foco sostenido y paciencia. La habilidad tangible y la constancia definen su presencia. La seguridad emerge del hacer cotidiano, no de la exhibición.',
    objectPositionRealista: 'center 40%',
    objectPositionAnime: 'center 40%',
  },
  {
    id: 'intelectual',
    name: 'El Intelectual',
    imageRealista: '/arquetipos/Intelectual.png',
    imageAnime: '/anime/Anime_intelectual.png',
    description: 'Arquetipo de profundidad reflexiva. Estética cuidada, apertura emocional y curiosidad cultural. Escucha con atención, sostiene criterio propio y articula un mundo interno sólido. Transmite calma, cercanía y respeto.',
    objectPositionRealista: 'center 35%',
    objectPositionAnime: 'center 35%',
  },
  {
    id: 'protector',
    name: 'El Protector',
    imageRealista: '/arquetipos/Protector.png',
    imageAnime: '/anime/Anime_Protector.jpg',
    description: 'Arquetipo de fuerza disciplinada. El cuerpo como herramienta de servicio, orden y vigilancia. Mantiene el control bajo presión y ofrece una presencia física dominante, siempre contenida y consciente.',
    objectPositionRealista: 'center 35%',
    objectPositionAnime: 'center 35%',
  },
]

export default function Archetypes() {
  const [selectedStyle, setSelectedStyle] = useState<'realista' | 'anime'>('realista')
  const [selectedGender, setSelectedGender] = useState<'masculino' | 'femenino'>('femenino')
  const [hoveredArchetype, setHoveredArchetype] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset loaded images when style or gender changes
  useEffect(() => {
    setLoadedImages(new Set())
    setImageErrors(new Set())
  }, [selectedStyle, selectedGender])

  const archetypes = selectedGender === 'masculino' ? archetypesMasculinos : archetypesFemeninos

  return (
    <section id="arquetipos" className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at bottom left, rgba(186, 176, 237, 0.15) 0%, rgba(186, 176, 237, 0.08) 40%, rgba(242, 10, 100, 0.04) 60%, rgba(255, 255, 255, 0) 80%), #FEFEFE'
    }}>
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" style={{ backgroundColor: 'rgba(186, 176, 237, 0.15)' }}></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: 'rgba(242, 10, 100, 0.08)' }}></div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ejoi-gris mb-2 sm:mb-3 md:mb-4">
            Elige tu compañero/a
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
            Cada arquetipo tiene su personalidad única. Encuentra el que mejor se conecte contigo.
          </p>

          {/* Gender selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="inline-flex items-center gap-1 bg-white rounded-full p-0.5 sm:p-1 shadow-sm w-full sm:w-auto" style={{ border: '1px solid rgba(186, 176, 237, 0.2)' }}>
              <button
                onClick={() => setSelectedGender('femenino')}
                className={`min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base flex-1 sm:flex-none ${
                  selectedGender === 'femenino'
                    ? 'text-white shadow-sm'
                    : 'hover:text-ejoi-gris'
                }`}
                style={selectedGender === 'femenino' ? { 
                  backgroundColor: '#F20A64',
                  boxShadow: '0 2px 8px rgba(242, 10, 100, 0.25)'
                } : { 
                  color: 'rgba(60, 60, 59, 0.6)'
                }}
              >
                Femenino
              </button>
              <button
                onClick={() => setSelectedGender('masculino')}
                className={`min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base flex-1 sm:flex-none ${
                  selectedGender === 'masculino'
                    ? 'text-white shadow-sm'
                    : 'hover:text-ejoi-gris'
                }`}
                style={selectedGender === 'masculino' ? { 
                  backgroundColor: '#F20A64',
                  boxShadow: '0 2px 8px rgba(242, 10, 100, 0.25)'
                } : { 
                  color: 'rgba(60, 60, 59, 0.6)'
                }}
              >
                Masculino
              </button>
            </div>

            {/* Style selector */}
            <div className="inline-flex items-center gap-1 bg-white rounded-full p-0.5 sm:p-1 shadow-sm w-full sm:w-auto" style={{ border: '1px solid rgba(186, 176, 237, 0.2)' }}>
              <button
                onClick={() => setSelectedStyle('realista')}
                className={`min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base flex-1 sm:flex-none ${
                  selectedStyle === 'realista'
                    ? 'text-white shadow-sm'
                    : 'hover:text-ejoi-gris'
                }`}
                style={selectedStyle === 'realista' ? { 
                  backgroundColor: '#F20A64',
                  boxShadow: '0 2px 8px rgba(242, 10, 100, 0.25)'
                } : { 
                  color: 'rgba(60, 60, 59, 0.6)'
                }}
              >
                Realista
              </button>
              <button
                onClick={() => setSelectedStyle('anime')}
                className={`min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base flex-1 sm:flex-none ${
                  selectedStyle === 'anime'
                    ? 'text-white shadow-sm'
                    : 'hover:text-ejoi-gris'
                }`}
                style={selectedStyle === 'anime' ? { 
                  backgroundColor: '#F20A64',
                  boxShadow: '0 2px 8px rgba(242, 10, 100, 0.25)'
                } : { 
                  color: 'rgba(60, 60, 59, 0.6)'
                }}
              >
                Anime
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {archetypes.map((archetype) => (
            <div
              key={archetype.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
              style={{ 
                border: '1px solid rgba(186, 176, 237, 0.2)',
                boxShadow: '0 2px 8px rgba(186, 176, 237, 0.08)'
              }}
              onMouseEnter={(e) => {
                setHoveredArchetype(archetype.id)
                e.currentTarget.style.borderColor = 'rgba(242, 10, 100, 0.3)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(186, 176, 237, 0.15), 0 4px 16px rgba(242, 10, 100, 0.1)'
              }}
              onMouseLeave={(e) => {
                setHoveredArchetype(null)
                e.currentTarget.style.borderColor = 'rgba(186, 176, 237, 0.2)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(186, 176, 237, 0.08)'
              }}
            >
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden flex-shrink-0" style={{ backgroundColor: 'rgba(186, 176, 237, 0.05)' }}>
                {/* Loading skeleton */}
                {!loadedImages.has(`${archetype.id}-${selectedStyle}`) && !imageErrors.has(`${archetype.id}-${selectedStyle}`) && (
                  <div className="absolute inset-0 animate-pulse flex items-center justify-center" style={{ 
                    background: 'linear-gradient(90deg, rgba(186, 176, 237, 0.1) 0%, rgba(186, 176, 237, 0.15) 50%, rgba(186, 176, 237, 0.1) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'pulse-soft 2s ease-in-out infinite'
                  }}>
                    <div className="w-20 h-20 rounded-full animate-pulse-soft" style={{ backgroundColor: 'rgba(186, 176, 237, 0.3)' }}></div>
                  </div>
                )}
                
                {/* Error fallback */}
                {imageErrors.has(`${archetype.id}-${selectedStyle}`) ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center p-4">
                      <svg className="w-12 h-12 mx-auto mb-2" style={{ color: 'rgba(60, 60, 59, 0.3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>Imagen no disponible</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={selectedStyle === 'anime' ? archetype.imageAnime : archetype.imageRealista}
                    alt={archetype.name}
                    fill
                    loading="lazy"
                    className={`object-cover transition-all duration-500 ${
                      hoveredArchetype === archetype.id ? 'scale-110' : 'scale-100'
                    } ${loadedImages.has(`${archetype.id}-${selectedStyle}`) ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      objectPosition: isMobile 
                        ? (selectedStyle === 'anime' 
                            ? (archetype.objectPositionAnime || 'center center') 
                            : (archetype.objectPositionRealista || 'center center'))
                        : (selectedStyle === 'anime' 
                            ? (archetype.objectPositionAnime || 'center center') 
                            : (archetype.objectPositionRealista || 'center center')),
                    }}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    onLoad={() => {
                      setLoadedImages(prev => new Set(prev).add(`${archetype.id}-${selectedStyle}`))
                    }}
                    onError={() => {
                      setImageErrors(prev => new Set(prev).add(`${archetype.id}-${selectedStyle}`))
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="flex-1 flex flex-col p-3 sm:p-4 md:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ejoi-gris mb-1.5 sm:mb-2 md:mb-3">
                  {archetype.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed flex-1 mb-3 sm:mb-4" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
                  {archetype.description}
                </p>

                {/* Botón siempre visible */}
                <button
                  onClick={() => {
                    // Crear URL con parámetros para prellenar el formulario
                    const params = new URLSearchParams({
                      arquetipo: archetype.id,
                      genero: selectedGender,
                      estilo: selectedStyle
                    })
                    const url = new URL(window.location.href)
                    url.search = params.toString()
                    window.history.pushState({}, '', url.toString())
                    
                    // Hacer scroll al formulario
                    const formSection = document.getElementById('preregister')
                    formSection?.scrollIntoView({ behavior: 'smooth' })
                    
                    // Disparar evento personalizado para que el formulario se actualice
                    window.dispatchEvent(new CustomEvent('archetypeSelected', {
                      detail: {
                        arquetipo: archetype.id,
                        genero: selectedGender,
                        estilo: selectedStyle
                      }
                    }))
                  }}
                  className="w-full min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 py-2 sm:py-2.5 bg-white font-semibold rounded-full transition-all duration-200 text-xs sm:text-sm md:text-base shadow-sm border hover:shadow-md"
                  style={{ 
                    color: '#F20A64',
                    borderColor: 'rgba(186, 176, 237, 0.2)',
                    backgroundColor: 'rgba(186, 176, 237, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(186, 176, 237, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(186, 176, 237, 0.05)'
                  }}
                >
                  Elegir este arquetipo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

