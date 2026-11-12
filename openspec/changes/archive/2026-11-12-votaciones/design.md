# Design

## Context

La tabla `sugerencias` y `users` ya existen. La lista pública (`/`) es un componente de servidor dinámico que lee las sugerencias con un join a `users`. La plantilla muestra una caja de votos por tarjeta y un botón "Votar".

## Goals / Non-Goals

**Goals:**

- Voto único por usuario y sugerencia, garantizado en la base de datos.
- Alternar voto (votar / retirar) con una sola acción.
- Contador visible y actualizado en la lista.

**Non-Goals:**

- No hay ranking ni ordenación por votos (llega más adelante si el producto lo pide).
- No hay recuento en tiempo real; el contador se actualiza al re-renderizar tras votar.

## Decisions

- **Tabla `votos`:** `id`, `sugerencia_id` (FK a `sugerencias`), `usuario_id` (FK a `users`), `created_at`, con un índice único sobre (`sugerencia_id`, `usuario_id`). El índice único es la garantía de voto único a nivel de base de datos.
- **Acción `alternarVoto`:** revalida la sesión, comprueba si la persona ya votó, y alterna (borra si ya votó, inserta si no). El insert usa `onConflictDoNothing` para no fallar en carrera, aunque el índice único ya lo impide.
- **Contador con consulta agregada:** la lista hace una consulta de `count()` agrupada por `sugerencia_id` y otra de los votos del usuario actual, y las combina en memoria. Sencillo y suficiente para el tamaño del curso.
- **Botón según sesión:** con sesión, un formulario con la acción y la etiqueta "Votar" o "Retirar voto"; sin sesión, un enlace a `/login` con el mismo estilo.
- **`revalidatePath("/")`** tras votar para que la lista muestre el contador actualizado.

## Risks / Trade-offs

- [El contador se calcula con una consulta extra por render] → aceptable para el curso; si la lista crece, se paginará y se revisará.
- [La acción de alternar no es transaccional] → el índice único garantiza la invariante de voto único en la base de datos.

## Migration Plan

1. Añadir la tabla `votos` con el índice único.
2. Generar y aplicar la migración.
3. Crear la acción `alternarVoto`.
4. Actualizar `/` para contar y mostrar votos, y el botón.
5. Añadir las pruebas de Vitest y de Playwright.
