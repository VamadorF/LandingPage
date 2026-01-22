# Integración de Supabase para Preregistro

## Resumen

Esta implementación conecta el formulario de preregistro del landing page a Supabase, permitiendo persistir todos los datos del registro en una base de datos PostgreSQL.

## Cambios Implementados

### Nuevas Dependencias

- **@supabase/supabase-js** (v2.91.0): Cliente oficial de Supabase para JavaScript/TypeScript
- **zod** (v4.3.5): Librería de validación de esquemas TypeScript-first

### Nuevos Archivos

1. **lib/supabase-server.ts**
   - Cliente Supabase configurado para uso exclusivo en servidor
   - Usa `SUPABASE_URL` y `SUPABASE_ANON_KEY` (Diseño A: ANON KEY + RLS)
   - No usa SERVICE_ROLE_KEY por seguridad

2. **app/actions/preregistro.ts**
   - Server Action de Next.js 14 para manejar el preregistro
   - Validación robusta con Zod:
     - Validación de formato de email
     - Normalización de email (trim + lowercase)
     - Validación de enums (estilo, género)
     - Validación de campos requeridos
   - Manejo de errores específicos:
     - Error de validación (VALIDATION)
     - Email duplicado (DUPLICATE - código 23505)
     - Errores de base de datos (DB)
   - Retorna objeto estructurado: `{ ok: boolean, code?: string, message?: string }`

3. **SUPABASE_SETUP.md**
   - Guía completa de configuración de Supabase
   - Instrucciones paso a paso para:
     - Crear extensiones (pgcrypto, citext)
     - Crear enums (estilo_enum, genero_enum)
     - Crear tabla preregistros
     - Configurar privilegios y RLS
     - Solución de problemas comunes

4. **.env.example**
   - Template de variables de entorno
   - Documenta `SUPABASE_URL` y `SUPABASE_ANON_KEY`

### Archivos Modificados

1. **app/components/PreregisterForm.tsx**
   - Integrado con Server Action `submitPreregistro`
   - Usa `startTransition` para no bloquear la UI durante el envío
   - Limpia estados anteriores antes de enviar
   - Manejo mejorado de errores con mensajes específicos
   - Mantiene validación del lado del cliente existente
   - Estado `errorMessage` para mostrar mensajes de error detallados

2. **package.json**
   - Agregadas dependencias: `@supabase/supabase-js` y `zod`

## Arquitectura

```
Formulario Cliente (PreregisterForm.tsx)
    ↓
Server Action (app/actions/preregistro.ts)
    ↓
Cliente Supabase Servidor (lib/supabase-server.ts)
    ↓ [ANON KEY + RLS Policy]
Supabase Database (PostgreSQL)
```

## Diseño de Seguridad

**Diseño A: ANON KEY + RLS** (implementado)

- Usa `SUPABASE_ANON_KEY` con Row Level Security (RLS)
- No requiere SERVICE_ROLE_KEY (más seguro para operaciones públicas)
- RLS proporciona seguridad a nivel de base de datos
- Validación server-side adicional con Zod

## Esquema de Base de Datos

La tabla `preregistros` incluye:

- `id` (uuid, primary key, auto-generado)
- `nombre` (text, not null)
- `email` (citext, not null, unique) - case-insensitive
- `arquetipo` (text, not null)
- `estilo` (estilo_enum: 'realista' | 'anime')
- `genero_avatar` (genero_enum: 'masculino' | 'femenino')
- `acepta_terminos` (boolean, not null, default: false)
- `created_at` (timestamptz, default: now())

## Variables de Entorno Requeridas

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Próximos Pasos

1. ✅ Código implementado
2. ⏳ Crear proyecto en Supabase
3. ⏳ Seguir guía en `SUPABASE_SETUP.md` para configurar base de datos
4. ⏳ Crear `.env.local` con credenciales de Supabase
5. ⏳ Probar el flujo completo de preregistro
6. ⚠️ (Opcional) Implementar rate limiting
7. ⚠️ (Opcional) Agregar captcha para prevenir spam

## Notas Técnicas

- La validación de email usa `z.string().email()` de Zod
- El email se normaliza a lowercase antes de guardar
- Los errores de duplicado se detectan por código 23505 (unique violation)
- `startTransition` se usa para mantener la UI responsiva durante el envío
- El botón se deshabilita automáticamente durante `isSubmitting`

## Testing

Para probar la implementación:

1. Configurar Supabase según `SUPABASE_SETUP.md`
2. Crear `.env.local` con credenciales
3. Ejecutar `npm run dev`
4. Completar el formulario de preregistro
5. Verificar que los datos se guardan en Supabase Table Editor

