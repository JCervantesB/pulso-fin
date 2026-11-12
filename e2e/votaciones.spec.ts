import { expect, test } from "@playwright/test";

test("un usuario vota y retira su voto", async ({ page }) => {
  const email = `votante-${Date.now()}@pulso.test`;
  const titulo = `Sugerencia para votar ${Date.now()}`;
  const descripcion = `Descripción ${Date.now()}`;

  await page.goto("/registro");
  await page.getByLabel("Nombre").fill("Votante");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill("contrasena-segura");
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/sugerencias/nueva");
  await page.getByLabel("Título").fill(titulo);
  await page.getByLabel("Descripción").fill(descripcion);
  await page.getByRole("button", { name: "Enviar sugerencia" }).click();
  await expect(page).toHaveURL("/");

  const card = page.locator("li").filter({ hasText: titulo });
  await expect(card.locator('[data-testid="contador-votos"]')).toHaveText("0");

  await card.getByRole("button", { name: "Votar" }).click();
  await expect(card.locator('[data-testid="contador-votos"]')).toHaveText("1");
  await expect(card.getByRole("button", { name: "Retirar voto" })).toBeVisible();

  await card.getByRole("button", { name: "Retirar voto" }).click();
  await expect(card.locator('[data-testid="contador-votos"]')).toHaveText("0");
});
