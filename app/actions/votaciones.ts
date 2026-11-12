"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { votos } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";

export async function alternarVoto(formData: FormData): Promise<void> {
  const sesion = await leerSesion();
  if (!sesion) {
    redirect("/login");
  }

  const sugerenciaId = Number(formData.get("sugerenciaId"));
  if (!Number.isInteger(sugerenciaId) || sugerenciaId <= 0) {
    return;
  }

  const existente = await db
    .select({ id: votos.id })
    .from(votos)
    .where(and(eq(votos.sugerenciaId, sugerenciaId), eq(votos.usuarioId, sesion.id)));

  if (existente.length > 0) {
    await db.delete(votos).where(eq(votos.id, existente[0].id));
  } else {
    await db
      .insert(votos)
      .values({ sugerenciaId, usuarioId: sesion.id })
      .onConflictDoNothing();
  }

  revalidatePath("/");
}
