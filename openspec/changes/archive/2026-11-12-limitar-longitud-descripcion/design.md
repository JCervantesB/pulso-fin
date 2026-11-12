# Design

## Context

La capacidad `sugerencias` ya valida que el título y la descripción no estén vacíos y que el título no supere 120 caracteres. La descripción no tenía límite. La tarjeta de la lista renderiza la descripción completa, por lo que una descripción muy larga desborda el diseño.

## Decisions

- **Límite de 1000 caracteres:** suficiente para una descripción razonable y coherente con el título (120). Se valida en el servidor (fuente de verdad), **sin** `maxLength` en el formulario, como en la plantilla: así la prueba de navegador puede enviar una descripción demasiado larga y comprobar el rechazo con el mensaje.
- **Mensaje claro:** "La descripción no puede superar los 1000 caracteres.", en el mismo estilo que los mensajes existentes.
- **Evidencia en Playwright:** se añade `screenshot: "only-on-failure"` y `trace: "retain-on-failure"` para disponer de captura y traza al depurar un fallo.
- **La prueba de navegador es la que reveló el defecto:** se añade al archivo de pruebas E2E una que envía una descripción de 1001 caracteres y espera el mensaje de error.

## Risks / Trade-offs

- [El límite es arbitrario] → 1000 es un valor razonable para una descripción; si el producto lo pide, se ajusta en un cambio posterior.

## Migration Plan

1. Añadir la validación de longitud en `lib/sugerencias.ts`.
2. Añadir `maxLength` al formulario.
3. Añadir las pruebas de Vitest y de Playwright.
4. Ajustar la configuración de Playwright para evidencia.
