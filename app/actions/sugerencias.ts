"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { sugerencias } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { validarSugerencia } from "@/lib/sugerencias";

export type EstadoSugerencia = {
  error?: string;
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

  await db.insert(sugerencias).values({
    titulo: validacion.titulo,
    descripcion: validacion.descripcion,
    autorId: sesion.id,
  });

  redirect("/");
}
