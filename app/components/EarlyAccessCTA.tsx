'use client'

interface EarlyAccessCTAProps {
  className?: string
  source?: 'hero' | 'post_arquetipos' | 'pre_footer'
}

export default function EarlyAccessCTA({ className = '', source }: EarlyAccessCTAProps) {
  const scrollToForm = () => {
    const formSection = document.getElementById('preregister')
    formSection?.scrollIntoView({ behavior: 'smooth' })

    window.dispatchEvent(
      new CustomEvent('cta_early_access_click', {
        detail: { source: source || 'unknown' },
      })
    )
  }

  return (
    <button
      onClick={scrollToForm}
      className={`w-full sm:w-auto min-h-[44px] px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base md:text-lg ${className}`}
      style={{
        backgroundColor: '#F20A64',
        boxShadow: '0 4px 14px rgba(242, 10, 100, 0.25)',
      }}
    >
      Únete al acceso anticipado
    </button>
  )
}
