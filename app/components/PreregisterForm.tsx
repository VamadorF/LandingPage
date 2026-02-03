'use client'

import { useState, FormEvent, startTransition, useEffect } from 'react'
import { submitPreregistro } from '@/app/actions/preregistro'
import { openLegalModal } from './legalHub'

interface FormData {
  nombre: string
  email: string
  arquetipo: string
  estilo: 'realista' | 'anime'
  generoAvatar?: 'masculino' | 'femenino'
  aceptaTerminos: boolean
}

export default function PreregisterForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    arquetipo: '',
    estilo: 'realista',
    generoAvatar: undefined,
    aceptaTerminos: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Leer parámetros de URL y escuchar eventos personalizados
  useEffect(() => {
    // Función para actualizar el formulario con los datos
    const updateFormFromParams = () => {
      const params = new URLSearchParams(window.location.search)
      const arquetipo = params.get('arquetipo')
      const genero = params.get('genero') as 'masculino' | 'femenino' | null
      const estilo = params.get('estilo') as 'realista' | 'anime' | null

      if (arquetipo || genero || estilo) {
        setFormData(prev => ({
          ...prev,
          ...(arquetipo && { arquetipo }),
          ...(genero && { generoAvatar: genero }),
          ...(estilo && { estilo }),
        }))
        // Limpiar errores relacionados
        setErrors(prev => {
          const newErrors = { ...prev }
          if (arquetipo) delete newErrors.arquetipo
          if (genero) delete newErrors.generoAvatar
          return newErrors
        })
      }
    }

    // Leer parámetros iniciales
    updateFormFromParams()

    // Escuchar evento personalizado cuando se selecciona un arquetipo
    const handleArchetypeSelected = (event: CustomEvent) => {
      const { arquetipo, genero, estilo } = event.detail
      setFormData(prev => ({
        ...prev,
        arquetipo: arquetipo || prev.arquetipo,
        generoAvatar: genero || prev.generoAvatar,
        estilo: estilo || prev.estilo,
      }))
      // Limpiar errores relacionados
      setErrors(prev => {
        const newErrors = { ...prev }
        if (arquetipo) delete newErrors.arquetipo
        if (genero) delete newErrors.generoAvatar
        return newErrors
      })
    }

    window.addEventListener('archetypeSelected', handleArchetypeSelected as EventListener)

    // Escuchar cambios en la URL (por si se navega con botones del navegador)
    const handlePopState = () => {
      updateFormFromParams()
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('archetypeSelected', handleArchetypeSelected as EventListener)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const archetypesFemeninos = [
    { id: 'anfitriona', name: 'La Anfitriona' },
    { id: 'ejecutiva', name: 'La Ejecutiva' },
    { id: 'musa', name: 'La Musa' },
    { id: 'porrista', name: 'La Porrista' },
    { id: 'otro', name: 'Otro...' },
  ]

  const archetypesMasculinos = [
    { id: 'ejecutivo', name: 'El Ejecutivo' },
    { id: 'artesano', name: 'El Artesano' },
    { id: 'intelectual', name: 'El Intelectual' },
    { id: 'protector', name: 'El Protector' },
    { id: 'otro', name: 'Otro...' },
  ]

  const archetypes = formData.generoAvatar === 'masculino' 
    ? archetypesMasculinos 
    : formData.generoAvatar === 'femenino'
    ? archetypesFemeninos
    : []

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.generoAvatar) {
      newErrors.generoAvatar = 'Debes seleccionar un género de avatar'
    }

    if (!formData.arquetipo) {
      newErrors.arquetipo = 'Debes seleccionar un arquetipo'
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Limpiar estados anteriores
    setSubmitStatus('idle')
    setErrorMessage('')
    setIsSubmitting(true)

    startTransition(async () => {
      try {
        const result = await submitPreregistro({
          nombre: formData.nombre,
          email: formData.email,
          arquetipo: formData.arquetipo,
          estilo: formData.estilo,
          generoAvatar: formData.generoAvatar,
          aceptaTerminos: formData.aceptaTerminos,
        })

        if (result.ok) {
      setSubmitStatus('success')
      setFormData({
        nombre: '',
        email: '',
        arquetipo: '',
        estilo: 'realista',
        generoAvatar: undefined,
        aceptaTerminos: false,
      })
        } else {
          setSubmitStatus('error')
          setErrorMessage(result.message || 'Error al enviar el formulario')
        }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Error inesperado. Por favor, intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
    })
  }

  const handleChange = (field: keyof FormData, value: string | boolean | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="preregister" className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{ 
      background: 'radial-gradient(ellipse at top left, rgba(186, 176, 237, 0.12) 0%, rgba(186, 176, 237, 0.06) 50%, rgba(255, 255, 255, 0) 80%), #FEFEFE'
    }}>
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ backgroundColor: 'rgba(242, 10, 100, 0.08)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-15" style={{ backgroundColor: 'rgba(186, 176, 237, 0.10)' }}></div>
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ejoi-gris mb-2 sm:mb-3 md:mb-4">
            Preregístrate ahora
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl px-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
            Sé uno de los primeros en experimentar eJoi. Reserva tu lugar hoy.
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 border" style={{ 
          borderColor: 'rgba(186, 176, 237, 0.15)',
          boxShadow: '0 4px 16px rgba(186, 176, 237, 0.08)'
        }}>
          {submitStatus === 'success' ? (
            <div className="space-y-8">
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse" style={{ backgroundColor: 'rgba(242, 10, 100, 0.12)' }}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#F20A64' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-ejoi-gris mb-3">
                  ¡Preregistro exitoso! 🎉
                </h3>
                <p className="text-lg mb-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
                  ¡Gracias por unirte a esta aventura!
                </p>
                <p className="text-base mb-8" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
                  Te contactaremos pronto con más información sobre el lanzamiento.
                </p>
              </div>

              {/* Sección de pago con Ko-fi - Más emotiva */}
              <div className="rounded-2xl p-8 sm:p-10 border transform transition-all duration-300 hover:shadow-md" style={{
                backgroundColor: 'rgba(186, 176, 237, 0.08)',
                borderColor: 'rgba(242, 10, 100, 0.2)',
                boxShadow: '0 4px 16px rgba(186, 176, 237, 0.12)'
              }}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-sm animate-bounce" style={{ backgroundColor: '#F20A64' }}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-ejoi-gris mb-4">
                    💝 Elige tu plan y apoya el proyecto
                  </h3>
                  <p className="text-base sm:text-lg text-ejoi-gris max-w-2xl mx-auto mb-2 font-medium">
                    Tu apoyo significa el mundo para nosotros
                  </p>
                  <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
                    Selecciona el plan de eJoi que mejor se adapte a ti y contribuye al desarrollo del proyecto. 
                    Cada apoyo nos acerca más a hacer de eJoi una realidad. ¡Gracias por ser parte de esta historia! ✨
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-5">
                  <a
                    href="https://ko-fi.com/ejoi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-lg sm:text-xl"
                    style={{ 
                      backgroundColor: '#F20A64',
                      boxShadow: '0 4px 14px rgba(242, 10, 100, 0.25)'
                    }}
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.881 8.948c-.169-4.225-3.663-7.599-7.881-7.599-4.317 0-7.713 3.521-7.881 7.599-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.168 4.078 3.564 7.599 7.881 7.599 4.218 0 7.712-3.374 7.881-7.599.052-.52.052-.52.052-1.052 0-.532 0-.532-.052-1.052zm-1.904 1.104c-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.126 3.126-2.438 5.699-5.526 5.699-3.087 0-5.652-2.573-5.777-5.699-.052-.52-.052-.52-.052-1.052 0-.532 0-.532.052-1.052.125-3.126 2.69-5.699 5.777-5.699 3.088 0 5.652 2.573 5.526 5.699z"/>
                      <path d="M12.029 5.111c-1.916 0-3.47 1.554-3.47 3.47s1.554 3.47 3.47 3.47 3.47-1.554 3.47-3.47-1.554-3.47-3.47-3.47zm0 5.888c-1.333 0-2.418-1.085-2.418-2.418s1.085-2.418 2.418-2.418 2.418 1.085 2.418 2.418-1.085 2.418-2.418 2.418z"/>
                    </svg>
                    Ver planes en Ko-fi
                  </a>
                  <p className="text-xs sm:text-sm text-center max-w-md" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
                    Al hacer clic, serás redirigido a Ko-fi donde podrás elegir tu plan y realizar el pago de forma segura.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2 font-semibold transition-colors"
                  style={{ color: '#F20A64' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgba(242, 10, 100, 0.8)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#F20A64'
                  }}
                >
                  Enviar otro preregistro
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Nombre completo */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-ejoi-gris mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.nombre ? 'border-red-500' : ''
                  } focus:ring-2 focus:border-transparent transition-all`}
                  style={errors.nombre ? {} : { 
                    borderColor: 'rgba(186, 176, 237, 0.2)'
                  }}
                  onFocus={(e) => {
                    if (!errors.nombre) {
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(242, 10, 100, 0.3)'
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ejoi-gris mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.email ? 'border-red-500' : ''
                  } focus:ring-2 focus:border-transparent transition-all`}
                  style={errors.email ? {} : { 
                    borderColor: 'rgba(186, 176, 237, 0.2)'
                  }}
                  onFocus={(e) => {
                    if (!errors.email) {
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(242, 10, 100, 0.3)'
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Estilo */}
              <div>
                <label className="block text-sm font-medium text-ejoi-gris mb-3">
                  Estilo de avatar <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center min-h-[44px] cursor-pointer">
                    <input
                      type="radio"
                      name="estilo"
                      value="realista"
                      checked={formData.estilo === 'realista'}
                      onChange={(e) => handleChange('estilo', e.target.value)}
                      className="mr-3 w-5 h-5 cursor-pointer"
                      style={{ accentColor: '#F20A64' }}
                    />
                    <span className="text-base text-ejoi-gris">Realista</span>
                  </label>
                  <label className="flex items-center min-h-[44px] cursor-pointer">
                    <input
                      type="radio"
                      name="estilo"
                      value="anime"
                      checked={formData.estilo === 'anime'}
                      onChange={(e) => handleChange('estilo', e.target.value)}
                      className="mr-3 w-5 h-5 cursor-pointer"
                      style={{ accentColor: '#F20A64' }}
                    />
                    <span className="text-base text-ejoi-gris">Anime</span>
                  </label>
                </div>
              </div>

              {/* Género de avatar */}
              <div>
                <label className="block text-sm font-medium text-ejoi-gris mb-3">
                  Género de avatar preferido <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center min-h-[44px] cursor-pointer">
                    <input
                      type="radio"
                      name="generoAvatar"
                      value="femenino"
                      checked={formData.generoAvatar === 'femenino'}
                      onChange={(e) => {
                        const value = e.target.value === 'femenino' ? 'femenino' : undefined
                        handleChange('generoAvatar', value)
                        // Reset arquetipo cuando cambia el género
                        if (formData.arquetipo) {
                          handleChange('arquetipo', '')
                        }
                      }}
                      className="mr-3 w-5 h-5 cursor-pointer"
                      style={{ accentColor: '#F20A64' }}
                    />
                    <span className="text-base text-ejoi-gris">Femenino</span>
                  </label>
                  <label className="flex items-center min-h-[44px] cursor-pointer">
                    <input
                      type="radio"
                      name="generoAvatar"
                      value="masculino"
                      checked={formData.generoAvatar === 'masculino'}
                      onChange={(e) => {
                        const value = e.target.value === 'masculino' ? 'masculino' : undefined
                        handleChange('generoAvatar', value)
                        // Reset arquetipo cuando cambia el género
                        if (formData.arquetipo) {
                          handleChange('arquetipo', '')
                        }
                      }}
                      className="mr-3 w-5 h-5 cursor-pointer"
                      style={{ accentColor: '#F20A64' }}
                    />
                    <span className="text-base text-ejoi-gris">Masculino</span>
                  </label>
                </div>
                {errors.generoAvatar && (
                  <p className="mt-1 text-sm text-red-500">{errors.generoAvatar}</p>
                )}
              </div>

              {/* Arquetipo */}
              <div>
                <label htmlFor="arquetipo" className="block text-sm font-medium text-ejoi-gris mb-2">
                  Personalidad preferida <span className="text-red-500">*</span>
                </label>
                <select
                  id="arquetipo"
                  value={formData.arquetipo}
                  onChange={(e) => handleChange('arquetipo', e.target.value)}
                  disabled={!formData.generoAvatar}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.arquetipo ? 'border-red-500' : ''
                  } focus:ring-2 focus:border-transparent transition-all ${
                    !formData.generoAvatar ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={errors.arquetipo ? {} : { 
                    borderColor: 'rgba(186, 176, 237, 0.2)',
                    backgroundColor: !formData.generoAvatar ? 'rgba(186, 176, 237, 0.05)' : 'white'
                  }}
                  onFocus={(e) => {
                    if (!errors.arquetipo && formData.generoAvatar) {
                      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(242, 10, 100, 0.3)'
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <option value="">
                    {formData.generoAvatar ? 'Tu personalidad más querida' : 'Primero selecciona un género'}
                  </option>
                  {archetypes.map((arch) => (
                    <option key={arch.id} value={arch.id}>
                      {arch.name}
                    </option>
                  ))}
                </select>
                {errors.arquetipo && (
                  <p className="mt-1 text-sm text-red-500">{errors.arquetipo}</p>
                )}
                {!formData.generoAvatar && (
                  <p className="mt-1 text-sm" style={{ color: 'rgba(60, 60, 59, 0.6)' }}>
                    Por favor, selecciona primero un género de avatar para habilitar esta opción
                  </p>
                )}
              </div>

              {/* Términos y condiciones */}
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.aceptaTerminos}
                    onChange={(e) => handleChange('aceptaTerminos', e.target.checked)}
                    className={`mt-1 mr-3 w-5 h-5 cursor-pointer flex-shrink-0 ${
                      errors.aceptaTerminos ? 'border-red-500' : ''
                    }`}
                    style={{ accentColor: '#F20A64' }}
                  />
                  <span className="text-sm sm:text-base text-ejoi-gris leading-relaxed">
                    Acepto los{' '}
                    <button type="button" onClick={() => openLegalModal('terms')} className="hover:underline" style={{ color: '#F20A64' }}>
                      términos y condiciones
                    </button>{' '}
                    y la{' '}
                    <button type="button" onClick={() => openLegalModal('privacy')} className="hover:underline" style={{ color: '#F20A64' }}>
                      política de privacidad
                    </button>{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.aceptaTerminos && (
                  <p className="mt-1 text-sm text-red-500">{errors.aceptaTerminos}</p>
                )}
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
                style={{ 
                  backgroundColor: '#F20A64',
                  boxShadow: '0 4px 14px rgba(242, 10, 100, 0.25)'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Confirmar preregistro'
                )}
              </button>

              {submitStatus === 'error' && errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">
                    {errorMessage}
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
