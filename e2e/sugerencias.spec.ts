import { expect, test } from "@playwright/test";

test("un usuario registra una cuenta, envía una sugerencia y la ve en la lista", async ({ page }) => {
  const email = `usuario-${Date.now()}@pulso.test`;
  const titulo = `Sugerencia de prueba ${Date.now()}`;
  const descripcion = `Esta es una descripción de prueba ${Date.now()}.`;

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

test("rechaza una descripción de más de 1000 caracteres con un mensaje", async ({ page }) => {
  const email = `usuario-${Date.now()}@pulso.test`;

  await page.goto("/registro");
  await page.getByLabel("Nombre").fill("Usuario de prueba");
  await page.getByLabel("Correo electrónico").fill(email);
  await page.getByLabel("Contraseña").fill("contrasena-segura");
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/sugerencias/nueva");
  await page.getByLabel("Título").fill("Título válido");
  await page.getByLabel("Descripción").fill("a".repeat(1001));
  await page.getByRole("button", { name: "Enviar sugerencia" }).click();

  await expect(page.getByText("La descripción no puede superar los 1000 caracteres.")).toBeVisible();
});
