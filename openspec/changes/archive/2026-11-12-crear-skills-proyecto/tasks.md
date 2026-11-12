# Tasks

## 1. Skill de base de datos

- [x] 1.1 Crear `.agents/skills/drizzle-neon/SKILL.md` con el flujo de Drizzle/Neon: versiones fijadas, esquema en `db/schema.ts`, convenciones de migraciones y comandos. Verificación: el archivo existe y su frontmatter declara `name: drizzle-neon` y una `description` con los disparadores.
- [x] 1.2 Revisar que la skill refleja las versiones reales de `package.json` y las convenciones de `AGENTS.md`. Verificación: las versiones citadas coinciden con las instaladas.

## 2. Skill de implementación desde mockup

- [x] 2.1 Crear `.agents/skills/implementar-desde-mockup/SKILL.md` con el procedimiento: leer la especificación, usar la plantilla como referencia, aplicar `AGENTS.md` y verificar visualmente en el navegador. Verificación: el archivo existe y su frontmatter declara `name: implementar-desde-mockup` y una `description` con los disparadores.
- [x] 2.2 Verificar que el procedimiento coincide con lo aplicado en la migración a Next.js (módulo 3). Verificación: los pasos no contradicen las páginas ya existentes ni el `AGENTS.md`.

## 3. Distribución y documentación

- [x] 3.1 Enlazar ambas skills en `.claude/skills/` para Claude Code. Verificación: `drizzle-neon` e `implementar-desde-mockup` existen en `.claude/skills/` con su `SKILL.md`.
- [x] 3.2 Documentar en `AGENTS.md` que las dos skills existen y cuándo usarlas. Verificación: la sección de skills de `AGENTS.md` las menciona y el texto se lee sin errores.

## Workflow follow-up

- Archivar el cambio con `openspec archive crear-skills-proyecto` cuando las tareas estén completas.
