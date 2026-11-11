## Why

La plantilla de la lista de sugerencias dice «Cualquiera puede leerlas», pero no dice que tampoco hace falta iniciar sesión para hacerlo. Es un cambio pequeño de texto que sirve para recorrer el ciclo completo de OpenSpec sobre un caso sin riesgo.

## What Changes

- Cambiar el texto de la descripción de la página de sugerencias en `docs/mockups/sugerencias.html` para que diga que cualquier visitante puede leerlas, sin mencionar la sesión.
- No cambia ninguna clase de Tailwind, ningún elemento estructural ni ningún identificador.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

Ninguna. El cambio no altera ningún comportamiento de la aplicación: solo modifica un texto de una plantilla estática. Por eso el cambio declara `skip_specs: true`.

## Impact

- Archivo afectado: `docs/mockups/sugerencias.html`.
- Sin impacto en código, APIs, dependencias ni base de datos.
- Sin impacto en las demás plantillas.
