# Proposal

## Why

La revisión manual en el navegador es imprescindible, pero no se repite sola: cada vez que algo cambia hay que volver a comprobarlo a mano. Playwright permite automatizar esa comprobación y ejecutarla siempre, de modo que un cambio que rompe un flujo se detecta sin depender de la memoria.

## What Changes

- Instalar `@playwright/test` con versión fija.
- Crear `playwright.config.ts` que arranca la aplicación con `webServer` y apunta a `http://localhost:3000`.
- Añadir una primera prueba de navegador: registrar un usuario, enviar una sugerencia y verla en la lista pública.
- Añadir el script `test:e2e` a `package.json`.
- Documentar cómo ejecutar las pruebas de navegador en `AGENTS.md`.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

Ninguna. Playwright es una herramienta de verificación, no cambia el comportamiento del producto. Por eso el cambio declara `skip_specs: true`. La corrección de las pruebas se comprueba ejecutándolas.

## Impact

- Nueva dependencia de desarrollo `@playwright/test`.
- Nuevos archivos `playwright.config.ts` y `tests/` con la primera prueba.
- Nueva entrada `test:e2e` en `package.json`.
- Requiere descargar el navegador con `npx playwright install chromium`.
- Sin cambios en la aplicación.
