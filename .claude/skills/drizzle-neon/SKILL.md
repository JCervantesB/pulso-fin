---
name: drizzle-neon
description: Trabajar con la base de datos de Pulso (PostgreSQL en Neon con Drizzle ORM). Usa esta skill cuando la tarea toque el esquema, genere o aplique migraciones, consulte datos o cambie cualquier versión de Drizzle o del driver de Neon. También cuando el usuario pida "crear una migración", "aplicar migraciones", "añadir una tabla" o "cambiar el esquema".
---

Procedimiento para tocar la base de datos de Pulso. Síguelo siempre que la tarea afecte al esquema o a las migraciones.

## Versiones fijadas

El proyecto fija versiones exactas en `package.json`. No cambies una versión sin un cambio en OpenSpec.

- `drizzle-orm@0.45.4`
- `drizzle-kit@0.31.11`
- `@neondatabase/serverless@1.2.0`

El driver es `drizzle-orm/neon-http` (HTTP de Neon), adecuado para el entorno serverless de Next.js.

## Dónde vive el esquema

- `db/schema.ts` — definición del esquema (tablas, enums, columnas).
- `db/index.ts` — cliente `db` que lee `DATABASE_URL` desde `.env`.

La cadena de conexión va en `.env` (no versionado), nunca en el código ni en el repositorio. `.env.example` documenta la variable.

## Migraciones

El proyecto usa el flujo "código primero" con archivos SQL versionados:

1. Edita `db/schema.ts` con el cambio de esquema.
2. Genera la migración: `npm run db:generate`.
3. Revisa el SQL generado en `drizzle/` antes de aplicarlo.
4. Aplica la migración: `npm run db:migrate`.

Convenciones:

- Las migraciones ya aplicadas no se modifican. Un cambio de esquema es una migración nueva.
- No uses `drizzle-kit push` para cambiar el esquema de la base de datos real.
- Si `db:generate` te pide confirmar un `rename`, responde con lo que realmente cambió en el esquema, sin inventar.

## Consultas

Importa el cliente desde `db/index`:

```ts
import { db } from "@/db";
import { users } from "@/db/schema";
```

Usa el builder de Drizzle (`db.select()`, `db.insert()`, `db.update()`, `db.delete()`). Para SQL crudo usa `sql` de `drizzle-orm`.

## Verificación

- `npm run db:generate` y `npm run db:migrate` terminan sin error.
- `npm test` pasa las pruebas de integración (necesitan `DATABASE_URL` apuntando a una base accesible).
- `npm run build` compila sin errores de tipos.
