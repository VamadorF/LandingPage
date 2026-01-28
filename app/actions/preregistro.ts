"use server";

import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";
import { sendPreregistroConfirmationEmail } from "@/lib/email";

const preregistroSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido").trim(),
  email: z.string().email("Email inválido").trim().toLowerCase(),
  arquetipo: z.string().min(1, "Arquetipo requerido").trim(),
  estilo: z.enum(["realista", "anime"]),
  generoAvatar: z.enum(["masculino", "femenino"]),
  aceptaTerminos: z.boolean().refine((val) => val === true, "Debes aceptar los términos"),
});

export async function submitPreregistro(input: unknown) {
  // Validación con Zod
  const validation = preregistroSchema.safeParse(input);
  
  if (!validation.success) {
    return { 
      ok: false, 
      code: "VALIDATION", 
      message: validation.error.issues[0]?.message || "Datos inválidos" 
    };
  }

  const payload = validation.data;

  try {
    // Inserción con manejo de errores
    const { error, data } = await supabaseServer.from("preregistros").insert({
      nombre: payload.nombre,
      email: payload.email,
      arquetipo: payload.arquetipo,
      estilo: payload.estilo,
      genero_avatar: payload.generoAvatar,
      acepta_terminos: payload.aceptaTerminos,
    });

    if (error) {
      // 23505 = unique violation en Postgres
      if ((error as any).code === "23505") {
        return { ok: false, code: "DUPLICATE", message: "Este email ya está registrado" };
      }

      // Log de errores de base de datos (útil para debugging)
      console.error("[submitPreregistro] Error de Supabase:", {
        code: (error as any).code,
        message: (error as any).message,
        details: (error as any).details,
        hint: (error as any).hint,
      });

      return { ok: false, code: "DB", message: "Error al guardar el registro. Por favor, intenta nuevamente." };
    }

    // Enviar correo de confirmación (no bloquea la respuesta si falla)
    sendPreregistroConfirmationEmail({
      nombre: payload.nombre,
      email: payload.email,
    }).catch((emailError) => {
      // Log del error pero no afecta el resultado del registro
      console.error("[submitPreregistro] Error al enviar email de confirmación:", emailError);
    });

    return { ok: true };
  } catch (err) {
    // Capturar errores inesperados (ej: variables de entorno faltantes)
    console.error("[submitPreregistro] Error inesperado:", err);
    return { 
      ok: false, 
      code: "UNEXPECTED", 
      message: "Error inesperado. Por favor, contacta al soporte si el problema persiste." 
    };
  }
}

