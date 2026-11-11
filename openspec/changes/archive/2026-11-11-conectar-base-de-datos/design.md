# Design

## Context

El proyecto ya es una aplicación Next.js con App Router y TypeScript en modo estricto, sin base de datos. Las versiones de `package.json` están fijadas a valores exactos. La base de datos es PostgreSQL gestionada en Neon, y la cadena de conexión ya está en `.env`, que no se versiona.

## Goals / Non-Goals

**Goals:**

- Conectar la aplicación a Neon con el menor número de piezas y versiones fijadas.
- Tener un esquema versionado mediante migraciones, no mediante `push` directo.
- Poder comprobar la conexión y el esquema con pruebas automatizadas.

**Non-Goals:**

- No se construye todavía la autenticación ni ninguna ruta que use la base de datos: eso llega en módulos posteriores.
- No se usa Prisma (queda explícitamente fuera en `AGENTS.md`).

## Decisions

- **Driver de Neon con HTTP (`@neondatabase/serverless` + `drizzle-orm/neon-http`):** funciona en entornos serverless y es la opción que documenta Drizzle para Neon. Alternativa considerada: `node-postgres` (`pg`), descartada porque no es la vía recomendada para Neon y añade dependencias de TCP.
- **Migraciones con `generate` + `migrate` (código primero):** el esquema vive en `db/schema.ts` y se generan archivos SQL versionados con `drizzle-kit generate`, que luego se aplican con `drizzle-kit migrate`. Alternativa considerada: `drizzle-kit push`, descartada porque no deja archivos de migración revisables en el repositorio.
- **Rol como tipo enum de PostgreSQL (`usuario`, `administrador`):** se define desde el primer esquema porque el módulo de autenticación lo necesita. El valor por defecto es `usuario`.
- **Versiones fijadas:** `drizzle-orm@0.45.4`, `drizzle-kit@0.31.11`, `@neondatabase/serverless@1.2.0`, `vitest@5.1.0` y `dotenv` en la última estable. Se evita `@rc`, que los tutoriales usan para la rama 1.0 en beta.
- **`drizzle.config.ts` lee `DATABASE_URL` de `.env`:** se carga con `dotenv` dentro del propio archivo de configuración, de modo que `drizzle-kit` no necesita una configuración duplicada de credenciales.
- **Pruebas de integración con Vitest:** comprueban la conexión (`select 1`), la existencia de la tabla de usuarios y la restricción de unicidad del correo y del rol.

## Risks / Trade-offs

- [El driver `neon-http` no soporta transacciones interactivas] → en este módulo solo se hacen consultas y migraciones; cuando una funcionalidad lo requiera, se evalúa el driver con WebSockets.
- [Las migraciones se aplican contra la base de datos real de Neon] → las pruebas de integración dependen de `DATABASE_URL`; se documenta que requieren una base de datos accesible.
- [Cambiar una versión de Drizzle puede romper el esquema] → las versiones quedan fijadas y cualquier cambio es un cambio de OpenSpec.

## Migration Plan

1. Instalar las dependencias con versiones exactas.
2. Crear `db/schema.ts` con la tabla `users` y su enum de rol.
3. Crear `drizzle.config.ts` y generar la primera migración con `drizzle-kit generate`.
4. Aplicar la migración con `drizzle-kit migrate`.
5. Añadir las pruebas de integración y el script `test`.

Rollback: como el esquema se gestiona con migraciones versionadas, un cambio de esquema posterior se revierte con una migración nueva, no editando la migración ya aplicada (convención de `AGENTS.md`).
