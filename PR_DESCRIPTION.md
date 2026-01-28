## Descripción

Este PR implementa una refactorización completa del diseño visual del landing page para alinearlo estrictamente con el manual de marca eJoi, priorizando una estética suave, calmada y no agresiva.

## Cambios principales

### Paleta de colores oficial
- ✅ Implementación de colores base: Magenta eJoi (#F20A64), Lavanda eJoi (#BAB0ED), Gris neutro (#3C3C3B)
- ✅ Variables CSS con variaciones suavizadas (soft, ultra-soft) para mantener consistencia
- ✅ Magenta reservado solo para acentos, estados activos y microinteracciones
- ✅ Lavanda como color atmosférico principal en fondos y secciones amplias

### Diseño visual
- ✅ Gradientes radiales desde esquina inferior izquierda con transiciones largas y baja saturación
- ✅ Fondos claros, blancos cálidos o lavanda muy diluida
- ✅ Evitar contrastes duros mediante gradientes, transparencias y escalas intermedias
- ✅ Estética que transmite cercanía, calma, intimidad y sofisticación

### Componentes
- ✅ **Header**: Nuevo componente con logo eJoi y navegación responsive
- ✅ **Hero**: Logo prominente, gradientes suaves, elementos decorativos atmosféricos
- ✅ **Features**: Cards con fondos claros y magenta suavizado en iconos
- ✅ **Archetypes**: Paleta suave, controles con magenta solo en estados activos
- ✅ **PreregisterForm**: Estética calmada con rellenado automático desde selección de arquetipo
- ✅ **Footer**: Fondo claro con texto en gris neutro

### Tipografía
- ✅ Implementación de fuente Amblas personalizada
- ✅ Configuración en globals.css y Tailwind

### Logos
- ✅ Implementación de logos eJoi en Header, Hero y Footer
- ✅ Respeto de versiones (color, negativo, escala de grises) sin alterar colores ni proporciones

### Optimización móvil
- ✅ Tamaños y espaciados responsivos optimizados para móvil
- ✅ Menú móvil funcional con animaciones
- ✅ Elementos más compactos y navegables
- ✅ Mejor uso del espacio en pantallas pequeñas

### Funcionalidades
- ✅ Rellenado automático del formulario al seleccionar arquetipo
- ✅ Lazy loading de imágenes con skeleton de carga
- ✅ Manejo de errores en carga de imágenes
- ✅ Animaciones sutiles y elementos decorativos

### Optimizaciones técnicas
- ✅ Corrección de warnings de React sobre estilos inline
- ✅ Optimización de configuración Next.js para imágenes
- ✅ Mejora de rendimiento general

## Archivos modificados

- `app/globals.css` - Variables CSS y paleta oficial
- `app/layout.tsx` - Fuente Amblas
- `tailwind.config.js` - Colores oficiales eJoi
- `app/components/Header.tsx` - Nuevo componente
- `app/components/Hero.tsx` - Refactorización completa
- `app/components/Features.tsx` - Estética suave
- `app/components/Archetypes.tsx` - Paleta suave y rellenado automático
- `app/components/PreregisterForm.tsx` - Rellenado automático y estética calmada
- `app/components/Footer.tsx` - Fondo claro
- `next.config.js` - Optimización de imágenes
- `app/page.tsx` - Integración de Header

## Archivos nuevos

- `app/components/Header.tsx`
- `public/fonts/Amblas.ttf`
- `public/logos/eJoi_logos-*.png`

## Testing

- ✅ Verificado en desktop
- ✅ Verificado en móvil (responsive)
- ✅ Navegación funcional
- ✅ Formulario con rellenado automático
- ✅ Carga de imágenes optimizada

