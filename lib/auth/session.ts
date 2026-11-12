import { SignJWT, jwtVerify } from "jose";

const NOMBRE_COOKIE = "pulso-sesion";
const DURACION = 7 * 24 * 60 * 60; // 7 días en segundos

export type DatosSesion = {
  id: number;
  role: "usuario" | "administrador";
};

function claveSecreta(secreto: string | undefined): Uint8Array {
  if (!secreto) {
    throw new Error(
      "Falta la variable de entorno SESSION_SECRET. Añádela a .env siguiendo .env.example.",
    );
  }
  return new TextEncoder().encode(secreto);
}

export async function firmarToken(datos: DatosSesion, secreto: string | undefined): Promise<string> {
  return new SignJWT({ role: datos.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(datos.id))
    .setIssuedAt()
    .setExpirationTime(`${DURACION}s`)
    .sign(claveSecreta(secreto));
}

export async function verificarToken(
  token: string,
  secreto: string | undefined,
): Promise<DatosSesion | null> {
  try {
    const { payload } = await jwtVerify(token, claveSecreta(secreto), {
      algorithms: ["HS256"],
    });
    const id = Number(payload.sub);
    if (!Number.isInteger(id) || (payload.role !== "usuario" && payload.role !== "administrador")) {
      return null;
    }
    return { id, role: payload.role };
  } catch {
    return null;
  }
}

export { NOMBRE_COOKIE };
