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

const archetypes: Archetype[] = [
  {
    id: 'anfitriona',
    name: 'La Anfitriona',
    imageRealista: '/arquetipos/Anfitriona.jpg',
    imageAnime: '/anime/Anime_anfitriona.png',
    description: 'Cálida, acogedora y siempre atenta. Perfecta para quienes buscan compañía reconfortante y conversaciones que nutren el alma.',
    objectPositionRealista: 'center 25%',
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
    objectPositionRealista: 'center 25%',
    objectPositionAnime: 'center 25%',
  },
]

export default function Archetypes() {
  const [selectedStyle, setSelectedStyle] = useState<'realista' | 'anime'>('realista')
  const [hoveredArchetype, setHoveredArchetype] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="arquetipos" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#F5F5F5] to-[#F3F0FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#424242] mb-3 sm:mb-4">
            Elige tu compañera
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#9E9E9E] max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Cada arquetipo tiene su personalidad única. Encuentra la que mejor se conecte contigo.
          </p>

          {/* Style selector - preparado para futuro */}
          <div className="inline-flex items-center gap-1 sm:gap-2 bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setSelectedStyle('realista')}
              className={`min-h-[44px] px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                selectedStyle === 'realista'
                  ? 'bg-gradient-to-r from-[#E91E63] to-[#F06292] text-white shadow-md'
                  : 'text-[#9E9E9E] hover:text-[#424242]'
              }`}
            >
              Realista
            </button>
            <button
              onClick={() => setSelectedStyle('anime')}
              className={`min-h-[44px] px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                selectedStyle === 'anime'
                  ? 'bg-gradient-to-r from-[#E91E63] to-[#F06292] text-white shadow-md'
                  : 'text-[#9E9E9E] hover:text-[#424242]'
            }`}
            >
              Anime
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {archetypes.map((archetype) => (
            <div
              key={archetype.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredArchetype(archetype.id)}
              onMouseLeave={() => setHoveredArchetype(null)}
            >
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                <Image
                  src={selectedStyle === 'anime' ? archetype.imageAnime : archetype.imageRealista}
                  alt={archetype.name}
                  fill
                  className={`object-cover object-center transition-transform duration-500 ${
                    hoveredArchetype === archetype.id ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    objectPosition: isMobile 
                      ? (selectedStyle === 'anime' 
                          ? (archetype.objectPositionAnime || 'center') 
                          : (archetype.objectPositionRealista || 'center'))
                      : 'center',
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-4 sm:p-6 pb-20 sm:pb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#424242] mb-2 sm:mb-3">
                  {archetype.name}
                </h3>
                <p className="text-sm sm:text-base text-[#9E9E9E] leading-relaxed">
                  {archetype.description}
                </p>
              </div>

              {/* Botón siempre visible en móvil, hover en desktop */}
              <div className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 ${
                hoveredArchetype === archetype.id 
                  ? 'block' 
                  : 'block sm:hidden'
              }`}>
                <button
                  onClick={() => {
                    const formSection = document.getElementById('preregister')
                    formSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 sm:py-2 bg-white text-[#E91E63] font-semibold rounded-full hover:bg-[#F3F0FA] transition-colors duration-200 text-sm sm:text-base shadow-md sm:shadow-none"
                >
                  Elegir esta compañera
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

