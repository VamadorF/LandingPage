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
    description: 'Arquetipo de autoridad racional. Presencia pulida, autocontrol, estatus profesional. Atractivo basado en competencia, liderazgo silencioso y fiabilidad. Proyecta decisión sin agresividad.',
    objectPositionRealista: 'center 30%',
    objectPositionAnime: 'center 30%',
  },
  {
    id: 'artesano',
    name: 'El Artesano',
    imageRealista: '/arquetipos/Artesano.png',
    imageAnime: '/anime/Anime_artesano.png',
    description: 'Arquetipo de masculinidad constructiva. Manos que crean, foco, paciencia. Atractivo por habilidad tangible, constancia y conexión con lo material. Seguridad que nace del hacer, no del mostrar.',
    objectPositionRealista: 'center 40%',
    objectPositionAnime: 'center 40%',
  },
  {
    id: 'intelectual',
    name: 'El Intelectual',
    imageRealista: '/arquetipos/Intelectual.png',
    imageAnime: '/anime/Anime_intelectual.png',
    description: 'Arquetipo de profundidad reflexiva. Estética cuidada, apertura emocional, curiosidad cultural. Atractivo por escucha, criterio propio y mundo interno articulado. Calma, cercanía y respeto.',
    objectPositionRealista: 'center 35%',
    objectPositionAnime: 'center 35%',
  },
  {
    id: 'protector',
    name: 'El Protector',
    imageRealista: '/arquetipos/Protector.png',
    imageAnime: '/anime/Anime_Protector.jpg',
    description: 'Arquetipo de fuerza disciplinada. Cuerpo como herramienta de servicio, orden y vigilancia. Atractivo por sensación de resguardo, control bajo presión y presencia física dominante pero contenida.',
    objectPositionRealista: 'center 35%',
    objectPositionAnime: 'center 35%',
  },
]

export default function Archetypes() {
  const [selectedStyle, setSelectedStyle] = useState<'realista' | 'anime'>('realista')
  const [selectedGender, setSelectedGender] = useState<'masculino' | 'femenino'>('femenino')
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

  const archetypes = selectedGender === 'masculino' ? archetypesMasculinos : archetypesFemeninos

  return (
    <section id="arquetipos" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#F5F5F5] to-[#F3F0FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#424242] mb-3 sm:mb-4">
            Elige tu compañero/a
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#9E9E9E] max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Cada arquetipo tiene su personalidad única. Encuentra el que mejor se conecte contigo.
          </p>

          {/* Gender selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1 sm:gap-2 bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setSelectedGender('femenino')}
                className={`min-h-[44px] px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  selectedGender === 'femenino'
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#F06292] text-white shadow-md'
                    : 'text-[#9E9E9E] hover:text-[#424242]'
                }`}
              >
                Femenino
              </button>
              <button
                onClick={() => setSelectedGender('masculino')}
                className={`min-h-[44px] px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  selectedGender === 'masculino'
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#F06292] text-white shadow-md'
                    : 'text-[#9E9E9E] hover:text-[#424242]'
                }`}
              >
                Masculino
              </button>
            </div>

            {/* Style selector */}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {archetypes.map((archetype) => (
            <div
              key={archetype.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
              onMouseEnter={() => setHoveredArchetype(archetype.id)}
              onMouseLeave={() => setHoveredArchetype(null)}
            >
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden flex-shrink-0">
                <Image
                  src={selectedStyle === 'anime' ? archetype.imageAnime : archetype.imageRealista}
                  alt={archetype.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredArchetype === archetype.id ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    objectPosition: isMobile 
                      ? (selectedStyle === 'anime' 
                          ? (archetype.objectPositionAnime || 'center center') 
                          : (archetype.objectPositionRealista || 'center center'))
                      : (selectedStyle === 'anime' 
                          ? (archetype.objectPositionAnime || 'center center') 
                          : (archetype.objectPositionRealista || 'center center')),
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="flex-1 flex flex-col p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#424242] mb-2 sm:mb-3">
                  {archetype.name}
                </h3>
                <p className="text-sm sm:text-base text-[#9E9E9E] leading-relaxed flex-1 mb-4">
                  {archetype.description}
                </p>

                {/* Botón siempre visible */}
                <button
                  onClick={() => {
                    const formSection = document.getElementById('preregister')
                    formSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 sm:py-2 bg-white text-[#E91E63] font-semibold rounded-full hover:bg-[#F3F0FA] transition-colors duration-200 text-sm sm:text-base shadow-md border border-[#F3F0FA]"
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

