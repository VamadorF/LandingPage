/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial eJoi
        ejoi: {
          // Magenta - Solo para acentos, estados activos, highlights
          magenta: '#F20A64',
          'magenta-soft': 'rgba(242, 10, 100, 0.12)',
          'magenta-ultra-soft': 'rgba(242, 10, 100, 0.08)',
          'magenta-medium': 'rgba(242, 10, 100, 0.20)',
          
          // Lavanda - Color atmosférico principal
          lavanda: '#BAB0ED',
          'lavanda-light': 'rgba(186, 176, 237, 0.15)',
          'lavanda-ultra-light': 'rgba(186, 176, 237, 0.08)',
          'lavanda-medium': 'rgba(186, 176, 237, 0.25)',
          
          // Gris neutro - Solo texto y elementos funcionales
          gris: '#3C3C3B',
          'gris-light': 'rgba(60, 60, 59, 0.7)',
          'gris-lighter': 'rgba(60, 60, 59, 0.5)',
        },
        // Fondos
        bg: {
          white: '#FFFFFF',
          'warm-white': '#FEFEFE',
          'lavanda-atmosferico': 'rgba(186, 176, 237, 0.06)',
        },
      },
      fontFamily: {
        sans: ['var(--font-amblas)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        amblas: ['var(--font-amblas)', 'var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

