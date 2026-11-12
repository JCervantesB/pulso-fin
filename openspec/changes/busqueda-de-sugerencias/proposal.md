# Proposal

## Why

Con las sugerencias creciendo, la lista deja de ser cómoda de recorrer: no hay forma de encontrar una idea concreta sin leerlas todas. Hace falta una manera de buscar. Antes de decidir cómo, se exploraron dos soluciones alternativas en worktrees separados, cada una con su propia rama de base de datos en Neon, para compararlas con evidencia.

## What Changes

- Añadir la búsqueda de sugerencias por texto: un término coincide con el título o la descripción, sin distinguir mayúsculas.
- Mostrar los resultados conservando el orden de la lista (más reciente primero) y, con la búsqueda vacía, mostrar todas.
- La implementación (entrada de búsqueda y filtrado) se integra en la rama principal en el módulo 12.

## Capabilities

### New Capabilities

- `busqueda`: buscar sugerencias por texto.

### Modified Capabilities

Ninguna. La lista de sugerencias no cambia su comportamiento base; solo se le añade la búsqueda.

## Impact

- La página `/` incorporará un campo de búsqueda y filtrará por título y descripción.
- Sin cambios en el esquema de base de datos.
- Nuevas pruebas de Vitest y de Playwright cuando se integre (módulo 12).

## Decisión entre alternativas

Se compararon dos prototipos construidos en worktrees independientes (cada uno con su rama de Neon):

- **Búsqueda por texto:** un término filtra las sugerencias que lo contienen en título o descripción.
- **Filtros por categorías:** clasificar las sugerencias en categorías y filtrar por ellas.

Se eligió la **búsqueda por texto** porque resuelve la necesidad inmediata (encontrar por palabra) con menos complejidad y sin obligar a mantener una taxonomía de categorías que el producto todavía no necesita. La alternativa de filtros queda descartada y documentada en el design. La comparación completa está en `design.md`.
