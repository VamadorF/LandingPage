import { Resend } from "resend";
import { readFileSync } from "fs";
import { join } from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

interface PreregistroEmailData {
  nombre: string;
  email: string;
}

/**
 * Envía un correo de confirmación de pre-registro al usuario
 * @param data Datos del usuario (nombre y email)
 * @returns Promise con el resultado del envío
 */
export async function sendPreregistroConfirmationEmail(
  data: PreregistroEmailData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validar que las variables de entorno estén configuradas
    if (!process.env.RESEND_API_KEY) {
      console.error("[Email] RESEND_API_KEY no está configurada");
      return { success: false, error: "Configuración de email no disponible" };
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      console.error("[Email] RESEND_FROM_EMAIL no está configurada");
      return { success: false, error: "Email del remitente no configurado" };
    }

    // Leer el template HTML
    const templatePath = join(
      process.cwd(),
      "lib",
      "email-templates",
      "preregistro-confirmation.html"
    );

    let htmlTemplate: string;
    try {
      htmlTemplate = readFileSync(templatePath, "utf-8");
    } catch (error) {
      console.error("[Email] Error al leer el template:", error);
      return { success: false, error: "Error al cargar el template de email" };
    }

    // Reemplazar variables en el template
    const htmlContent = htmlTemplate
      .replace(/\{\{nombre\}\}/g, escapeHtml(data.nombre))
      .replace(/\{\{email\}\}/g, escapeHtml(data.email));

    // Enviar el correo usando Resend
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [data.email],
      subject: "¡Bienvenido a eJoi! Tu preregistro ha sido confirmado",
      html: htmlContent,
    });

    if (error) {
      console.error("[Email] Error al enviar correo:", error);
      return { success: false, error: error.message || "Error al enviar correo" };
    }

    console.log("[Email] Correo enviado exitosamente a:", data.email);
    return { success: true };
  } catch (error) {
    console.error("[Email] Error inesperado al enviar correo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

/**
 * Escapa caracteres HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

