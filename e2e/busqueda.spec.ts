import { expect, test } from "@playwright/test";
import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { sugerencias, users } from "../db/schema";

const titulo = `Sugerencia buscable ${Date.now()}`;
let usuarioId: number;
let sugerenciaId: number;

test.beforeAll(async () => {
  const [usuario] = await db
    .insert(users)
    .values({ nombre: "Autor de búsqueda", email: `busqueda-${Date.now()}@pulso.test`, passwordHash: "hash" })
    .returning({ id: users.id });
  usuarioId = usuario.id;

  const [sugerencia] = await db
    .insert(sugerencias)
    .values({ titulo, descripcion: "Descripción buscable", autorId: usuarioId })
    .returning({ id: sugerencias.id });
  sugerenciaId = sugerencia.id;
});

test.afterAll(async () => {
  await db.delete(sugerencias).where(eq(sugerencias.id, sugerenciaId));
  await db.delete(users).where(eq(users.id, usuarioId));
});

test("buscar encuentra una sugerencia por su título", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Buscar sugerencias…").fill(titulo);
  await page.getByRole("button", { name: "Buscar" }).click();
  await expect(page.locator("h2", { hasText: titulo })).toBeVisible();
});

test("buscar sin resultados muestra el mensaje de no resultados, no el de lista vacía", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Buscar sugerencias…").fill("zzzz-término-inexistente");
  await page.getByRole("button", { name: "Buscar" }).click();
  await expect(page.getByText("No hay resultados para")).toBeVisible();
  await expect(page.getByText("Sé la primera persona en proponer una idea.")).toHaveCount(0);
});
