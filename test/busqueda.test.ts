import { eq, ilike, or } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../db/index";
import { sugerencias, users } from "../db/schema";

describe("búsqueda de sugerencias", () => {
  const email = `autor-busqueda-${Date.now()}@pulso.test`;
  let usuarioId: number;
  let idCon: number;
  let idSin: number;

  beforeAll(async () => {
    const [usuario] = await db
      .insert(users)
      .values({ nombre: "Autor de búsqueda", email, passwordHash: "hash" })
      .returning({ id: users.id });
    usuarioId = usuario.id;

    const [s1] = await db
      .insert(sugerencias)
      .values({ titulo: "Exportar a CSV", descripcion: "Llevar datos a una hoja de cálculo", autorId: usuarioId })
      .returning({ id: sugerencias.id });
    idCon = s1.id;

    const [s2] = await db
      .insert(sugerencias)
      .values({ titulo: "Modo oscuro", descripcion: "Tema nocturno para la aplicación", autorId: usuarioId })
      .returning({ id: sugerencias.id });
    idSin = s2.id;
  });

  afterAll(async () => {
    await db.delete(sugerencias).where(or(eq(sugerencias.id, idCon), eq(sugerencias.id, idSin)));
    await db.delete(users).where(eq(users.id, usuarioId));
  });

  it("coincide en el título sin distinguir mayúsculas", async () => {
    const resultados = await db
      .select({ id: sugerencias.id })
      .from(sugerencias)
      .where(ilike(sugerencias.titulo, "%csv%"));
    expect(resultados.map((r) => r.id)).toEqual([idCon]);
  });

  it("coincide en la descripción", async () => {
    const resultados = await db
      .select({ id: sugerencias.id })
      .from(sugerencias)
      .where(or(ilike(sugerencias.titulo, "%nocturno%"), ilike(sugerencias.descripcion, "%nocturno%")));
    expect(resultados.map((r) => r.id)).toEqual([idSin]);
  });
});
