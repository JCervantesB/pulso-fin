# Design

## Context

La acción `crearSugerencia` ya valida título y descripción y guarda la sugerencia. La búsqueda (`busqueda`) ya filtra por título con `ilike`, sin distinguir mayúsculas. La página de nueva sugerencia es un formulario con `useActionState`.

## Goals / Non-Goals

**Goals:**

- Avisar de títulos parecidos antes de publicar.
- No crear el duplicado cuando hay coincidencia.

**Non-Goals:**

- No hay deduplicación automática ni fusión de sugerencias.
- No se compara por descripción (solo por título, el criterio más claro).

## Decisions

- **Coincidencia por título con `ilike`:** reutiliza el mismo criterio de la búsqueda. Se busca `titulo ILIKE '%<nuevo>%'`, de modo que un título nuevo que es parte de uno existente (o igual) dispara el aviso.
- **Avisar y no crear:** la acción devuelve las coincidencias en el estado del formulario y no inserta. La persona revisa y ajusta el título.
- **El formulario muestra las coincidencias** en un bloque de aviso, con sus títulos.
- **Exploración en worktree:** la funcionalidad se desarrolló en un worktree con su rama de base de datos en Neon y se integró aquí, revisando los cambios con `git diff` antes del merge.

## Risks / Trade-offs

- [Un título corto y genérico puede coincidir con muchos] → aceptable; el aviso es una ayuda, no un bloqueo definitivo, y la persona puede ajustar el título.
- [El criterio es solo por título] → suficiente para el curso; la comparación semántica queda fuera de alcance.

## Migration Plan

1. Extender `crearSugerencia` para buscar títulos parecidos y devolverlos.
2. Mostrar las coincidencias en el formulario.
3. Añadir las pruebas.
