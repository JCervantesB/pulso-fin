# Proposal

## Why

La revisión con el cliente dejó claro que hace falta saber qué sugerencias interesan más. La votación resuelve eso: cada persona con sesión puede votar una sugerencia una sola vez y retirar su voto, y el contador se muestra en la lista. Es una funcionalidad nueva que se construye encima de lo que ya funciona, sin reconstruir nada.

## What Changes

- Añadir la tabla `votos` con restricción de voto único por usuario y sugerencia en la base de datos.
- Añadir la acción para votar y retirar el voto (alternar).
- Mostrar el contador de votos en la lista pública, actualizado.
- Mostrar el botón de votar para quienes tienen sesión y redirigir a inicio de sesión a los visitantes.
- Añadir pruebas de Vitest (restricción de voto único) y de Playwright (flujo de votar y retirar).
- Mantener intactas las sugerencias existentes: la migración solo añade la tabla de votos.

## Capabilities

### New Capabilities

- `votaciones`: votar y retirar el voto, con contador visible y voto único por persona.

### Modified Capabilities

Ninguna. Las sugerencias existentes no cambian su comportamiento; solo se les suma el contador.

## Impact

- Nueva tabla `votos` en `db/schema.ts` con migración.
- Nueva server action `alternarVoto`.
- La página `/` lee los contadores y los votos del usuario actual.
- Nuevas pruebas en `test/` y `e2e/`.
- Sin cambios en el diseño: se conserva la estructura de tarjeta de la plantilla.
