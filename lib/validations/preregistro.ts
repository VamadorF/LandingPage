import { z } from "zod";

// ── Tipos ──────────────────────────────────────────────────────────────────

export type BuscaValue = "amistad" | "romance" | "apoyo_emocional";
export type DisposicionValue = "no_pagaria" | "tal_vez" | "si_pagaria";

export interface PreregistroFormData {
    nombre: string;
    email: string;
    arquetipo: string;
    estilo: "realista" | "anime";
    generoAvatar?: "masculino" | "femenino";
    aceptaTerminos: boolean;
    busca?: BuscaValue | null;
    disposicion_pago?: DisposicionValue | null;
}

export type PreregistroFormErrors = Partial<
    Record<keyof PreregistroFormData, string>
> & { general?: string };

// ── Constantes ─────────────────────────────────────────────────────────────

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BUSCA_OPTIONS: { value: BuscaValue; label: string }[] = [
    { value: "amistad", label: "Amistad" },
    { value: "romance", label: "Romance" },
    { value: "apoyo_emocional", label: "Apoyo emocional" },
];

export const DISPOSICION_OPTIONS: { value: DisposicionValue; label: string }[] =
    [
        { value: "no_pagaria", label: "No pagaría" },
        { value: "tal_vez", label: "Tal vez" },
        { value: "si_pagaria", label: "Sí pagaría" },
    ];

// ── Schema Zod (compartido frontend / server) ──────────────────────────────

export const preregistroSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(1, "El nombre es requerido")
        .min(4, "El nombre debe tener al menos 4 caracteres"),
    email: z.string().trim().toLowerCase().email("El email no es válido"),
    arquetipo: z.string().trim().min(1, "Debes seleccionar un arquetipo"),
    estilo: z.enum(["realista", "anime"]),
    generoAvatar: z.enum(["masculino", "femenino"], {
        message: "Debes seleccionar un género de avatar",
    }),
    aceptaTerminos: z
        .boolean()
        .refine((val) => val === true, "Debes aceptar los términos y condiciones"),
    busca: z.enum(["amistad", "romance", "apoyo_emocional"]).nullable().optional(),
    disposicion_pago: z
        .enum(["no_pagaria", "tal_vez", "si_pagaria"])
        .nullable()
        .optional(),
});

export type PreregistroSchema = z.infer<typeof preregistroSchema>;

// ── Validación client-side ─────────────────────────────────────────────────

/** Controla si el botón de submit debe estar habilitado (solo obligatorios). */
export function isPreregistroFormValid(data: PreregistroFormData): boolean {
    return (
        data.nombre.trim().length >= 4 &&
        EMAIL_REGEX.test(data.email) &&
        !!data.generoAvatar &&
        !!data.arquetipo &&
        data.aceptaTerminos
    );
}

/** Valida todos los campos y retorna un mapa de errores. Vacío = sin errores. */
export function validatePreregistroForm(
    data: PreregistroFormData
): PreregistroFormErrors {
    const errors: PreregistroFormErrors = {};

    // Obligatorios
    if (!data.nombre.trim()) {
        errors.nombre = "El nombre es requerido";
    } else if (data.nombre.trim().length < 4) {
        errors.nombre = "El nombre debe tener al menos 4 caracteres";
    }

    if (!data.email.trim()) {
        errors.email = "El email es requerido";
    } else if (!EMAIL_REGEX.test(data.email)) {
        errors.email = "El email no es válido";
    }

    if (!data.generoAvatar) {
        errors.generoAvatar = "Debes seleccionar un género de avatar";
    }

    if (!data.arquetipo) {
        errors.arquetipo = "Debes seleccionar un arquetipo";
    }

    if (!data.aceptaTerminos) {
        errors.aceptaTerminos = "Debes aceptar los términos y condiciones";
    }

    // Opcionales: si vienen, deben ser valores del enum
    if (data.busca != null) {
        const validBusca: BuscaValue[] = ["amistad", "romance", "apoyo_emocional"];
        if (!validBusca.includes(data.busca)) {
            errors.busca = "Opción inválida";
        }
    }

    if (data.disposicion_pago != null) {
        const validDisposicion: DisposicionValue[] = [
            "no_pagaria",
            "tal_vez",
            "si_pagaria",
        ];
        if (!validDisposicion.includes(data.disposicion_pago)) {
            errors.disposicion_pago = "Opción inválida";
        }
    }

    return errors;
}

/** Valida un único campo y retorna el mensaje de error, o undefined si es válido.
 *  Usado en onBlur para mostrar errores en tiempo real. */
export function validateField(
    field: keyof PreregistroFormData,
    data: PreregistroFormData
): string | undefined {
    switch (field) {
        case "nombre":
            if (!data.nombre.trim()) return "El nombre es requerido";
            if (data.nombre.trim().length < 4)
                return "El nombre debe tener al menos 4 caracteres";
            return undefined;

        case "email":
            if (!data.email.trim()) return "El email es requerido";
            if (!EMAIL_REGEX.test(data.email)) return "El email no es válido";
            return undefined;

        case "generoAvatar":
            if (!data.generoAvatar) return "Debes seleccionar un género de avatar";
            return undefined;

        case "arquetipo":
            if (!data.arquetipo) return "Debes seleccionar un arquetipo";
            return undefined;

        case "aceptaTerminos":
            if (!data.aceptaTerminos)
                return "Debes aceptar los términos y condiciones";
            return undefined;

        default:
            return undefined;
    }
}
