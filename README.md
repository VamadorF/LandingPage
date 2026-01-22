# eJoi - Tu Compañera Virtual con Memoria

**eJoi** es una plataforma de acompañamiento personal con IA diseñada como una relación continua, no como un chatbot utilitario. La experiencia se construye alrededor de una compañera virtual con presencia visual y memoria relacional que evoluciona contigo.

## Sobre eJoi

eJoi ofrece una relación continua donde tu compañera virtual recuerda tus gustos, hitos y contexto para que el vínculo evolucione y no se reinicie en cada conversación. Una experiencia diseñada para crear hábito y apego mediante continuidad emocional.

## Características del MVP

- Conversación texto bidireccional
- Entrada por voz opcional (dictado → texto)
- Sistema de memoria persistente (factual, episódica, contextual)
- Avatar persistente (estilo realista o anime)
- Arquitectura preparada para tienda de accesorios (deshabilitada en MVP)
- Landing page con preregistro

## Tecnologías

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React 18

## Desarrollo

### Configuración de Variables de Entorno

Antes de ejecutar la aplicación, necesitas configurar las variables de entorno para conectar con Supabase:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Agrega las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

**Nota:** Las credenciales de Supabase se proporcionan por separado. Contacta al administrador del proyecto si necesitas acceso.

### Estructura de la Tabla de Supabase

El formulario de preregistro inserta datos en la tabla `pre_registros` con las siguientes columnas:
- `nombre` (text): Nombre completo del usuario
- `email` (text, unique): Correo electrónico del usuario
- `arquetipo` (text): Personalidad preferida seleccionada
- `estilo` (text): Estilo de avatar (realista o anime)
- `genero_avatar` (text): Género del avatar (masculino o femenino)
- `acepta_terminos` (boolean): Confirmación de aceptación de términos

La tabla debe tener una restricción única en la columna `email` para evitar registros duplicados.

### Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

```
├── app/
│   ├── components/     # Componentes React
│   ├── layout.tsx     # Layout principal
│   ├── page.tsx       # Página principal (landing)
│   └── globals.css    # Estilos globales
├── public/
│   ├── arquetipos/    # Imágenes de arquetipos
│   └── anime/         # Imágenes estilo anime
└── ...
```

## Identidad Visual

eJoi utiliza una paleta de colores cálida-afectiva centrada en:
- **Fucsia-magenta** (#E91E63) como color de marca principal
- **Lila/lavanda** (#F3F0FA, #EDE7F6) para fondos calmados
- **Grises neutros** para texto y elementos UI

## Licencia

Privado - Todos los derechos reservados

---

**eJoi** - Tu compañera virtual con memoria. Una relación continua, no un chatbot.

