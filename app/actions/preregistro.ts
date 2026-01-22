"use server";

import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";

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

  // Inserción con manejo de errores
  const { error } = await supabaseServer.from("preregistros").insert({
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
    return { ok: false, code: "DB", message: "Error al guardar el registro" };
  }

  return { ok: true };
}

