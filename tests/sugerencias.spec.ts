import { expect, test } from "@playwright/test";

test("un usuario registra una cuenta, envía una sugerencia y la ve en la lista", async ({ page }) => {
  const email = `usuario-${Date.now()}@pulso.test`;
  const titulo = `Sugerencia de prueba ${Date.now()}`;
  const descripcion = "Esta es una descripción de prueba creada por Playwright.";

  // Registro
  await page.goto("/registro");
  await page.getByLabel("Nombre").fill("Usuario de prueba");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill("contrasena-segura");
  await page.getByRole("button", { name: "Crear cuenta" }).click();

  // Tras el registro, la sesión queda iniciada y redirige a la portada.
  await expect(page).toHaveURL("/");

  // Envía una sugerencia
  await page.goto("/sugerencias/nueva");
  await page.getByLabel("Título").fill(titulo);
  await page.getByLabel("Descripción").fill(descripcion);
  await page.getByRole("button", { name: "Enviar sugerencia" }).click();

  // Aparece en la lista pública
  await expect(page).toHaveURL("/");
  await expect(page.locator("h2", { hasText: titulo })).toBeVisible();
  await expect(page.getByText(descripcion)).toBeVisible();
});
