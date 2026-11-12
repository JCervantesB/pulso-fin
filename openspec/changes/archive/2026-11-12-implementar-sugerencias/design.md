# Design

## Context

La tabla `users` existe con `id`, `nombre` y `role`. Las plantillas de `docs/mockups/` muestran una tarjeta de sugerencia con contador de votos, estado, título, descripción y autor con fecha, y un estado vacío. La página `/sugerencias/nueva` es un formulario protegido por sesión.

## Goals / Non-Goals

**Goals:**

- Guardar sugerencias con título, descripción, autor y fecha.
- Lista pública ordenada de la más reciente a la más antigua.
- Validación de campos en el servidor.

**Non-Goals:**

- Votaciones (módulo 9) y cambio de estado por administración (módulo 11). El estado se guarda con el valor por defecto `pendiente` y el contador de votos se muestra en cero, sin lógica todavía.

## Decisions

- **Tabla `sugerencias`:** `id` (serial), `titulo` (text, no nulo), `descripcion` (text, no nulo), `autor_id` (FK a `users.id`), `estado` (enum `estado`, por defecto `pendiente`) y `created_at` (con zona horaria, por defecto ahora). El enum de estado se crea ahora para no volver a migrar en el módulo 11.
- **Autor por clave foránea:** `autor_id` referencia `users.id`; la lista hace un join para mostrar el nombre.
- **Server action `crearSugerencia`:** revalida la sesión en el servidor (no confía en que la página esté protegida), valida título y descripción, inserta y redirige a `/`.
- **Lista en `/`:** componente de servidor que lee las sugerencias con el autor y las ordena por `created_at` descendente. El formulario de `/sugerencias/nueva` usa `useActionState`.
- **Título con máximo 120 caracteres:** coincide con `maxLength` de la plantilla; se valida en el servidor.

## Risks / Trade-offs

- [La lista no paginaba y crecerá] → por ahora es aceptable para el curso; la paginación no es parte del alcance.
- [El contador de votos y el estado están fijos] → se completan en los módulos 9 y 11; la tarjeta conserva la estructura de la plantilla.

## Migration Plan

1. Añadir el enum `estado` y la tabla `sugerencias` a `db/schema.ts`.
2. Generar y aplicar la migración (`npm run db:generate` y `npm run db:migrate`).
3. Crear la server action `crearSugerencia`.
4. Convertir `/sugerencias/nueva` en formulario funcional.
5. Hacer que `/` lea las sugerencias.
6. Añadir las pruebas de Vitest.
