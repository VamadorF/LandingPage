'use client'

import React, { useEffect, useRef } from 'react'

type LegalModalProps = {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function LegalModal({ title, open, onClose, children }: LegalModalProps) {
  const ref = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }

    el.addEventListener('cancel', handleCancel) // ESC
    return () => el.removeEventListener('cancel', handleCancel)
  }, [onClose])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="m-auto w-[min(720px,95vw)] rounded-2xl p-0 shadow-xl backdrop:bg-black/50"
      aria-labelledby="legal-modal-title"
    >
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 id="legal-modal-title" className="text-lg font-semibold">
          {title}
        </h2>

        <button
          onClick={onClose}
          className="rounded-lg px-3 py-1 text-sm hover:bg-black/5"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[70vh] overflow-auto px-5 py-4 text-sm leading-6">
        {children}
      </div>

      <div className="flex justify-end gap-2 border-t px-5 py-4">
        <button
          onClick={onClose}
          className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5"
        >
          Cerrar
        </button>
      </div>
    </dialog>
  )
}
