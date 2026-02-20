"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { sendPreregistroConfirmationEmail } from "@/lib/email";
import {
  preregistroSchema,
  type PreregistroSchema,
} from "@/lib/validations/preregistro";

export async function submitPreregistro(input: unknown) {
  // Validación con el schema compartido
  const validation = preregistroSchema.safeParse(input);

  if (!validation.success) {
    // Construir mapa de errores por campo
    const fieldErrors: Partial<Record<keyof PreregistroSchema, string>> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as keyof PreregistroSchema;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      ok: false,
      code: "VALIDATION" as const,
      message: validation.error.issues[0]?.message ?? "Datos inválidos",
      fieldErrors,
    };
  }

  const payload = validation.data;

  try {
    const { error } = await supabaseServer.from("preregistros").insert({
      nombre: payload.nombre,
      email: payload.email,
      arquetipo: payload.arquetipo,
      estilo: payload.estilo,
      genero_avatar: payload.generoAvatar,
      acepta_terminos: payload.aceptaTerminos,
      busca: payload.busca ?? null,
      disposicion_pago: payload.disposicion_pago ?? null,
    });

    if (error) {
      // 23505 = unique violation en Postgres (email duplicado)
      if ((error as any).code === "23505") {
        return {
          ok: false,
          code: "DUPLICATE" as const,
          message: "Este email ya está preregistrado. ¿Quizás ya te registraste antes?",
          fieldErrors: { email: "Este email ya está preregistrado" },
        };
      }

      console.error("[submitPreregistro] Error de Supabase:", {
        code: (error as any).code,
        message: (error as any).message,
        details: (error as any).details,
        hint: (error as any).hint,
      });

      return {
        ok: false,
        code: "DB" as const,
        message: "No pudimos completar el preregistro. Por favor, intenta de nuevo.",
      };
    }

    // Enviar correo de confirmación (no bloquea si falla)
    sendPreregistroConfirmationEmail({
      nombre: payload.nombre,
      email: payload.email,
    }).catch((emailError) => {
      console.error("[submitPreregistro] Error al enviar email:", emailError);
    });

    return { ok: true };
  } catch (err) {
    console.error("[submitPreregistro] Error inesperado:", err);
    return {
      ok: false,
      code: "UNEXPECTED" as const,
      message: "Error inesperado. Por favor, intenta de nuevo o contacta al soporte.",
    };
  }
}
