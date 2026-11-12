# Tasks

## 1. Validación

- [x] 1.1 Añadir la comprobación de longitud de descripción (1000 caracteres) en `lib/sugerencias.ts`. Verificación: `npx tsc --noEmit` compila.
- [x] 1.2 Mantener el formulario sin `maxLength` en la descripción (como la plantilla), de modo que el rechazo ocurra en el servidor. Verificación: el área de descripción no lleva `maxLength`.

## 2. Pruebas y evidencia

- [x] 2.1 Añadir la prueba de Vitest para la descripción demasiado larga. Verificación: `npm test` pasa.
- [x] 2.2 Añadir la prueba de Playwright que envía una descripción de más de 1000 caracteres y comprueba el mensaje. Verificación: `npm run test:e2e` pasa.
- [x] 2.3 Configurar captura y traza al fallar en `playwright.config.ts`. Verificación: la configuración carga sin error.

## Workflow follow-up

- Archivar el cambio con `openspec archive limitar-longitud-descripcion` cuando las tareas estén completas.
