# AGENTS.md

Instrucciones para trabajar en Pulso, una plataforma para proponer ideas de producto, votarlas y seguir su estado.

## Qué es el proyecto

Una aplicación web con Next.js y TypeScript. Las páginas se construyen a partir de las plantillas de `docs/mockups/`, que son el diseño de referencia. Los datos viven en PostgreSQL (Neon) y se acceden con Drizzle ORM.

## Cómo se trabaja

- Cada funcionalidad nace de un cambio en OpenSpec. No se implementa nada que no tenga una propuesta aprobada.
- Antes de implementar, lee la propuesta del cambio y la plantilla que indique.
- Usa los comandos de OpenSpec según su documentación vigente.
- Las skills del proyecto están en `.agents/skills/`. Si una skill aplica a la tarea, cárgala y síguela.

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

## Convenciones

- Usa `any` solo si no hay otra opción, y deja un comentario que lo explique.
- La cadena de conexión a la base de datos va en `.env`, nunca en el código ni en el repositorio.
- Las migraciones aplicadas no se modifican. Un cambio de esquema es una migración nueva.
- Las rutas que escriben datos comprueban la sesión en el servidor, no solo ocultando botones.

## Comandos

Los comandos de verificación se añaden a medida que el proyecto los necesita, y se documentan aquí cuando existen.
