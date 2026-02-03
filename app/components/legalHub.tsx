'use client'

import React, { useState, useEffect } from 'react'
import LegalModal from './ModalLegal'
import { TermsContent, PrivacyContent, CookiesContent } from './contenidoLegal'

type ModalKey = 'terms' | 'privacy' | 'cookies' | null

// Función auxiliar simple para abrir modales desde cualquier lugar
export const openLegalModal = (modal: ModalKey) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: modal }))
  }
}

export function LegalHub() {
  const [open, setOpen] = useState<ModalKey>(null)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ModalKey>
      setOpen(customEvent.detail)
    }

    window.addEventListener('open-legal-modal', handleOpen)
    return () => window.removeEventListener('open-legal-modal', handleOpen)
  }, [])



  return (
    <>
      <LegalModal
        title="Términos de servicio"
        open={open === 'terms'}
        onClose={() => setOpen(null)}
      >
        <TermsContent />
      </LegalModal>

      <LegalModal
        title="Política de privacidad"
        open={open === 'privacy'}
        onClose={() => setOpen(null)}
      >
        <PrivacyContent />
      </LegalModal>

      <LegalModal
        title="Política de Cookies"
        open={open === 'cookies'}
        onClose={() => setOpen(null)}
      >
        <CookiesContent />
      </LegalModal>

      <LegalModal
        title="Política de Cookies"
        open={open === 'cookies'}
        onClose={() => setOpen(null)}
      >
        <CookiesContent />
      </LegalModal>

      <LegalModal
        title="Política de Cookies"
        open={open === 'cookies'}
        onClose={() => setOpen(null)}
      >
        <CookiesContent />
      </LegalModal>
    </>
  )
}
