"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sugerencias } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";

const ESTADOS = ["pendiente", "en_desarrollo", "completada"] as const;
export type Estado = (typeof ESTADOS)[number];

export async function cambiarEstado(id: number, estado: string): Promise<void> {
  const sesion = await leerSesion();
  if (!sesion) {
    redirect("/login");
  }
  if (sesion.role !== "administrador") {
    redirect("/");
  }
  if (!Number.isInteger(id) || id <= 0) {
    return;
  }
  if (!ESTADOS.includes(estado as Estado)) {
    return;
  }

  await db.update(sugerencias).set({ estado: estado as Estado }).where(eq(sugerencias.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}
