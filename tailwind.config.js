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
        // Colores primarios (marca / énfasis)
        brand: {
          DEFAULT: '#E91E63', // Fucsia-magenta principal
          light: '#F06292',   // Rosa intenso degradado
          lighter: '#F8BBD0',  // Rosa claro
        },
        // Colores secundarios (fondos y UI suave)
        background: {
          lavender: {
            light: '#F3F0FA',  // Lila muy claro / lavanda
            DEFAULT: '#EDE7F6', // Lavanda claro
          },
          gray: {
            light: '#F5F5F5',  // Gris muy claro (cards / fondos)
          },
        },
        // Colores neutros
        neutral: {
          white: '#FFFFFF',     // Blanco puro
          gray: {
            medium: '#9E9E9E',  // Gris medio (texto secundario)
            dark: '#424242',     // Gris oscuro (texto principal)
          },
          black: {
            soft: '#1F1F1F',     // Negro suave (mockups / marcos)
          },
        },
        // Mantener compatibilidad con clases existentes
        primary: {
          DEFAULT: '#E91E63',
          50: '#F3F0FA',
          100: '#EDE7F6',
          200: '#F8BBD0',
          300: '#F8BBD0',
          400: '#F06292',
          500: '#E91E63',
          600: '#E91E63',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
        secondary: {
          DEFAULT: '#F06292',
          50: '#F3F0FA',
          100: '#EDE7F6',
          200: '#F8BBD0',
          300: '#F8BBD0',
          400: '#F06292',
          500: '#F06292',
          600: '#E91E63',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

