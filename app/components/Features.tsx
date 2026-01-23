'use client'

export default function Features() {
  const features = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      ),
      title: 'Conversación bidireccional',
      description: 'Interacción natural de texto que fluye como una conversación real. Tu compañera entiende contexto y mantiene la coherencia en cada mensaje.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      ),
      title: 'Entrada por voz opcional',
      description: 'Dicta tus mensajes de forma natural. La tecnología convierte tu voz en texto para una experiencia más fluida y cómoda.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      title: 'Memoria persistente',
      description: 'Sistema de memoria inteligente que guarda lo importante: datos factuales (gustos, preferencias), episodios (historias compartidas) y contexto semántico para recuperar lo relevante en el momento correcto.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      ),
      title: 'Avatar persistente',
      description: 'Tu compañera tiene una presencia visual constante. Elige entre estilo realista o anime, y tu avatar estará siempre visible durante la conversación, creando una conexión más profunda.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ),
      title: 'Privacidad y control',
      description: 'Tú decides qué se recuerda y qué no. Control total sobre tu información personal y la relación que construyes con tu compañera virtual.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      title: 'Relación continua',
      description: 'No más conversaciones que se reinician. Tu compañera evoluciona contigo, recordando hitos importantes y construyendo una narrativa compartida que crece con el tiempo.',
    },
  ]

  return (
    <section id="caracteristicas" className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{ 
      background: 'radial-gradient(ellipse at top right, rgba(186, 176, 237, 0.10) 0%, rgba(186, 176, 237, 0.05) 40%, rgba(255, 255, 255, 0) 70%), #FEFEFE'
    }}>
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ backgroundColor: 'rgba(186, 176, 237, 0.12)' }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-15" style={{ backgroundColor: 'rgba(242, 10, 100, 0.06)' }}></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ejoi-gris mb-2 sm:mb-3 md:mb-4">
            Características principales
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
            Una experiencia diseñada para crear hábito y apego mediante continuidad emocional
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border group"
              style={{ 
                borderColor: 'rgba(186, 176, 237, 0.2)',
                boxShadow: '0 2px 8px rgba(186, 176, 237, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(242, 10, 100, 0.3)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(186, 176, 237, 0.15), 0 4px 12px rgba(242, 10, 100, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(186, 176, 237, 0.2)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(186, 176, 237, 0.08)'
              }}
            >
              <div className="mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: '#F20A64' }}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-ejoi-gris mb-1.5 sm:mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

