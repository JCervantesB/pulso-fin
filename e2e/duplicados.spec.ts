import { expect, test } from "@playwright/test";
import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { sugerencias, users } from "../db/schema";

const tituloExistente = `Idea existente ${Date.now()}`;
let autorId: number;
let sugerenciaId: number;

test.beforeAll(async () => {
  const [autor] = await db
    .insert(users)
    .values({ nombre: "Autor existente", email: `existente-${Date.now()}@pulso.test`, passwordHash: "hash" })
    .returning({ id: users.id });
  autorId = autor.id;

  const [sugerencia] = await db
    .insert(sugerencias)
    .values({ titulo: tituloExistente, descripcion: "Ya publicada antes", autorId: autor.id })
    .returning({ id: sugerencias.id });
  sugerenciaId = sugerencia.id;
});

test.afterAll(async () => {
  await db.delete(sugerencias).where(eq(sugerencias.id, sugerenciaId));
  await db.delete(users).where(eq(users.id, autorId));
});

test("avisa cuando el título ya existe y no lo crea", async ({ page }) => {
  const email = `dup-${Date.now()}@pulso.test`;
  await page.goto("/registro");
  await page.getByLabel("Nombre").fill("Usuario");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill("contrasena-segura");
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/sugerencias/nueva");
  await page.getByLabel("Título").fill(tituloExistente);
  await page.getByLabel("Descripción").fill("Otra descripción");
  await page.getByRole("button", { name: "Enviar sugerencia" }).click();

  await expect(page.getByText("Encontramos sugerencias parecidas")).toBeVisible();
  await expect(page.getByText(tituloExistente)).toBeVisible();
});

test("crea una sugerencia con un título sin coincidencias", async ({ page }) => {
  const email = `unico-${Date.now()}@pulso.test`;
  const titulo = `Idea nueva ${Date.now()}`;
  await page.goto("/registro");
  await page.getByLabel("Nombre").fill("Usuario");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill("contrasena-segura");
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/sugerencias/nueva");
  await page.getByLabel("Título").fill(titulo);
  await page.getByLabel("Descripción").fill("Descripción única");
  await page.getByRole("button", { name: "Enviar sugerencia" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.locator("h2", { hasText: titulo })).toBeVisible();
});
