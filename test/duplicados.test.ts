import { eq, ilike } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../db/index";
import { sugerencias, users } from "../db/schema";

describe("detección de duplicados", () => {
  const marca = Date.now();
  const email = `autor-dup-${marca}@pulso.test`;
  const titulo = `Sugerencia duplicada ${marca}`;
  let usuarioId: number;
  let sugerenciaId: number;

  beforeAll(async () => {
    const [usuario] = await db
      .insert(users)
      .values({ nombre: "Autor de duplicados", email, passwordHash: "hash" })
      .returning({ id: users.id });
    usuarioId = usuario.id;

    const [sugerencia] = await db
      .insert(sugerencias)
      .values({ titulo, descripcion: `Descripción duplicada ${marca}`, autorId: usuarioId })
      .returning({ id: sugerencias.id });
    sugerenciaId = sugerencia.id;
  });

  afterAll(async () => {
    await db.delete(sugerencias).where(eq(sugerencias.id, sugerenciaId));
    await db.delete(users).where(eq(users.id, usuarioId));
  });

  it("encuentra una sugerencia con título parecido", async () => {
    const coincidencias = await db
      .select({ id: sugerencias.id })
      .from(sugerencias)
      .where(ilike(sugerencias.titulo, `%duplicada ${marca}%`));
    expect(coincidencias.map((c) => c.id)).toEqual([sugerenciaId]);
  });

  it("no encuentra coincidencias para un título distinto", async () => {
    const coincidencias = await db
      .select({ id: sugerencias.id })
      .from(sugerencias)
      .where(ilike(sugerencias.titulo, `%inexistente-${marca}%`));
    expect(coincidencias).toEqual([]);
  });
});
