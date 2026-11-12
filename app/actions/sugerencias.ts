"use server";

import { redirect } from "next/navigation";
import { ilike } from "drizzle-orm";
import { db } from "@/db";
import { sugerencias } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { validarSugerencia } from "@/lib/sugerencias";

export type EstadoSugerencia = {
  error?: string;
  similares?: { id: number; titulo: string }[];
};

export async function crearSugerencia(_estado: EstadoSugerencia, formData: FormData): Promise<EstadoSugerencia> {
  const sesion = await leerSesion();
  if (!sesion) {
    redirect("/login");
  }

  const titulo = String(formData.get("titulo") ?? "");
  const descripcion = String(formData.get("descripcion") ?? "");

  const validacion = validarSugerencia(titulo, descripcion);
  if (!validacion.ok) {
    return { error: validacion.error };
  }

  const similares = await db
    .select({ id: sugerencias.id, titulo: sugerencias.titulo })
    .from(sugerencias)
    .where(ilike(sugerencias.titulo, `%${validacion.titulo}%`))
    .limit(5);

  if (similares.length > 0) {
    return { similares };
  }

  await db.insert(sugerencias).values({
    titulo: validacion.titulo,
    descripcion: validacion.descripcion,
    autorId: sesion.id,
  });

  redirect("/");
}
