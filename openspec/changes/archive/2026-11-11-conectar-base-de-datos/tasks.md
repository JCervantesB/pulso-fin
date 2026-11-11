# Tasks

## 1. Dependencias y configuración

- [x] 1.1 Instalar `drizzle-orm@0.45.4`, `drizzle-kit@0.31.11`, `@neondatabase/serverless@1.2.0` y `dotenv`, y `vitest@5.1.0` como dependencia de desarrollo, con versiones exactas. Verificación: `npm ls drizzle-orm drizzle-kit @neondatabase/serverless vitest` muestra las versiones exactas.
- [x] 1.2 Añadir los scripts `db:generate`, `db:migrate` y `test` a `package.json`. Verificación: `npm run` lista los tres scripts.
- [x] 1.3 Crear `drizzle.config.ts` con `dialect: "postgresql"`, el esquema de `db/schema.ts`, salida a `drizzle/` y `DATABASE_URL` cargada desde `.env`. Verificación: `npx drizzle-kit generate` no falla por configuración.

## 2. Esquema y conexión

- [x] 2.1 Crear `db/schema.ts` con la tabla `users` (id, nombre, correo único, contraseña cifrada, rol enum `usuario`/`administrador` con valor por defecto `usuario`, y fecha de creación) y el cliente `db` con `drizzle-orm/neon-http`. Verificación: `npm run build` compila sin errores de tipos.
- [x] 2.2 Generar la primera migración con `drizzle-kit generate`. Verificación: aparece una carpeta nueva en `drizzle/` con el SQL de creación de la tabla.
- [x] 2.3 Aplicar la migración con `drizzle-kit migrate`. Verificación: el comando termina sin error y registra la migración aplicada.

## 3. Pruebas de integración

- [x] 3.1 Crear `vitest.config.mts` y una prueba que comprueba la conexión (`select 1`). Verificación: `npm test` pasa la prueba de conexión.
- [x] 3.2 Añadir pruebas que comprueban la tabla de usuarios: el rol por defecto es `usuario`, un correo repetido se rechaza y un rol inválido se rechaza. Verificación: `npm test` pasa todas las pruebas.
- [x] 3.3 Documentar los comandos de verificación (`db:generate`, `db:migrate`, `test`) en `AGENTS.md`. Verificación: los comandos documentados se ejecutan como están escritos.

## Workflow follow-up

- Archivar el cambio con `openspec archive conectar-base-de-datos` una vez completadas todas las tareas.
