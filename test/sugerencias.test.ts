import { sql } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { validarSugerencia } from "../lib/sugerencias";
import { db } from "../db/index";
import { sugerencias, users } from "../db/schema";

describe("validación de sugerencias", () => {
  it("acepta título y descripción válidos", () => {
    const resultado = validarSugerencia("  Título de prueba  ", "  Descripción de prueba  ");
    expect(resultado).toEqual({ ok: true, titulo: "Título de prueba", descripcion: "Descripción de prueba" });
  });

  it("rechaza el título vacío", () => {
    const resultado = validarSugerencia("   ", "descripción");
    expect(resultado).toEqual({ ok: false, error: "El título no puede estar vacío." });
  });

  it("rechaza la descripción vacía", () => {
    const resultado = validarSugerencia("título", "   ");
    expect(resultado).toEqual({ ok: false, error: "La descripción no puede estar vacía." });
  });

  it("rechaza un título de más de 120 caracteres", () => {
    const resultado = validarSugerencia("a".repeat(121), "descripción");
    expect(resultado).toEqual({ ok: false, error: "El título no puede superar los 120 caracteres." });
  });

  it("rechaza una descripción de más de 1000 caracteres", () => {
    const resultado = validarSugerencia("título", "a".repeat(1001));
    expect(resultado).toEqual({ ok: false, error: "La descripción no puede superar los 1000 caracteres." });
  });

  it("acepta una descripción de exactamente 1000 caracteres", () => {
    const resultado = validarSugerencia("título", "a".repeat(1000));
    expect(resultado).toEqual({ ok: true, titulo: "título", descripcion: "a".repeat(1000) });
  });
});

describe("tabla de sugerencias", () => {
  const email = `autor-${Date.now()}@pulso.test`;
  let autorId: number;

  beforeAll(async () => {
    const insertados = await db
      .insert(users)
      .values({ nombre: "Autor de prueba", email, passwordHash: "hash" })
      .returning({ id: users.id });
    autorId = insertados[0].id;
  });

  afterAll(async () => {
    await db.delete(sugerencias).where(sql`${sugerencias.autorId} = ${autorId}`);
    await db.delete(users).where(sql`${users.id} = ${autorId}`);
  });

  it("guarda una sugerencia ligada al autor con estado pendiente", async () => {
    const insertadas = await db
      .insert(sugerencias)
      .values({ titulo: "Título", descripcion: "Descripción", autorId })
      .returning({ id: sugerencias.id, estado: sugerencias.estado, autorId: sugerencias.autorId });

    expect(insertadas).toHaveLength(1);
    expect(insertadas[0].estado).toBe("pendiente");
    expect(insertadas[0].autorId).toBe(autorId);
  });

  it("expone las columnas de sugerencias", async () => {
    const columnas = await db.execute(sql`
      select column_name from information_schema.columns
      where table_name = 'sugerencias' order by ordinal_position
    `);
    const nombres = columnas.rows.map((fila) => (fila as { column_name: string }).column_name);
    expect(nombres).toEqual(
      expect.arrayContaining(["id", "titulo", "descripcion", "autor_id", "estado", "created_at"]),
    );
  });
});
