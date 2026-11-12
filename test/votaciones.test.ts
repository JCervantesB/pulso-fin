import { sql } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../db/index";
import { sugerencias, users, votos } from "../db/schema";

describe("votos", () => {
  const email = `votante-${Date.now()}@pulso.test`;
  let usuarioId: number;
  let sugerenciaId: number;

  beforeAll(async () => {
    const [usuario] = await db
      .insert(users)
      .values({ nombre: "Votante de prueba", email, passwordHash: "hash" })
      .returning({ id: users.id });
    usuarioId = usuario.id;

    const [sugerencia] = await db
      .insert(sugerencias)
      .values({ titulo: "Sugerencia para votar", descripcion: "Descripción", autorId: usuarioId })
      .returning({ id: sugerencias.id });
    sugerenciaId = sugerencia.id;
  });

  afterAll(async () => {
    await db.delete(votos).where(sql`${votos.sugerenciaId} = ${sugerenciaId}`);
    await db.delete(sugerencias).where(sql`${sugerencias.id} = ${sugerenciaId}`);
    await db.delete(users).where(sql`${users.id} = ${usuarioId}`);
  });

  it("registra un voto y rechaza un duplicado del mismo usuario", async () => {
    const [voto] = await db
      .insert(votos)
      .values({ sugerenciaId, usuarioId })
      .returning({ id: votos.id });
    expect(voto.id).toBeGreaterThan(0);

    await expect(db.insert(votos).values({ sugerenciaId, usuarioId })).rejects.toThrow();
  });

  it("permite que otro usuario vote la misma sugerencia", async () => {
    const otroEmail = `otro-${Date.now()}@pulso.test`;
    const [otro] = await db
      .insert(users)
      .values({ nombre: "Otro votante", email: otroEmail, passwordHash: "hash" })
      .returning({ id: users.id });

    const [voto] = await db
      .insert(votos)
      .values({ sugerenciaId, usuarioId: otro.id })
      .returning({ id: votos.id });
    expect(voto.id).toBeGreaterThan(0);

    await db.delete(votos).where(sql`${votos.id} = ${voto.id}`);
    await db.delete(users).where(sql`${users.id} = ${otro.id}`);
  });
});
