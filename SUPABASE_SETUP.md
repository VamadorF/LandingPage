# Guía de Configuración de Supabase para Preregistro

Esta guía te ayudará a configurar Supabase para el sistema de preregistro de eJoi.

## Prerrequisitos

1. Cuenta en [Supabase](https://supabase.com)
2. Proyecto creado en Supabase

## Paso 1: Obtener Credenciales

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a **Settings** > **API**
3. Copia los siguientes valores:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`

4. Crea un archivo `.env.local` en la raíz del proyecto con:

```env
SUPABASE_URL=tu_url_del_proyecto
SUPABASE_ANON_KEY=tu_anon_key
```

## Paso 2: Crear Extensiones

Abre el **SQL Editor** en Supabase y ejecuta:

```sql
-- Extensión para UUIDs aleatorios
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Extensión para email case-insensitive
CREATE EXTENSION IF NOT EXISTS citext;
```

## Paso 3: Crear Enums

Ejecuta en el SQL Editor:

```sql
-- Enum para estilo de avatar
CREATE TYPE estilo_enum AS ENUM ('realista', 'anime');

-- Enum para género de avatar
CREATE TYPE genero_enum AS ENUM ('masculino', 'femenino');
```

## Paso 4: Crear Tabla

Ejecuta en el SQL Editor:

```sql
CREATE TABLE preregistros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  email citext NOT NULL UNIQUE,
  arquetipo text NOT NULL,
  estilo estilo_enum NOT NULL,
  genero_avatar genero_enum NOT NULL,
  acepta_terminos boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

## Paso 5: Otorgar Privilegios

Ejecuta en el SQL Editor:

```sql
-- Otorgar privilegios de INSERT al rol anon
GRANT INSERT ON TABLE preregistros TO anon;
GRANT USAGE ON SCHEMA public TO anon;
```

**Nota**: En algunos proyectos de Supabase estos privilegios ya vienen preconfigurados, pero ejecutarlos explícitamente asegura que funcionen correctamente.

## Paso 6: Configurar Row Level Security (RLS)

Ejecuta en el SQL Editor:

```sql
-- Activar RLS en la tabla
ALTER TABLE preregistros ENABLE ROW LEVEL SECURITY;

-- Policy que permite insert a anon
CREATE POLICY "anon_insert_preregistros"
ON preregistros
FOR INSERT
TO anon
WITH CHECK (true);
```

## Paso 7: Verificar Configuración

1. Verifica que la tabla existe: Ve a **Table Editor** y deberías ver la tabla `preregistros`
2. Verifica RLS: Ve a **Authentication** > **Policies** y confirma que la policy `anon_insert_preregistros` existe
3. Prueba el formulario: Completa el formulario de preregistro en tu aplicación y verifica que los datos se guardan correctamente

## Opcional: Índice en created_at

Si planeas listar o ordenar los preregistros por fecha, puedes crear un índice:

```sql
CREATE INDEX idx_preregistros_created_at ON preregistros(created_at);
```

## Seguridad Adicional (Recomendado)

### Rate Limiting

Para prevenir spam, considera implementar rate limiting:

1. **En Next.js (Middleware)**: Limita requests por IP
2. **En Supabase**: Usa funciones de edge o triggers para limitar inserts por email/IP

Ejemplo básico de middleware en Next.js:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Implementar lógica de rate limiting aquí
  return NextResponse.next();
}

export const config = {
  matcher: '/api/preregistro/:path*',
};
```

### Captcha

Para mayor protección contra bots, considera agregar:
- **reCAPTCHA** de Google
- **hCaptcha**
- **Cloudflare Turnstile**

## Solución de Problemas

### Error: "relation does not exist"
- Verifica que ejecutaste todos los pasos SQL en orden
- Confirma que estás en el proyecto correcto de Supabase

### Error: "permission denied for table preregistros"
- Verifica que ejecutaste los comandos `GRANT` del Paso 5
- Confirma que RLS está activado y la policy existe

### Error: "duplicate key value violates unique constraint"
- Esto es normal: significa que el email ya está registrado
- El formulario mostrará un mensaje apropiado al usuario

### Error: "invalid input value for enum"
- Verifica que los valores enviados coinciden exactamente con los enums definidos
- Los valores deben ser: `'realista'` o `'anime'` para estilo, `'masculino'` o `'femenino'` para género

## Próximos Pasos

1. ✅ Configurar variables de entorno en `.env.local`
2. ✅ Probar el formulario de preregistro
3. ⚠️ Implementar rate limiting (recomendado)
4. ⚠️ Agregar captcha (recomendado)
5. 📊 Configurar dashboard para ver los preregistros en Supabase

## Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Row Level Security en Supabase](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

