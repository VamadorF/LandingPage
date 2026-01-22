# Integración de Supabase para Preregistro

## 📋 Resumen

Este PR integra Supabase para persistir los datos del formulario de preregistro en una base de datos PostgreSQL. Implementa el patrón **Diseño A (ANON KEY + RLS)** para máxima seguridad sin exponer service role keys.

## 🎯 Objetivo

Conectar el formulario de preregistro del landing page a Supabase, permitiendo guardar todos los datos del registro de forma segura y escalable.

## 🔧 Cambios Implementados

### Nuevas Dependencias

- **@supabase/supabase-js** (v2.91.0): Cliente oficial de Supabase
- **zod** (v4.3.5): Validación de esquemas TypeScript-first

### Nuevos Archivos

1. **`lib/supabase-server.ts`**
   - Cliente Supabase configurado para uso exclusivo en servidor
   - Usa `SUPABASE_URL` y `SUPABASE_ANON_KEY` (Diseño A)
   - No expone SERVICE_ROLE_KEY

2. **`app/actions/preregistro.ts`**
   - Server Action de Next.js 14 con validación robusta
   - Validación con Zod:
     - Formato de email validado
     - Normalización de email (trim + lowercase)
     - Validación de enums (estilo, género)
     - Campos requeridos
   - Manejo de errores específicos:
     - `VALIDATION`: Datos inválidos
     - `DUPLICATE`: Email ya registrado (código 23505)
     - `DB`: Errores de base de datos
   - Retorna `{ ok: boolean, code?: string, message?: string }`

3. **`SUPABASE_SETUP.md`**
   - Guía completa paso a paso para configurar Supabase
   - Instrucciones para crear extensiones, enums, tabla, privilegios y RLS
   - Solución de problemas comunes

4. **`CHANGELOG_SUPABASE.md`**
   - Documentación detallada de todos los cambios
   - Arquitectura y diseño de seguridad
   - Notas técnicas y próximos pasos

### Archivos Modificados

1. **`app/components/PreregisterForm.tsx`**
   - Integrado con Server Action `submitPreregistro`
   - Usa `startTransition` para mantener UI responsiva
   - Limpia estados anteriores antes de enviar
   - Manejo mejorado de errores con mensajes específicos
   - Mantiene validación del lado del cliente existente

2. **`package.json`**
   - Agregadas dependencias: `@supabase/supabase-js` y `zod`

## 🏗️ Arquitectura

```
Formulario Cliente (PreregisterForm.tsx)
    ↓
Server Action (app/actions/preregistro.ts)
    ↓
Cliente Supabase Servidor (lib/supabase-server.ts)
    ↓ [ANON KEY + RLS Policy]
Supabase Database (PostgreSQL)
```

## 🔒 Diseño de Seguridad

**Diseño A: ANON KEY + RLS** (implementado)

- ✅ Usa `SUPABASE_ANON_KEY` con Row Level Security
- ✅ No requiere SERVICE_ROLE_KEY (más seguro)
- ✅ RLS proporciona seguridad a nivel de base de datos
- ✅ Validación server-side adicional con Zod
- ✅ Email único con constraint en DB
- ✅ Normalización de email para evitar duplicados

## 📊 Esquema de Base de Datos

La tabla `preregistros` incluye:

- `id` (uuid, primary key, auto-generado)
- `nombre` (text, not null)
- `email` (citext, not null, unique) - case-insensitive
- `arquetipo` (text, not null)
- `estilo` (estilo_enum: 'realista' | 'anime')
- `genero_avatar` (genero_enum: 'masculino' | 'femenino')
- `acepta_terminos` (boolean, not null, default: false)
- `created_at` (timestamptz, default: now())

## 🔑 Variables de Entorno Requeridas

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Nota**: Crear `.env.local` con estos valores (no versionado). Ver `.env.example` como template.

## ✅ Checklist de Implementación

- [x] Instalar dependencias (@supabase/supabase-js, zod)
- [x] Crear cliente Supabase servidor
- [x] Implementar Server Action con validación Zod
- [x] Conectar formulario a Server Action
- [x] Agregar manejo de errores específicos
- [x] Documentar configuración de Supabase
- [x] Crear template de variables de entorno
- [ ] **Pendiente**: Configurar Supabase (seguir `SUPABASE_SETUP.md`)
- [ ] **Pendiente**: Probar flujo completo de preregistro

## 📝 Próximos Pasos (Después del Merge)

1. Crear proyecto en Supabase (si no existe)
2. Seguir guía en `SUPABASE_SETUP.md`:
   - Crear extensiones (`pgcrypto`, `citext`)
   - Crear enums (`estilo_enum`, `genero_enum`)
   - Crear tabla `preregistros`
   - Configurar privilegios y RLS
3. Crear `.env.local` con credenciales de Supabase
4. Probar el formulario de preregistro
5. (Opcional) Implementar rate limiting
6. (Opcional) Agregar captcha para prevenir spam

## 🧪 Testing

Para probar después de configurar Supabase:

1. Ejecutar `npm run dev`
2. Completar el formulario de preregistro
3. Verificar que los datos se guardan en Supabase Table Editor
4. Probar validaciones (email inválido, campos vacíos)
5. Probar caso de email duplicado

## 📚 Documentación

- `SUPABASE_SETUP.md`: Guía completa de configuración
- `CHANGELOG_SUPABASE.md`: Documentación detallada de cambios
- `.env.example`: Template de variables de entorno

## 🔗 Enlaces

- [Documentación de Supabase](https://supabase.com/docs)
- [Row Level Security en Supabase](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## ⚠️ Notas Importantes

- **No usar SERVICE_ROLE_KEY**: Este diseño usa ANON KEY + RLS por seguridad
- **RLS es obligatorio**: Sin RLS y privilegios configurados, los inserts fallarán
- **Email case-insensitive**: Se usa `citext` para evitar duplicados por mayúsculas/minúsculas
- **Validación doble**: Cliente (UX) + Servidor (seguridad)

## 🎉 Beneficios

- ✅ Persistencia de datos en base de datos PostgreSQL
- ✅ Seguridad a nivel de base de datos con RLS
- ✅ Validación robusta con Zod
- ✅ Manejo de errores específico y amigable
- ✅ Escalable y mantenible
- ✅ Documentación completa para configuración

