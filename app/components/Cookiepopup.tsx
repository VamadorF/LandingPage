// hice este boton desde cero pero necesito saber si vamos a usar alguna dependencia externa como cookieyes o similar para la gestion de cookies


'use client'

import { useEffect, useState } from 'react'
import { openLegalModal } from './legalHub'

type Consent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: number
}

const STORAGE_KEY = 'ejoi_cookie_consent_v1'

function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Consent
    if (typeof parsed?.updatedAt !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

function writeConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: consent }))
}

export default function CookieDrawer() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(true) // abierto por defecto
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    setVisible(!readConsent())
  }, [])

  if (!visible) return null

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true, updatedAt: Date.now() })
    setVisible(false)
  }

  const rejectAll = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false, updatedAt: Date.now() })
    setVisible(false)
  }

  const savePrefs = () => {
    writeConsent({ necessary: true, analytics, marketing, updatedAt: Date.now() })
    setVisible(false)
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      {/* “Pestaña” para abrir/cerrar */}
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="group flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-lg hover:bg-black/5"
          aria-label="Abrir preferencias de cookies"
        >
          <span className="text-sm font-semibold" style={{ color: '#F20A64' }}>
            Cookies
          </span>
          <span className="text-black/60">›</span>
        </button>
      )}

      {/* Panel */}
      <div
        className={[
          'w-[360px] max-w-[85vw] rounded-2xl border bg-white shadow-2xl transition-all duration-200',
          expanded ? 'opacity-100 translate-x-0' : 'pointer-events-none opacity-0 -translate-x-3',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-bold text-ejoi-gris">Valoramos tu privacidad</h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="rounded-lg px-2 py-1 text-sm hover:bg-black/5"
              aria-label="Minimizar"
            >
              —{/* minimizar */}
            </button>

            
          </div>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-6 text-black/70">
            Usamos cookies para mejorar su experiencia de navegación, mostrarle anuncios o contenidos
            personalizados y analizar nuestro tráfico. Al hacer clic en <b>“Aceptar todo”</b> usted da su
            consentimiento a nuestro uso de las cookies.
          </p>

          {/* Personalización */}
          {showPrefs && (
            <div className="mt-4 rounded-xl border bg-black/[0.02] p-4">
              <p className="text-sm font-semibold text-ejoi-gris">Preferencias</p>

              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">Necesarias</p>
                    <p className="text-black/60">Requeridas para funcionamiento básico del sitio.</p>
                  </div>
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/70">
                    Siempre activas
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">Analíticas</p>
                    <p className="text-black/60">Nos ayudan a entender el uso del sitio.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-5 w-5 cursor-pointer"
                    style={{ accentColor: '#F20A64' }}
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">Marketing</p>
                    <p className="text-black/60">Para anuncios o contenidos más relevantes.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="h-5 w-5 cursor-pointer"
                    style={{ accentColor: '#F20A64' }}
                  />
                </div>

                <div className="pt-2 text-xs text-black/55">
                  Ver detalle en{' '}
                  <button
                    type="button"
                    className="underline underline-offset-2"
                    onClick={() => openLegalModal('cookies')}
                  >
                    política de cookies
                  </button>
                  .
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowPrefs((v) => !v)}
              className="flex-1 rounded-xl border px-4 py-3 text-sm font-semibold hover:bg-black/5"
              style={{ borderColor: '#F20A64', color: '#F20A64' }}
            >
              Personalizar
            </button>

            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
              style={{ backgroundColor: '#F20A64' }}
            >
              Rechazar todo
            </button>

            <button
              type="button"
              onClick={showPrefs ? savePrefs : acceptAll}
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
              style={{ backgroundColor: '#F20A64' }}
            >
              {showPrefs ? 'Guardar' : 'Aceptar todo'}
            </button>
          </div>

          <div className="mt-3 text-center text-xs text-black/45">
            Powered by <span className="font-semibold">eJoi</span>
          </div>
        </div>
      </div>
    </div>
  )
}
