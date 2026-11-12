# Proposal

## Why

Pulso ya tiene usuarios y sesión, pero todavía no guarda nada de lo que es su razón de ser: las sugerencias. Este cambio construye la primera funcionalidad real del producto: enviar una idea y ver la lista pública de ideas propuestas.

## What Changes

- Añadir la tabla `sugerencias` con título, descripción, autor, estado y fecha de creación.
- Permitir enviar una sugerencia con sesión iniciada, validando que el título y la descripción no estén vacíos.
- Guardar cada sugerencia ligada al usuario que la envía.
- Mostrar la lista pública de sugerencias, visible para cualquier visitante, ordenada de la más reciente a la más antigua.
- Mostrar un mensaje de lista vacía cuando no hay sugerencias.
- Añadir pruebas con Vitest de la validación y del guardado.

## Capabilities

### New Capabilities

- `sugerencias`: envío y lectura pública de sugerencias.

### Modified Capabilities

Ninguna. La tabla `users` (capacidad `base-de-datos`) se usa como autor sin modificar sus requisitos.

## Impact

- Nueva tabla `sugerencias` en `db/schema.ts` con una migración nueva.
- Nueva server action para crear una sugerencia.
- La página `/sugerencias/nueva` pasa a enviar el formulario y mostrar errores de validación.
- La página `/` pasa a leer las sugerencias de la base de datos en lugar de datos fijos.
- Nuevas pruebas en `test/`.
- Sin cambios en el diseño: se conservan las clases y textos de las plantillas.

## Nota sobre alcance

Las votaciones (módulo 9) y el cambio de estado por administración (módulo 11) no forman parte de este cambio. La lista muestra un contador de votos en cero y el estado por defecto, para respetar la estructura de la plantilla sin adelantar esas funcionalidades.
