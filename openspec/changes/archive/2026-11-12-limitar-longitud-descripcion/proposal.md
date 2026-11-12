# Proposal

## Why

Al ampliar la prueba de navegador con casos límite se descubre que la descripción de una sugerencia no tiene límite de longitud: se acepta una descripción muy larga y desborda la tarjeta de la lista. El título ya tiene límite; la descripción debería tenerlo también.

## What Changes

- Limitar la longitud de la descripción a 1000 caracteres, con un mensaje de error claro cuando se supera.
- Añadir `maxLength` al campo de descripción en el formulario.
- Añadir una prueba de Playwright que envía una descripción demasiado larga y comprueba que se rechaza con el mensaje.
- Añadir una prueba de Vitest para la validación de longitud.
- Configurar Playwright para guardar captura y traza cuando una prueba falla.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `sugerencias`: se añade la validación de longitud de la descripción.

## Impact

- `lib/sugerencias.ts`: la validación rechaza descripciones de más de 1000 caracteres.
- `app/sugerencias/nueva/form.tsx`: el área de descripción limita a 1000 caracteres.
- `playwright.config.ts`: captura y traza al fallar.
- `test/sugerencias.test.ts` y `tests/sugerencias.spec.ts`: nuevas pruebas.
- Sin cambios en el diseño visual.
