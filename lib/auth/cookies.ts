import "server-only";
import { cookies } from "next/headers";
import { NOMBRE_COOKIE, DatosSesion, firmarToken, verificarToken } from "./session";

function secreto(): string | undefined {
  return process.env.SESSION_SECRET;
}

export async function crearCookieSesion(datos: DatosSesion): Promise<void> {
  const token = await firmarToken(datos, secreto());
  const almacen = await cookies();
  almacen.set(NOMBRE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}

export async function leerSesion(): Promise<DatosSesion | null> {
  const almacen = await cookies();
  const token = almacen.get(NOMBRE_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return verificarToken(token, secreto());
}

export async function borrarCookieSesion(): Promise<void> {
  const almacen = await cookies();
  almacen.delete(NOMBRE_COOKIE);
}
