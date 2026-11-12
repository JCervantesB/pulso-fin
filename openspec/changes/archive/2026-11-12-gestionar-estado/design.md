# Design

## Context

El enum `estado` y la columna ya existen en `sugerencias` (módulo 4/7), con `pendiente` por defecto. La lista pública ya muestra la insignia de estado. La ruta `/admin` ya existe y está protegida (módulo 6) pero es una tabla estática. El rol `administrador` ya existe en `users`.

## Goals / Non-Goals

**Goals:**

- Que un administrador cambie el estado desde `/admin`.
- Que el cambio se refleje en la lista pública.

**Non-Goals:**

- No hay flujo para crear administradores desde la interfaz (se hace a nivel de base de datos).
- No se cambia el esquema.

## Decisions

- **Acción `cambiarEstado`:** recibe el id de la sugerencia y el nuevo estado, revalida que la sesión tenga rol `administrador`, valida que el estado sea uno de los tres valores, actualiza y revalida `/` y `/admin`.
- **Desplegable por fila como componente cliente (`SelectorEstado`):** un `<select>` con los tres estados que, al cambiar, llama a la acción. Así el cambio se guarda en el momento, sin botón extra, fiel al mockup.
- **`/admin` lee datos reales:** sugerencias con su autor y contador de votos, ordenadas de la más reciente a la más antigua, igual que la lista pública.
- **Sin cambios de esquema:** se usa la columna `estado` existente.

## Risks / Trade-offs

- [El desplegable guarda en cada cambio] → aceptable para el curso; si fuera un problema, se añadiría un botón de guardado explícito.
- [El estado se guarda sin confirmación] → es un cambio reversible (se puede volver a cambiar).

## Migration Plan

1. Crear la acción `cambiarEstado`.
2. Crear el componente `SelectorEstado`.
3. Hacer que `/admin` lea datos reales y use el componente.
4. Añadir las pruebas.
