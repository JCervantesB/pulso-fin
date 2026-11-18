import { eq } from "drizzle-orm";
import { afterEach, describe, expect, it } from "vitest";
import { db } from "../db/index";
import { users } from "../db/schema";
import { esCorreoDuplicado } from "../lib/auth/errores";

describe("reconocimiento de correo duplicado", () => {
  it("reconoce el error de unicidad de correo en la cadena de causas", () => {
    const causa = Object.assign(new Error("duplicate key"), {
      code: "23505",
      constraint_name: "users_email_unique",
    });
    const error = new Error("Failed query", { cause: causa });
    expect(esCorreoDuplicado(error)).toBe(true);
  });

  it("ignora otro código de error de PostgreSQL", () => {
    const error = Object.assign(new Error("not null violation"), { code: "23502" });
    expect(esCorreoDuplicado(error)).toBe(false);
  });

  it("ignora un error de unicidad de otra restricción", () => {
    const error = Object.assign(new Error("otra restricción"), {
      code: "23505",
      constraint_name: "votos_sugerencia_usuario_unico",
    });
    expect(esCorreoDuplicado(error)).toBe(false);
  });

  it("no reconoce valores que no son errores", () => {
    expect(esCorreoDuplicado(undefined)).toBe(false);
    expect(esCorreoDuplicado("23505")).toBe(false);
  });
});

describe("registro simultáneo con el mismo correo", () => {
  const email = `carrera-${Date.now()}@pulso.test`;

  afterEach(async () => {
    await db.delete(users).where(eq(users.email, email));
  });

  it("guarda una sola cuenta y el otro intento recibe el error reconocido", async () => {
    const intentos = await Promise.allSettled([
      db.insert(users).values({ nombre: "Primera", email, passwordHash: "h1" }).returning({ id: users.id }),
      db.insert(users).values({ nombre: "Segunda", email, passwordHash: "h2" }).returning({ id: users.id }),
    ]);

    const exitosos = intentos.filter((r) => r.status === "fulfilled");
    const fallidos = intentos.filter((r): r is PromiseRejectedResult => r.status === "rejected");

    expect(exitosos).toHaveLength(1);
    expect(fallidos).toHaveLength(1);
    expect(esCorreoDuplicado(fallidos[0].reason)).toBe(true);

    const guardados = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
    expect(guardados).toHaveLength(1);
  });
});
