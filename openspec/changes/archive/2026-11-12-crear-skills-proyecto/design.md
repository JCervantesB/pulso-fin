# Design

## Context

El proyecto ya usa OpenSpec, que genera sus propias skills en `.agents/skills/` (con los prefijos `openspec-*`) y las copia a `.claude/skills/`, `.cursor/skills/` y `.opencode/skills/`. Las skills del proyecto deben convivir con las de OpenSpec sin pisarlas.

## Decisions

- **Formato de skill:** una carpeta con un `SKILL.md` que empieza con frontmatter YAML (`name` y `description`), el mismo formato que usan las skills de OpenSpec. El `description` incluye los disparadores para que el agente sepa cuándo cargarla.
- **Ubicación canónica:** `.agents/skills/`, según la convención del proyecto. En Claude Code se enlazan desde `.claude/skills/`.
- **Contenido basado en lo ya implementado:** la skill de Drizzle/Neon documenta las versiones fijadas en `package.json`, el esquema en `db/schema.ts` y el flujo `db:generate` → `db:migrate`, no un procedimiento genérico.
- **Skill de mockup alineada con el módulo 3:** el procedimiento refleja lo que se hizo al migrar las plantillas a Next.js, incluyendo la verificación visual en el navegador (Playwright llega más adelante en el curso).
- **Sin enlaces simbólicos:** se usan copias, igual que OpenSpec distribuye sus propias skills, para evitar depender de permisos de enlaces en Windows.

## Risks / Trade-offs

- [Las copias pueden divergir de la versión canónica] → se edita siempre la skill en `.agents/skills/` y se vuelve a copiar; la skill lo documenta.
- [El agente puede no cargar la skill si el `description` no es claro] → cada `description` nombra explícitamente la tarea y las palabras clave que la disparan.
