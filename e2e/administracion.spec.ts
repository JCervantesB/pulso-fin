import { expect, test } from "@playwright/test";
import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { sugerencias, users } from "../db/schema";
import { hashPassword } from "../lib/auth/password";

const adminEmail = `admin-${Date.now()}@pulso.test`;
const adminPassword = "admin-segura";
const titulo = `Sugerencia para administrar ${Date.now()}`;
let adminId: number;
let sugerenciaId: number;

test.beforeAll(async () => {
  const passwordHash = await hashPassword(adminPassword);
  const [admin] = await db
    .insert(users)
    .values({ nombre: "Admin de prueba", email: adminEmail, passwordHash, role: "administrador" })
    .returning({ id: users.id });
  adminId = admin.id;

  const [sugerencia] = await db
    .insert(sugerencias)
    .values({ titulo, descripcion: "Descripción de administración", autorId: adminId })
    .returning({ id: sugerencias.id });
  sugerenciaId = sugerencia.id;
});

test.afterAll(async () => {
  await db.delete(sugerencias).where(eq(sugerencias.id, sugerenciaId));
  await db.delete(users).where(eq(users.id, adminId));
});

test("un administrador cambia el estado y la lista lo refleja", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Correo electrónico").fill(adminEmail);
  await page.getByLabel("Contraseña").fill(adminPassword);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/admin");
  const fila = page.locator("tr").filter({ hasText: titulo });
  await expect(fila).toBeVisible();

  await Promise.all([
    page.waitForResponse((resp) => resp.request().method() === "POST"),
    fila.locator("select").selectOption("completada"),
  ]);

  await page.goto("/");
  const card = page.locator("li").filter({ hasText: titulo });
  await expect(card.getByText("Completada")).toBeVisible();
});
