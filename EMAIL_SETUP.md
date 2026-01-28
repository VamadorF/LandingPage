# Configuración de Email con Resend

Esta guía explica cómo configurar el envío de correos electrónicos de confirmación de pre-registro usando Resend.

## Prerrequisitos

1. Cuenta en [Resend](https://resend.com)
2. API Key de Resend

## Paso 1: Configurar Variables de Entorno

Agrega las siguientes variables a tu archivo `.env.local`:

```env
RESEND_API_KEY=re_Rwmv956G_KjvYT4Vz5MnQGC1b79qRZnUY
RESEND_FROM_EMAIL=eJoi <noreply@tudominio.com>
```

### Explicación de las Variables

- **RESEND_API_KEY**: Tu API key de Resend. Esta key ya está proporcionada.
- **RESEND_FROM_EMAIL**: El email del remitente. Puede ser:
  - `"Nombre <email@dominio.com>"` (con nombre y email)
  - `email@dominio.com` (solo email)

**Ejemplo:**
```env
RESEND_FROM_EMAIL=eJoi <noreply@ejoi.app>
```

## Paso 2: Verificar Dominio (Recomendado para Producción)

Para mejorar la deliverability y evitar que los correos vayan a spam:

1. Ve a [Resend Dashboard](https://resend.com/domains)
2. Agrega y verifica tu dominio
3. Configura los registros DNS según las instrucciones de Resend

**Nota**: En desarrollo puedes usar el dominio sandbox de Resend (`onboarding@resend.dev`), pero para producción es altamente recomendado verificar tu propio dominio.

## Paso 3: Probar el Envío

Una vez configuradas las variables de entorno:

1. Ejecuta el servidor de desarrollo: `npm run dev`
2. Completa el formulario de pre-registro
3. Verifica que recibes el correo de confirmación

## Estructura del Email

El correo de confirmación incluye:
- Mensaje de bienvenida personalizado con el nombre del usuario
- Confirmación del preregistro
- Información sobre próximos pasos
- Diseño responsive compatible con múltiples clientes de email

## Solución de Problemas

### Error: "RESEND_API_KEY no está configurada"
- Verifica que el archivo `.env.local` existe en la raíz del proyecto
- Confirma que la variable `RESEND_API_KEY` está correctamente escrita
- Reinicia el servidor de desarrollo después de agregar variables de entorno

### Error: "RESEND_FROM_EMAIL no está configurada"
- Agrega la variable `RESEND_FROM_EMAIL` a tu `.env.local`
- Asegúrate de usar un formato válido de email

### Los correos no se envían
- Verifica los logs del servidor para ver errores específicos
- Confirma que la API key es válida en el dashboard de Resend
- Revisa que el email del remitente esté en el formato correcto

### Los correos van a spam
- Verifica tu dominio en Resend
- Configura SPF, DKIM y DMARC según las instrucciones de Resend
- Evita usar palabras que puedan activar filtros de spam

## Archivos Relacionados

- Template HTML: `lib/email-templates/preregistro-confirmation.html`
- Función de envío: `lib/email.ts`
- Integración: `app/actions/preregistro.ts`

## Recursos

- [Documentación de Resend](https://resend.com/docs)
- [Guía de Verificación de Dominio](https://resend.com/docs/dashboard/domains/introduction)
- [Mejores Prácticas de Email](https://resend.com/docs/send-with-nodejs)

