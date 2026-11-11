# Proposal

## Why

Pulso todavía no tiene base de datos: las páginas del módulo 3 son estáticas y no guardan nada. Para poder registrar usuarios, sugerencias y votos, la aplicación necesita conectarse a PostgreSQL y tener un primer esquema sobre el que construir los siguientes módulos.

## What Changes

- Añadir la conexión de la aplicación a PostgreSQL en Neon mediante Drizzle ORM, con la cadena de conexión en un archivo de entorno que no se versiona.
- Definir el primer esquema de base de datos: la tabla de usuarios, con un rol que distingue usuarios normales de administradores.
- Generar migraciones con Drizzle Kit y aplicarlas a la base de datos.
- Añadir pruebas de integración que comprueban la conexión y el esquema con Vitest.
- Fijar las versiones de Drizzle, el driver de Neon y Vitest en `package.json`.

## Capabilities

### New Capabilities

- `base-de-datos`: persistencia de la aplicación en PostgreSQL mediante migraciones, incluida la tabla de usuarios y su rol.

### Modified Capabilities

Ninguna. No hay especificaciones previas: esta es la primera capacidad con comportamiento de persistencia.

## Impact

- Nuevas dependencias: `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless` y `dotenv`; `vitest` como dependencia de desarrollo.
- Nuevos archivos de configuración: `drizzle.config.ts` y `vitest.config.ts`.
- Nueva carpeta `db/` con el esquema y el cliente de base de datos, y nueva carpeta `drizzle/` con las migraciones generadas.
- Nuevas entradas en `package.json`: scripts de migración (`db:generate`, `db:migrate`) y de pruebas (`test`).
- La cadena de conexión se lee de `DATABASE_URL` en `.env`, que no se versiona; `.env.example` documenta la variable.
- Sin cambios en la interfaz: este módulo no altera ninguna página.
