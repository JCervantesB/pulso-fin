# AGENTS.md

Instrucciones para trabajar en Pulso, una plataforma para proponer ideas de producto, votarlas y seguir su estado.

## Qué es el proyecto

Una aplicación web con Next.js y TypeScript. Las páginas se construyen a partir de las plantillas de `docs/mockups/`, que son el diseño de referencia. Los datos viven en PostgreSQL (Neon) y se acceden con Drizzle ORM.

## Cómo se trabaja

- Cada funcionalidad nace de un cambio en OpenSpec. No se implementa nada que no tenga una propuesta aprobada.
- Antes de implementar, lee la propuesta del cambio y la plantilla que indique.
- Usa los comandos de OpenSpec según su documentación vigente.
- Las skills del proyecto están en `.agents/skills/`. Si una skill aplica a la tarea, cárgala y síguela.

## Skills del proyecto

Además de las skills de OpenSpec (`openspec-*`), el proyecto define dos skills propias:

- `drizzle-neon` — usar cuando la tarea toque el esquema, las migraciones o las consultas a PostgreSQL (Neon) con Drizzle.
- `implementar-desde-mockup` — usar cuando la tarea construya o ajuste una página a partir de una plantilla de `docs/mockups/`.

La versión canónica vive en `.agents/skills/` y se enlaza en `.claude/skills/` para Claude Code. Si editas una skill, hazlo en `.agents/skills/` y vuelve a copiarla.

## Modelo de datos

- `users` — cuentas con nombre, correo único, contraseña cifrada y rol.
- `sugerencias` — ideas propuestas con título, descripción, autor (FK a `users`), estado y fecha. El estado es `pendiente`, `en_desarrollo` o `completada`, con `pendiente` por defecto.
- `votos` — un voto por usuario y sugerencia, con índice único sobre (`sugerencia_id`, `usuario_id`) que impide votos duplicados.

La lista pública de sugerencias se lee en `/` con un join a `users` para mostrar el nombre del autor, ordenada de la más reciente a la más antigua, y con el contador de votos de cada sugerencia. Votar y retirar el voto se hace con la acción `alternarVoto`, que exige sesión.

El panel `/admin` (solo rol `administrador`) lista las sugerencias con su autor y votos, y permite cambiar el estado con la acción `cambiarEstado`. El estado se refleja en la lista pública.

## Diseño

- Las plantillas de `docs/mockups/` son la referencia visual. El resultado debe parecerse a la plantilla, no solo funcionar.
- Usa Tailwind CSS para todos los estilos. No escribas CSS a mano salvo que la propuesta lo pida explícitamente.
- No cambies colores, tipografías ni espaciados que no estén en la plantilla o en la propuesta.

## Stack

- Next.js con App Router y TypeScript en modo estricto.
- PostgreSQL gestionado en Neon.
- Drizzle ORM con las versiones fijadas en `package.json`. No cambies una versión sin un cambio en OpenSpec.
- No uses Prisma.
- Pruebas unitarias y de integración con Vitest. Pruebas de navegador con Playwright.
- Autenticación propia: contraseñas con `crypto.scrypt` y sesión firmada con `jose`.

## Convenciones

- Usa `any` solo si no hay otra opción, y deja un comentario que lo explique.
- La cadena de conexión a la base de datos va en `.env`, nunca en el código ni en el repositorio.
- El secreto de sesión va en `SESSION_SECRET`, en `.env`, nunca en el código ni en el repositorio.
- Las migraciones aplicadas no se modifican. Un cambio de esquema es una migración nueva.
- Las rutas que escriben datos comprueban la sesión en el servidor, no solo ocultando botones.

## Comandos

- `npm run db:generate` — genera una migración nueva a partir del esquema en `db/schema.ts`.
- `npm run db:migrate` — aplica las migraciones pendientes a la base de datos de Neon.
- `npm test` — ejecuta las pruebas unitarias y de integración con Vitest.
- `npm run test:e2e` — ejecuta las pruebas de navegador con Playwright (arranca y compila la app; requiere `npx playwright install chromium` la primera vez).
- `npm run lint` — ejecuta ESLint.
- `npm run build` — compila el proyecto y valida los tipos.
