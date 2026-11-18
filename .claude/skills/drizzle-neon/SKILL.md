---
name: drizzle-neon
description: Trabajar con la base de datos de Pulso (PostgreSQL en Neon con Drizzle ORM). Usa esta skill cuando la tarea toque el esquema, genere o aplique migraciones, consulte datos o cambie cualquier versión de Drizzle o del driver de Neon. También cuando el usuario pida crear una migración, aplicar migraciones, añadir una tabla o cambiar el esquema.
---

Procedimiento para tocar la base de datos. Síguelo siempre que la tarea afecte al esquema o a las migraciones.

## Versiones fijadas

- drizzle-orm 0.45.4, drizzle-kit 0.31.11, @neondatabase/serverless 1.2.0.
- No cambies una versión sin un cambio en OpenSpec.
- El driver es `drizzle-orm/neon-http`.

## Dónde vive

- `db/schema.ts`: el esquema.
- `db/index.ts`: el cliente, que lee `DATABASE_URL` desde `.env`.

## Migraciones

1. Edita `db/schema.ts`.
2. Ejecuta `npm run db:generate`.
3. Revisa el SQL generado en `drizzle/`.
4. Ejecuta `npm run db:migrate`.

## Prohibido

- Editar una migración ya aplicada: un cambio de esquema es una migración nueva.
- Usar `drizzle-kit push` contra la base de datos real.
- Escribir la cadena de conexión en el código o en archivos versionados.

## Verificación

- `npm run db:generate` y `npm run db:migrate` terminan sin error.
- `npm test` pasa.
- `npm run build` compila sin errores de tipos.
