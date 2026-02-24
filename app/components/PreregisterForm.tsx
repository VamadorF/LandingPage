'use client'

import { useState, FormEvent, startTransition, useEffect } from 'react'
import { submitPreregistro } from '@/app/actions/preregistro'
import { openLegalModal } from './legalHub'
import {
  type PreregistroFormData,
  type PreregistroFormErrors,
  BUSCA_OPTIONS,
  DISPOSICION_OPTIONS,
  isPreregistroFormValid,
  validatePreregistroForm,
  validateField,
} from '@/lib/validations/preregistro'

export default function PreregisterForm() {
  const [formData, setFormData] = useState<PreregistroFormData>({
    nombre: '',
    email: '',
    arquetipo: '',
    estilo: 'realista',
    generoAvatar: undefined,
    aceptaTerminos: false,
    busca: null,
    disposicion_pago: null,
  })

  const [errors, setErrors] = useState<PreregistroFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Leer parámetros de URL y escuchar eventos personalizados
  useEffect(() => {
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
        setErrors(prev => {
          const next = { ...prev }
          if (arquetipo) delete next.arquetipo
          if (genero) delete next.generoAvatar
          return next
        })
      }
    }

    updateFormFromParams()

    const handleArchetypeSelected = (event: CustomEvent) => {
      const { arquetipo, genero, estilo } = event.detail
      setFormData(prev => ({
        ...prev,
        arquetipo: arquetipo || prev.arquetipo,
        generoAvatar: genero || prev.generoAvatar,
        estilo: estilo || prev.estilo,
      }))
      setErrors(prev => {
        const next = { ...prev }
        if (arquetipo) delete next.arquetipo
        if (genero) delete next.generoAvatar
        return next
      })
    }

    window.addEventListener('archetypeSelected', handleArchetypeSelected as EventListener)
    window.addEventListener('popstate', updateFormFromParams)

    return () => {
      window.removeEventListener('archetypeSelected', handleArchetypeSelected as EventListener)
      window.removeEventListener('popstate', updateFormFromParams)
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

  const archetypes =
    formData.generoAvatar === 'masculino'
      ? archetypesMasculinos
      : formData.generoAvatar === 'femenino'
        ? archetypesFemeninos
        : []

  // Derivado: habilita/deshabilita el botón
  const isFormValid = isPreregistroFormValid(formData)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validatePreregistroForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

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
          busca: formData.busca ?? null,
          disposicion_pago: formData.disposicion_pago ?? null,
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
            busca: null,
            disposicion_pago: null,
          })
        } else {
          setSubmitStatus('error')
          if ('fieldErrors' in result && result.fieldErrors) {
            setErrors(prev => ({ ...prev, ...(result as any).fieldErrors }))
          }
          setErrorMessage(result.message || 'Error al enviar el formulario')
        }
      } catch {
        setSubmitStatus('error')
        setErrorMessage('Error inesperado. Por favor, intenta nuevamente.')
      } finally {
        setIsSubmitting(false)
      }
    })
  }

  const handleChange = (
    field: keyof PreregistroFormData,
    value: string | boolean | undefined | null
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo al empezar a modificarlo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Valida un campo individual al perder el foco
  const handleBlur = (field: keyof PreregistroFormData) => {
    const message = validateField(field, formData)
    setErrors(prev => ({ ...prev, [field]: message }))
  }

  // ── Estilos reutilizables ───────────────────────────────────────────────
  const inputBase =
    'w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] focus:ring-2 focus:border-transparent transition-all'
  const inputDisabledCls = isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
  const borderNormal = { borderColor: 'rgba(186, 176, 237, 0.2)' }
  const focusRing = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!isSubmitting) e.currentTarget.style.boxShadow = '0 0 0 2px rgba(242, 10, 100, 0.3)'
  }
  const blurRing = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <section
      id="preregister"
      className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at top left, rgba(186, 176, 237, 0.12) 0%, rgba(186, 176, 237, 0.06) 50%, rgba(255, 255, 255, 0) 80%), #FEFEFE',
      }}
    >
      {/* Elementos decorativos */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        style={{ backgroundColor: 'rgba(242, 10, 100, 0.08)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        style={{ backgroundColor: 'rgba(186, 176, 237, 0.10)' }}
      />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ejoi-gris mb-2 sm:mb-3 md:mb-4">
            Preregístrate ahora
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl px-2"
            style={{ color: 'rgba(60, 60, 59, 0.7)' }}
          >
            Sé uno de los primeros en experimentar eJoi. Reserva tu lugar hoy.
          </p>
        </div>

        <div
          className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 border"
          style={{
            borderColor: 'rgba(186, 176, 237, 0.15)',
            boxShadow: '0 4px 16px rgba(186, 176, 237, 0.08)',
          }}
        >
          {submitStatus === 'success' ? (
            <div className="space-y-8">
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
                  style={{ backgroundColor: 'rgba(242, 10, 100, 0.12)' }}
                >
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: '#F20A64' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-ejoi-gris mb-3">
                  ¡Preregistro exitoso! 🎉
                </h3>
                <p className="text-lg mb-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
                  ¡Gracias por unirte a esta aventura!
                </p>
                <p className="text-base mb-2" style={{ color: 'rgba(60, 60, 59, 0.7)' }}>
                  Te contactaremos pronto con más información sobre el lanzamiento.
                </p>
                <p className="text-sm" style={{ color: 'rgba(60, 60, 59, 0.55)' }}>
                  Revisa tu bandeja de entrada (y la carpeta de spam) para el email de confirmación.
                </p>
              </div>

              {/* Ko-fi */}
              <div
                className="rounded-2xl p-8 sm:p-10 border transform transition-all duration-300 hover:shadow-md"
                style={{
                  backgroundColor: 'rgba(186, 176, 237, 0.08)',
                  borderColor: 'rgba(242, 10, 100, 0.2)',
                  boxShadow: '0 4px 16px rgba(186, 176, 237, 0.12)',
                }}
              >
                <div className="text-center mb-8">
                  <div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-sm animate-bounce"
                    style={{ backgroundColor: '#F20A64' }}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-ejoi-gris mb-4">
                    💝 Elige tu plan y apoya el proyecto
                  </h3>
                  <p className="text-base sm:text-lg text-ejoi-gris max-w-2xl mx-auto mb-2 font-medium">
                    Tu apoyo significa el mundo para nosotros
                  </p>
                  <p
                    className="text-sm sm:text-base max-w-2xl mx-auto"
                    style={{ color: 'rgba(60, 60, 59, 0.7)' }}
                  >
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
                      boxShadow: '0 4px 14px rgba(242, 10, 100, 0.25)',
                    }}
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.881 8.948c-.169-4.225-3.663-7.599-7.881-7.599-4.317 0-7.713 3.521-7.881 7.599-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.168 4.078 3.564 7.599 7.881 7.599 4.218 0 7.712-3.374 7.881-7.599.052-.52.052-.52.052-1.052 0-.532 0-.532-.052-1.052zm-1.904 1.104c-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.126 3.126-2.438 5.699-5.526 5.699-3.087 0-5.652-2.573-5.777-5.699-.052-.52-.052-.52-.052-1.052 0-.532 0-.532.052-1.052.125-3.126 2.69-5.699 5.777-5.699 3.088 0 5.652 2.573 5.526 5.699z" />
                      <path d="M12.029 5.111c-1.916 0-3.47 1.554-3.47 3.47s1.554 3.47 3.47 3.47 3.47-1.554 3.47-3.47-1.554-3.47-3.47-3.47zm0 5.888c-1.333 0-2.418-1.085-2.418-2.418s1.085-2.418 2.418-2.418 2.418 1.085 2.418 2.418-1.085 2.418-2.418 2.418z" />
                    </svg>
                    Ver planes en Ko-fi
                  </a>
                  <p
                    className="text-xs sm:text-sm text-center max-w-md"
                    style={{ color: 'rgba(60, 60, 59, 0.6)' }}
                  >
                    Al hacer clic, serás redirigido a Ko-fi donde podrás elegir tu plan y realizar el pago de forma segura.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2 font-semibold transition-colors"
                  style={{ color: '#F20A64' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(242, 10, 100, 0.8)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#F20A64' }}
                >
                  Enviar otro preregistro
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

              {/* ── Error general ── */}
              {submitStatus === 'error' && errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* ── Nombre ── */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-ejoi-gris mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={e => handleChange('nombre', e.target.value)}
                  disabled={isSubmitting}
                  className={`${inputBase} ${inputDisabledCls} ${errors.nombre ? 'border-red-500' : ''}`}
                  style={errors.nombre ? {} : borderNormal}
                  onFocus={e => { if (!errors.nombre) focusRing(e as any) }}
                  onBlur={e => { blurRing(e as any); handleBlur('nombre') }}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
              </div>

              {/* ── Email ── */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ejoi-gris mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  disabled={isSubmitting}
                  className={`${inputBase} ${inputDisabledCls} ${errors.email ? 'border-red-500' : ''}`}
                  style={errors.email ? {} : borderNormal}
                  onFocus={e => { if (!errors.email) focusRing(e as any) }}
                  onBlur={e => { blurRing(e as any); handleBlur('email') }}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* ── Estilo ── */}
              <div>
                <label className="block text-sm font-medium text-ejoi-gris mb-3">
                  Estilo de avatar <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  {(['realista', 'anime'] as const).map(val => (
                    <label
                      key={val}
                      className={`flex items-center min-h-[44px] ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      <input
                        type="radio"
                        name="estilo"
                        value={val}
                        checked={formData.estilo === val}
                        onChange={e => handleChange('estilo', e.target.value)}
                        disabled={isSubmitting}
                        className="mr-3 w-5 h-5 cursor-pointer"
                        style={{ accentColor: '#F20A64' }}
                      />
                      <span className="text-base text-ejoi-gris">
                        {val === 'realista' ? 'Realista' : 'Anime'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Género de avatar ── */}
              <div>
                <label className="block text-sm font-medium text-ejoi-gris mb-3">
                  Género de avatar preferido <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  {([
                    { value: 'femenino', label: 'Femenino' },
                    { value: 'masculino', label: 'Masculino' },
                  ] as const).map(({ value, label }) => (
                    <label
                      key={value}
                      className={`flex items-center min-h-[44px] ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      <input
                        type="radio"
                        name="generoAvatar"
                        value={value}
                        checked={formData.generoAvatar === value}
                        onChange={() => {
                          handleChange('generoAvatar', value)
                          if (formData.arquetipo) handleChange('arquetipo', '')
                        }}
                        disabled={isSubmitting}
                        className="mr-3 w-5 h-5 cursor-pointer"
                        style={{ accentColor: '#F20A64' }}
                      />
                      <span className="text-base text-ejoi-gris">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.generoAvatar && (
                  <p className="mt-1 text-sm text-red-500">{errors.generoAvatar}</p>
                )}
              </div>

              {/* ── Arquetipo ── */}
              <div>
                <label htmlFor="arquetipo" className="block text-sm font-medium text-ejoi-gris mb-2">
                  Personalidad preferida <span className="text-red-500">*</span>
                </label>
                <select
                  id="arquetipo"
                  value={formData.arquetipo}
                  onChange={e => handleChange('arquetipo', e.target.value)}
                  disabled={!formData.generoAvatar || isSubmitting}
                  className={`${inputBase} ${errors.arquetipo ? 'border-red-500' : ''} ${!formData.generoAvatar || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  style={
                    errors.arquetipo
                      ? {}
                      : {
                        borderColor: 'rgba(186, 176, 237, 0.2)',
                        backgroundColor: !formData.generoAvatar ? 'rgba(186, 176, 237, 0.05)' : 'white',
                      }
                  }
                  onFocus={e => { if (!errors.arquetipo && formData.generoAvatar) focusRing(e as any) }}
                  onBlur={e => { blurRing(e as any); if (formData.generoAvatar) handleBlur('arquetipo') }}
                >
                  <option value="">
                    {formData.generoAvatar ? 'Tu personalidad más querida' : 'Primero selecciona un género'}
                  </option>
                  {archetypes.map(arch => (
                    <option key={arch.id} value={arch.id}>{arch.name}</option>
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

              {/* ── Sección Opcional ── */}
              <div className="pt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1" style={{ backgroundColor: 'rgba(186, 176, 237, 0.3)' }} />
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: 'rgba(60, 60, 59, 0.45)' }}
                  >
                    Opcional
                  </span>
                  <div className="h-px flex-1" style={{ backgroundColor: 'rgba(186, 176, 237, 0.3)' }} />
                </div>
                <p className="text-xs mb-5 text-center" style={{ color: 'rgba(60, 60, 59, 0.5)' }}>
                  Esta información nos ayuda a mejorar la experiencia de eJoi
                </p>

                {/* ¿Qué buscas? */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-ejoi-gris mb-3">
                    ¿Qué buscas en eJoi?
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {BUSCA_OPTIONS.map(opt => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border transition-all ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                          } ${formData.busca === opt.value
                            ? 'border-[#F20A64] bg-[rgba(242,10,100,0.04)]'
                            : 'border-[rgba(186,176,237,0.3)] hover:border-[rgba(242,10,100,0.4)]'
                          }`}
                      >
                        <input
                          type="radio"
                          name="busca"
                          value={opt.value}
                          checked={formData.busca === opt.value}
                          onChange={() =>
                            handleChange('busca', formData.busca === opt.value ? null : opt.value)
                          }
                          disabled={isSubmitting}
                          className="w-4 h-4"
                          style={{ accentColor: '#F20A64' }}
                        />
                        <span className="text-sm text-ejoi-gris">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.busca && (
                    <p className="mt-1 text-sm text-red-500">{errors.busca}</p>
                  )}
                </div>

                {/* Disposición a pagar */}
                <div>
                  <label className="block text-sm font-medium text-ejoi-gris mb-3">
                    ¿Estarías dispuesto/a a pagar por eJoi?
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {DISPOSICION_OPTIONS.map(opt => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border transition-all ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                          } ${formData.disposicion_pago === opt.value
                            ? 'border-[#F20A64] bg-[rgba(242,10,100,0.04)]'
                            : 'border-[rgba(186,176,237,0.3)] hover:border-[rgba(242,10,100,0.4)]'
                          }`}
                      >
                        <input
                          type="radio"
                          name="disposicion_pago"
                          value={opt.value}
                          checked={formData.disposicion_pago === opt.value}
                          onChange={() =>
                            handleChange(
                              'disposicion_pago',
                              formData.disposicion_pago === opt.value ? null : opt.value
                            )
                          }
                          disabled={isSubmitting}
                          className="w-4 h-4"
                          style={{ accentColor: '#F20A64' }}
                        />
                        <span className="text-sm text-ejoi-gris">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.disposicion_pago && (
                    <p className="mt-1 text-sm text-red-500">{errors.disposicion_pago}</p>
                  )}
                </div>
              </div>

              {/* ── Términos ── */}
              <div>
                <label className={`flex items-start ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    checked={formData.aceptaTerminos}
                    onChange={e => handleChange('aceptaTerminos', e.target.checked)}
                    disabled={isSubmitting}
                    className={`mt-1 mr-3 w-5 h-5 flex-shrink-0 ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
                      } ${errors.aceptaTerminos ? 'border-red-500' : ''}`}
                    style={{ accentColor: '#F20A64' }}
                  />
                  <span className="text-sm sm:text-base text-ejoi-gris leading-relaxed">
                    Acepto los{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('terms')}
                      className="hover:underline"
                      style={{ color: '#F20A64' }}
                    >
                      términos y condiciones
                    </button>{' '}
                    y la{' '}
                    <button
                      type="button"
                      onClick={() => openLegalModal('privacy')}
                      className="hover:underline"
                      style={{ color: '#F20A64' }}
                    >
                      política de privacidad
                    </button>{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.aceptaTerminos && (
                  <p className="mt-1 text-sm text-red-500">{errors.aceptaTerminos}</p>
                )}
              </div>

              {/* ── Botón ── */}
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-base sm:text-lg"
                style={{
                  backgroundColor: '#F20A64',
                  boxShadow:
                    isFormValid && !isSubmitting ? '0 4px 14px rgba(242, 10, 100, 0.25)' : 'none',
                  transform: isFormValid && !isSubmitting ? undefined : 'none',
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Confirmar preregistro'
                )}
              </button>

              {!isFormValid && !isSubmitting && (
                <p className="text-xs text-center" style={{ color: 'rgba(60, 60, 59, 0.45)' }}>
                  Completa los campos obligatorios (*) para habilitar el botón
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
