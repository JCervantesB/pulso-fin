# Design

## Context

La lista pública (`/`) ya lee las sugerencias con su autor, contador de votos y votos del usuario actual, ordenadas de la más reciente a la más antigua. El problema a resolver es encontrar una sugerencia concreta en una lista que crece.

## Alternativas exploradas

Se construyeron dos prototipos en worktrees independientes, cada uno con su propia rama de base de datos en Neon, para compararlos con evidencia y no con opiniones.

### A. Búsqueda por texto

Un campo de búsqueda filtra las sugerencias cuyo título o descripción contienen el término (sin distinguir mayúsculas).

- Utilidad: resuelve directamente "encuentra la idea sobre X".
- Complejidad: baja; una cláusula de filtrado en la consulta.
- Mantenimiento: nulo, no requiere datos nuevos.

### B. Filtros por categorías

Clasificar cada sugerencia en una categoría y filtrar por ella.

- Utilidad: agrupa, pero no ayuda a encontrar por palabra.
- Complejidad: media; requiere una taxonomía, una columna o tabla nueva y migración.
- Mantenimiento: alto; hay que definir y mantener las categorías, y decidir quién las asigna.

## Decisión

Se elige la **búsqueda por texto** (A). Resuelve la necesidad inmediata con menos complejidad y sin cargar al producto con una taxonomía que todavía no pide. La alternativa de filtros queda descartada; si en el futuro aparece la necesidad de categorizar, se podrá retomar como un cambio nuevo.

## Enfoque de implementación (se integra en el módulo 12)

- Un campo de búsqueda en la lista que envía el término como parámetro de consulta (`?q=`).
- La página filtra con una condición de "contiene" sobre título y descripción, sin distinguir mayúsculas.
- La búsqueda vacía equivale a no filtrar.
- El orden se mantiene: más reciente primero.

## Riesgos / Trade-offs

- [La búsqueda es por "contiene" y no por relevancia] → suficiente para el curso; la relevancia es una mejora posterior si el producto la pide.
- [No hay paginación] → ya era una limitación conocida; se revisará cuando la lista lo exija.

## Migration Plan

1. (Módulo 10, hecho) Construir y comparar los dos prototipos en worktrees con ramas de Neon separadas.
2. (Módulo 12) Integrar la búsqueda por texto en `main`: campo de búsqueda, filtrado y pruebas.
3. Archivar el cambio una vez integrado.
