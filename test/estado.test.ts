import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../db/index";
import { sugerencias, users } from "../db/schema";

describe("estado de sugerencias", () => {
  const email = `autor-estado-${Date.now()}@pulso.test`;
  let usuarioId: number;
  let sugerenciaId: number;

  beforeAll(async () => {
    const [usuario] = await db
      .insert(users)
      .values({ nombre: "Autor de estado", email, passwordHash: "hash" })
      .returning({ id: users.id });
    usuarioId = usuario.id;

    const [sugerencia] = await db
      .insert(sugerencias)
      .values({ titulo: "Sugerencia de estado", descripcion: "Descripción", autorId: usuarioId })
      .returning({ id: sugerencias.id });
    sugerenciaId = sugerencia.id;
  });

  afterAll(async () => {
    await db.delete(sugerencias).where(eq(sugerencias.id, sugerenciaId));
    await db.delete(users).where(eq(users.id, usuarioId));
  });

  it("empieza en pendiente y se puede cambiar a completada", async () => {
    const inicial = await db
      .select({ estado: sugerencias.estado })
      .from(sugerencias)
      .where(eq(sugerencias.id, sugerenciaId));
    expect(inicial[0].estado).toBe("pendiente");

    await db.update(sugerencias).set({ estado: "completada" }).where(eq(sugerencias.id, sugerenciaId));

    const actualizado = await db
      .select({ estado: sugerencias.estado })
      .from(sugerencias)
      .where(eq(sugerencias.id, sugerenciaId));
    expect(actualizado[0].estado).toBe("completada");
  });
});
