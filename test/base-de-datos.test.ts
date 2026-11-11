import { sql } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";
import { db } from "../db/index";
import { users } from "../db/schema";

const email = `prueba-${Date.now()}@pulso.test`;

afterAll(async () => {
  await db.delete(users).where(sql`${users.email} = ${email}`);
});

describe("conexión a la base de datos", () => {
  it("responde a una consulta de comprobación", async () => {
    const resultado = await db.execute(sql`select 1 as uno`);
    expect(resultado.rows[0]).toEqual({ uno: 1 });
  });

  it("expone la tabla de usuarios con sus columnas", async () => {
    const columnas = await db.execute(sql`
      select column_name, column_default, is_nullable
      from information_schema.columns
      where table_name = 'users'
      order by ordinal_position
    `);
    const nombres = columnas.rows.map((fila) => (fila as { column_name: string }).column_name);
    expect(nombres).toEqual(
      expect.arrayContaining(["id", "nombre", "email", "password_hash", "role", "created_at"]),
    );
  });
});

describe("tabla de usuarios", () => {
  it("asigna el rol usuario por defecto", async () => {
    await db.insert(users).values({
      nombre: "Prueba",
      email,
      passwordHash: "hash-de-prueba",
    });

    const fila = await db.select().from(users).where(sql`${users.email} = ${email}`);
    expect(fila).toHaveLength(1);
    expect(fila[0].role).toBe("usuario");
  });

  it("rechaza un correo repetido", async () => {
    await expect(
      db.insert(users).values({
        nombre: "Otra cuenta",
        email,
        passwordHash: "hash-de-prueba",
      }),
    ).rejects.toThrow();
  });

  it("rechaza un rol que no es usuario ni administrador", async () => {
    await expect(
      db.execute(sql`
        insert into users (nombre, email, password_hash, role)
        values ('Rol inválido', ${`rol-${Date.now()}@pulso.test`}, 'hash', 'jefe')
      `),
    ).rejects.toThrow();
  });
});
