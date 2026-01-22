# Solución de Problemas - Preregistro Supabase

## Problemas Comunes y Soluciones

### 1. Variables de Entorno no Configuradas en Vercel

**Síntoma**: El formulario no guarda datos, muestra error genérico.

**Solución**:
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `landing-e-joi`
3. Ve a **Settings** > **Environment Variables**
4. Agrega las siguientes variables:
   - `SUPABASE_URL` = `https://zmnyfgikidqlojbmwccy.supabase.co`
   - `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbnlmZ2lraWRxbG9qYm13Y2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTQxNjUsImV4cCI6MjA4NDY3MDE2NX0.8soCV2sEKt5yVY67R9JPmCksLQxkpL5AZyyp8MLHTj4`
5. Selecciona los entornos: **Production**, **Preview**, **Development**
6. Haz clic en **Save**
7. **IMPORTANTE**: Redespliega la aplicación para que los cambios surtan efecto

### 2. Tabla no Existe en Supabase

**Síntoma**: Error "relation does not exist" o "table does not exist"

**Solución**:
1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Ejecuta los scripts en este orden (ver `SUPABASE_SETUP.md`):
   - Crear extensiones (`pgcrypto`, `citext`)
   - Crear enums (`estilo_enum`, `genero_enum`)
   - Crear tabla `preregistros`
   - Otorgar privilegios
   - Configurar RLS

### 3. RLS (Row Level Security) no Configurado

**Síntoma**: Error "permission denied" o "new row violates row-level security policy"

**Solución**:
1. Ve a Supabase Dashboard > **SQL Editor**
2. Ejecuta:
```sql
ALTER TABLE preregistros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_preregistros"
ON preregistros
FOR INSERT
TO anon
WITH CHECK (true);
```

### 4. Privilegios no Otorgados

**Síntoma**: Error "permission denied for table preregistros"

**Solución**:
1. Ve a Supabase Dashboard > **SQL Editor**
2. Ejecuta:
```sql
GRANT INSERT ON TABLE preregistros TO anon;
GRANT USAGE ON SCHEMA public TO anon;
```

### 5. Verificar que Todo Esté Configurado

**Checklist**:
- [ ] Variables de entorno configuradas en Vercel
- [ ] Aplicación redesplegada después de agregar variables
- [ ] Extensiones creadas en Supabase (`pgcrypto`, `citext`)
- [ ] Enums creados (`estilo_enum`, `genero_enum`)
- [ ] Tabla `preregistros` existe
- [ ] RLS activado en la tabla
- [ ] Policy `anon_insert_preregistros` creada
- [ ] Privilegios otorgados al rol `anon`

### 6. Verificar Logs en Vercel

1. Ve a Vercel Dashboard > Tu proyecto > **Deployments**
2. Selecciona el deployment más reciente
3. Haz clic en **Functions** > Busca `preregistro`
4. Revisa los logs para ver errores específicos

### 7. Verificar Logs en Supabase

1. Ve a Supabase Dashboard > **Logs** > **Postgres Logs**
2. Busca errores relacionados con `preregistros`

### 8. Probar la Conexión

Puedes probar directamente desde el SQL Editor de Supabase:

```sql
-- Verificar que la tabla existe
SELECT * FROM preregistros LIMIT 1;

-- Verificar RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'preregistros';

-- Verificar policies
SELECT * FROM pg_policies WHERE tablename = 'preregistros';
```

## Errores Específicos

### Error: "Missing Supabase environment variables"
**Causa**: Variables de entorno no configuradas en Vercel
**Solución**: Ver sección 1

### Error: "duplicate key value violates unique constraint"
**Causa**: El email ya está registrado (esto es normal)
**Solución**: El formulario mostrará el mensaje "Este email ya está registrado"

### Error: "invalid input value for enum"
**Causa**: Los valores enviados no coinciden con los enums
**Solución**: Verificar que los valores sean exactamente `'realista'` o `'anime'` para estilo, y `'masculino'` o `'femenino'` para género

## Contacto

Si el problema persiste después de verificar todo lo anterior, revisa:
1. Los logs de Vercel Functions
2. Los logs de Supabase
3. La consola del navegador (F12) para errores del frontend

