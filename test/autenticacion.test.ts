import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "../lib/auth/password";
import { firmarToken, verificarToken } from "../lib/auth/session";

const SECRETO = "secreto-de-prueba";

describe("contraseñas", () => {
  it("guarda la contraseña como derivado con sal, no en texto plano", async () => {
    const guardada = await hashPassword("contrasena-segura");
    expect(guardada).not.toContain("contrasena-segura");
    expect(guardada.split(":")).toHaveLength(2);
  });

  it("acepta la contraseña correcta y rechaza la incorrecta", async () => {
    const guardada = await hashPassword("contrasena-segura");
    await expect(verifyPassword("contrasena-segura", guardada)).resolves.toBe(true);
    await expect(verifyPassword("contrasena-incorrecta", guardada)).resolves.toBe(false);
  });

  it("produce derivados distintos para la misma contraseña", async () => {
    const a = await hashPassword("misma-contrasena");
    const b = await hashPassword("misma-contrasena");
    expect(a).not.toBe(b);
  });
});

describe("sesión", () => {
  it("firma y verifica un token con el id y el rol", async () => {
    const token = await firmarToken({ id: 7, role: "administrador" }, SECRETO);
    const datos = await verificarToken(token, SECRETO);
    expect(datos).toEqual({ id: 7, role: "administrador" });
  });

  it("rechaza un token firmado con otro secreto", async () => {
    const token = await firmarToken({ id: 7, role: "usuario" }, SECRETO);
    const datos = await verificarToken(token, "otro-secreto");
    expect(datos).toBeNull();
  });

  it("rechaza un token que no es válido", async () => {
    const datos = await verificarToken("no-es-un-token", SECRETO);
    expect(datos).toBeNull();
  });

  it("exige el secreto para firmar", async () => {
    await expect(firmarToken({ id: 1, role: "usuario" }, undefined)).rejects.toThrow();
  });
});
