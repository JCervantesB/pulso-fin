# Tasks

## 1. Detección

- [x] 1.1 Extender `crearSugerencia` para buscar títulos parecidos con `ilike` y devolver las coincidencias sin crear el duplicado. Verificación: `npx tsc --noEmit` compila.
- [x] 1.2 Mostrar las coincidencias en el formulario de nueva sugerencia. Verificación: `npm run build` compila.

## 2. Pruebas

- [x] 2.1 Añadir la prueba de Vitest de la detección de títulos parecidos. Verificación: `npm test` pasa.
- [x] 2.2 Añadir la prueba de Playwright del aviso y de la creación sin duplicados. Verificación: `npm run test:e2e` pasa.
- [x] 2.3 Documentar la detección de duplicados en `AGENTS.md`. Verificación: la documentación refleja el comportamiento implementado.

## Workflow follow-up

- Archivar el cambio con `openspec archive detectar-duplicados` cuando las tareas estén completas.
