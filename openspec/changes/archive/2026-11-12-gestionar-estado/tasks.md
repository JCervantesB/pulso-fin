# Tasks

## 1. Acción y componente

- [x] 1.1 Crear la acción `cambiarEstado` que exige rol de administrador y actualiza el estado. Verificación: `npx tsc --noEmit` compila.
- [x] 1.2 Crear el componente `SelectorEstado` con el desplegable que guarda al cambiar. Verificación: `npm run build` compila.

## 2. Panel funcional

- [x] 2.1 Hacer que `/admin` lea las sugerencias reales con autor y votos, y use el componente por fila. Verificación: el panel muestra las sugerencias de la base de datos.
- [x] 2.2 Verificar que un cambio de estado se refleja en la lista pública. Verificación: cambiar un estado en `/admin` y verlo en `/`.

## 3. Pruebas

- [x] 3.1 Añadir la prueba de Vitest que actualiza el estado y lo lee de vuelta. Verificación: `npm test` pasa.
- [x] 3.2 Añadir la prueba de Playwright del flujo del administrador. Verificación: `npm run test:e2e` pasa.
- [x] 3.3 Documentar el flujo de cambio de estado en `AGENTS.md`. Verificación: la documentación refleja el comportamiento implementado.

## Workflow follow-up

- Archivar el cambio con `openspec archive gestionar-estado` cuando las tareas estén completas.
