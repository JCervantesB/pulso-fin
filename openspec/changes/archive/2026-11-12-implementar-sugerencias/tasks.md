# Tasks

## 1. Esquema

- [x] 1.1 Añadir el enum `estado` (`pendiente`, `en_desarrollo`, `completada`) y la tabla `sugerencias` a `db/schema.ts`, con `autor_id` como clave foránea a `users.id`. Verificación: `npx tsc --noEmit` compila.
- [x] 1.2 Generar y aplicar la migración. Verificación: `npm run db:generate` crea el SQL y `npm run db:migrate` lo aplica sin error.

## 2. Guardado de sugerencias

- [x] 2.1 Crear la server action `crearSugerencia` que valida sesión, título y descripción, inserta la sugerencia ligada al autor y redirige a `/`. Verificación: `npm run build` compila.
- [x] 2.2 Convertir `/sugerencias/nueva` en formulario funcional con `useActionState` y mensaje de error. Verificación: al enviar campos vacíos se muestra el error.

## 3. Lista pública

- [x] 3.1 Hacer que `/` lea las sugerencias de la base de datos con el nombre del autor, ordenadas de la más reciente a la más antigua. Verificación: la página renderiza las sugerencias registradas.
- [x] 3.2 Mostrar el mensaje de lista vacía cuando no hay sugerencias. Verificación: con la tabla vacía se ve "Todavía no hay sugerencias".

## 4. Pruebas

- [x] 4.1 Añadir pruebas de Vitest de la validación y del guardado de sugerencias. Verificación: `npm test` pasa todas las pruebas.
- [x] 4.2 Documentar en `AGENTS.md` la tabla y el flujo de sugerencias. Verificación: la documentación refleja el comportamiento implementado.

## Workflow follow-up

- Archivar el cambio con `openspec archive implementar-sugerencias` cuando las tareas estén completas.
