'use client'

import { useState, FormEvent } from 'react'

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

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Conectar con API backend cuando esté disponible
      // const response = await fetch('/api/preregister', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus('success')
      setFormData({
        nombre: '',
        email: '',
        arquetipo: '',
        estilo: 'realista',
        generoAvatar: undefined,
        aceptaTerminos: false,
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string | boolean | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="preregister" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#424242] mb-3 sm:mb-4">
            Preregístrate ahora
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#9E9E9E] px-2">
            Sé uno de los primeros en experimentar eJoi. Reserva tu lugar hoy.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-[#F5F5F5] rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 lg:p-12 border border-[#F3F0FA]">
          {submitStatus === 'success' ? (
            <div className="space-y-8">
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#424242] mb-3">
                  ¡Preregistro exitoso! 🎉
                </h3>
                <p className="text-lg text-[#9E9E9E] mb-2">
                  ¡Gracias por unirte a esta aventura!
                </p>
                <p className="text-base text-[#9E9E9E] mb-8">
                  Te contactaremos pronto con más información sobre el lanzamiento.
                </p>
              </div>

              {/* Sección de pago con Ko-fi - Más emotiva */}
              <div className="bg-gradient-to-br from-[#F3F0FA] via-[#EDE7F6] to-[#F8BBD0] rounded-2xl p-8 sm:p-10 border-2 border-[#F06292] shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#E91E63] via-[#F06292] to-[#F8BBD0] rounded-full mb-6 shadow-lg animate-bounce">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#424242] mb-4">
                    💝 Elige tu plan y apoya el proyecto
                  </h3>
                  <p className="text-base sm:text-lg text-[#424242] max-w-2xl mx-auto mb-2 font-medium">
                    Tu apoyo significa el mundo para nosotros
                  </p>
                  <p className="text-sm sm:text-base text-[#757575] max-w-2xl mx-auto">
                    Selecciona el plan de eJoi que mejor se adapte a ti y contribuye al desarrollo del proyecto. 
                    Cada apoyo nos acerca más a hacer de eJoi una realidad. ¡Gracias por ser parte de esta historia! ✨
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-5">
                  <a
                    href="https://ko-fi.com/ejoi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#E91E63] via-[#F06292] to-[#F8BBD0] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 text-lg sm:text-xl"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.881 8.948c-.169-4.225-3.663-7.599-7.881-7.599-4.317 0-7.713 3.521-7.881 7.599-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.168 4.078 3.564 7.599 7.881 7.599 4.218 0 7.712-3.374 7.881-7.599.052-.52.052-.52.052-1.052 0-.532 0-.532-.052-1.052zm-1.904 1.104c-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.126 3.126-2.438 5.699-5.526 5.699-3.087 0-5.652-2.573-5.777-5.699-.052-.52-.052-.52-.052-1.052 0-.532 0-.532.052-1.052.125-3.126 2.69-5.699 5.777-5.699 3.088 0 5.652 2.573 5.526 5.699z"/>
                      <path d="M12.029 5.111c-1.916 0-3.47 1.554-3.47 3.47s1.554 3.47 3.47 3.47 3.47-1.554 3.47-3.47-1.554-3.47-3.47-3.47zm0 5.888c-1.333 0-2.418-1.085-2.418-2.418s1.085-2.418 2.418-2.418 2.418 1.085 2.418 2.418-1.085 2.418-2.418 2.418z"/>
                    </svg>
                    Ver planes en Ko-fi
                  </a>
                  <p className="text-xs sm:text-sm text-[#9E9E9E] text-center max-w-md">
                    Al hacer clic, serás redirigido a Ko-fi donde podrás elegir tu plan y realizar el pago de forma segura.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2 text-[#E91E63] font-semibold hover:text-[#F06292] transition-colors"
                >
                  Enviar otro preregistro
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Nombre completo */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-[#424242] mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.nombre ? 'border-red-500' : 'border-[#F5F5F5]'
                  } focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all`}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#424242] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.email ? 'border-red-500' : 'border-[#F5F5F5]'
                  } focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Estilo */}
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-3">
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
                      className="mr-3 w-5 h-5 text-[#E91E63] focus:ring-[#E91E63] cursor-pointer"
                    />
                    <span className="text-base text-[#424242]">Realista</span>
                  </label>
                  <label className="flex items-center min-h-[44px] cursor-pointer">
                    <input
                      type="radio"
                      name="estilo"
                      value="anime"
                      checked={formData.estilo === 'anime'}
                      onChange={(e) => handleChange('estilo', e.target.value)}
                      className="mr-3 w-5 h-5 text-[#E91E63] focus:ring-[#E91E63] cursor-pointer"
                    />
                    <span className="text-base text-[#424242]">Anime</span>
                  </label>
                </div>
              </div>

              {/* Género de avatar */}
              <div>
                <label className="block text-sm font-medium text-[#424242] mb-3">
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
                      className="mr-3 w-5 h-5 text-[#E91E63] focus:ring-[#E91E63] cursor-pointer"
                    />
                    <span className="text-base text-[#424242]">Femenino</span>
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
                      className="mr-3 w-5 h-5 text-[#E91E63] focus:ring-[#E91E63] cursor-pointer"
                    />
                    <span className="text-base text-[#424242]">Masculino</span>
                  </label>
                </div>
                {errors.generoAvatar && (
                  <p className="mt-1 text-sm text-red-500">{errors.generoAvatar}</p>
                )}
              </div>

              {/* Arquetipo */}
              <div>
                <label htmlFor="arquetipo" className="block text-sm font-medium text-[#424242] mb-2">
                  Personalidad preferida <span className="text-red-500">*</span>
                </label>
                <select
                  id="arquetipo"
                  value={formData.arquetipo}
                  onChange={(e) => handleChange('arquetipo', e.target.value)}
                  disabled={!formData.generoAvatar}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.arquetipo ? 'border-red-500' : 'border-[#F5F5F5]'
                  } focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all bg-white ${
                    !formData.generoAvatar ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
                  }`}
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
                  <p className="mt-1 text-sm text-[#9E9E9E]">
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
                    className={`mt-1 mr-3 w-5 h-5 text-[#E91E63] focus:ring-[#E91E63] cursor-pointer flex-shrink-0 ${
                      errors.aceptaTerminos ? 'border-red-500' : ''
                    }`}
                  />
                  <span className="text-sm sm:text-base text-[#424242] leading-relaxed">
                    Acepto los{' '}
                    <a href="#terminos" className="text-[#E91E63] hover:underline">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="#privacidad" className="text-[#E91E63] hover:underline">
                      política de privacidad
                    </a>{' '}
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
                className="w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#E91E63] to-[#F06292] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
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

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">
                    Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
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

