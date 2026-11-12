# Tasks

## 1. Esquema

- [x] 1.1 Añadir la tabla `votos` con índice único sobre (`sugerencia_id`, `usuario_id`) en `db/schema.ts`. Verificación: `npx tsc --noEmit` compila.
- [x] 1.2 Generar y aplicar la migración. Verificación: `npm run db:generate` crea el SQL y `npm run db:migrate` lo aplica.

## 2. Votar y retirar

- [x] 2.1 Crear la acción `alternarVoto` que valida sesión y alterna el voto, con `revalidatePath("/")`. Verificación: `npm run build` compila.
- [x] 2.2 Mostrar el contador de votos y el botón (Votar / Retirar voto, o enlace a login sin sesión) en la lista. Verificación: la lista muestra el contador y el botón.

## 3. Pruebas

- [x] 3.1 Añadir la prueba de Vitest que comprueba que un voto duplicado se rechaza en la base de datos. Verificación: `npm test` pasa.
- [x] 3.2 Añadir la prueba de Playwright de votar y retirar el voto de una sugerencia. Verificación: `npm run test:e2e` pasa.
- [x] 3.3 Documentar la tabla y el flujo de votos en `AGENTS.md`. Verificación: la documentación refleja el comportamiento implementado.

## Workflow follow-up

- Archivar el cambio con `openspec archive votaciones` cuando las tareas estén completas.
