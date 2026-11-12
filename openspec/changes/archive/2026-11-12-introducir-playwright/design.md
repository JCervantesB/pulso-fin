# Design

## Context

El proyecto ya tiene autenticación y sugerencias funcionales. La revisión manual se ha hecho hasta ahora en el navegador. Las pruebas unitarias y de integración usan Vitest.

## Decisions

- **Playwright con `webServer`:** la configuración arranca `next start` (después de un `next build`) en el puerto 3000 y espera a que esté disponible antes de correr las pruebas. Así `npx playwright test` funciona sin levantar el servidor a mano.
- **Navegador único (Chromium):** para el curso basta con un navegador; Firefox y WebKit se omiten para reducir el tiempo de instalación.
- **Prueba de flujo completo:** la primera prueba registra un usuario con un correo único, inicia sesión, envía una sugerencia y comprueba que aparece en la lista. Cubre el ciclo completo del producto.
- **Datos únicos por ejecución:** el correo se genera con `Date.now()` para que la prueba pueda repetirse sin colisionar.

## Risks / Trade-offs

- [La prueba usa la base de datos real de Neon] → crea un usuario con correo único y, por ahora, no lo borra; se acepta para el curso y se revisa en módulos posteriores.
- [Descargar el navegador lleva tiempo] → se documenta `npx playwright install chromium` como paso previo.

## Migration Plan

1. Instalar `@playwright/test` y descargar Chromium.
2. Crear `playwright.config.ts` y la primera prueba.
3. Añadir `test:e2e` a `package.json`.
4. Ejecutar y verificar la prueba.
