# Tasks

## 1. Instalación y configuración

- [x] 1.1 Instalar `@playwright/test` con versión exacta y descargar Chromium. Verificación: `npx playwright --version` y el navegador instalado.
- [x] 1.2 Crear `playwright.config.ts` con `webServer` y `baseURL`. Verificación: la configuración carga sin error.

## 2. Primera prueba

- [x] 2.1 Añadir la prueba que registra un usuario, envía una sugerencia y la ve en la lista. Verificación: `npm run test:e2e` pasa.
- [x] 2.2 Añadir el script `test:e2e` a `package.json` y documentarlo en `AGENTS.md`. Verificación: el comando documentado se ejecuta como está escrito.

## Workflow follow-up

- Archivar el cambio con `openspec archive introducir-playwright` cuando las tareas estén completas.
