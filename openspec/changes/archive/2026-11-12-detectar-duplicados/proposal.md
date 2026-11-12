# Proposal

## Why

Con el uso, aparece un problema real: las personas envían sugerencias que ya existen. La lista crece y se llena de ideas repetidas que cuesta distinguir. Antes de publicar una sugerencia nueva, conviene avisar si ya hay algo parecido, para que quien escribe revise lo que ya está propuesto.

## What Changes

- Al enviar una sugerencia, buscar las existentes cuyo título coincide con el nuevo (sin distinguir mayúsculas), reutilizando la búsqueda ya construida.
- Si hay coincidencias, avisar mostrándolas y no crear la sugerencia duplicada.
- Si no las hay, crear la sugerencia como hasta ahora.
- Añadir pruebas de Vitest y de Playwright para la detección.

## Capabilities

### New Capabilities

- `deteccion-duplicados`: avisar de sugerencias similares antes de publicar una nueva.

### Modified Capabilities

Ninguna. La búsqueda existente (`busqueda`) no cambia su comportamiento; se reutiliza su criterio de coincidencia.

## Impact

- La acción `crearSugerencia` consulta sugerencias similares por título antes de insertar.
- El formulario de nueva sugerencia muestra las coincidencias cuando las hay.
- Nuevas pruebas en `test/` y `e2e/`.
- Sin cambios en el esquema ni en el diseño.

## Alcance elegido

Se compara con las alternativas (bloquear por correo, moderación manual, deduplicación automática): avisar antes de publicar es el alcance más pequeño que resuelve el problema sin quitarle el control a quien escribe.
