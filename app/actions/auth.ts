"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { crearCookieSesion, borrarCookieSesion } from "@/lib/auth/cookies";

export type EstadoAuth = {
  error?: string;
};

function formatear(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("correo") ?? "").trim().toLowerCase();
  const contrasena = String(formData.get("contrasena") ?? "");
  return { nombre, email, contrasena };
}

export async function registrar(_estado: EstadoAuth, formData: FormData): Promise<EstadoAuth> {
  const { nombre, email, contrasena } = formatear(formData);

  if (!nombre || !email || !contrasena) {
    return { error: "Completa todos los campos." };
  }
  if (contrasena.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  const existente = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (existente.length > 0) {
    return { error: "Ya existe una cuenta con ese correo." };
  }

  const passwordHash = await hashPassword(contrasena);
  const insertados = await db
    .insert(users)
    .values({ nombre, email, passwordHash })
    .returning({ id: users.id, role: users.role });

  const usuario = insertados[0];
  await crearCookieSesion({ id: usuario.id, role: usuario.role });
  redirect("/");
}

export async function iniciarSesion(_estado: EstadoAuth, formData: FormData): Promise<EstadoAuth> {
  const { email, contrasena } = formatear(formData);

  if (!email || !contrasena) {
    return { error: "Completa todos los campos." };
  }

  const filas = await db.select().from(users).where(eq(users.email, email));
  const usuario = filas[0];

  const valida = usuario ? await verifyPassword(contrasena, usuario.passwordHash) : false;
  if (!usuario || !valida) {
    return { error: "Correo o contraseña incorrectos." };
  }

  await crearCookieSesion({ id: usuario.id, role: usuario.role });
  redirect("/");
}

export async function cerrarSesion(): Promise<void> {
  await borrarCookieSesion();
  redirect("/");
}
