# Proposal

## Why

El agente de código necesita procedimientos escritos para dos tareas que se repiten en todo el curso: tocar la base de datos (Drizzle + Neon) e implementar una página desde una plantilla HTML. Sin esos procedimientos, cada alumno improvisa de forma distinta y los resultados dejan de ser comparables. Las skills convierten esas instrucciones en algo que el agente carga cuando lo necesita.

## What Changes

- Crear la skill `drizzle-neon` con el flujo de trabajo sobre la base de datos: versiones fijadas del proyecto, dónde vive el esquema, cómo se generan y aplican migraciones, y las convenciones que no se pueden saltar.
- Crear la skill `implementar-desde-mockup` con el procedimiento para convertir una plantilla HTML en una página: leer la especificación, usar la plantilla como referencia, aplicar las convenciones de `AGENTS.md` y verificar visualmente.
- Publicar ambas skills en `.agents/skills/` (ubicación canónica) y enlazarlas en `.claude/skills/` para Claude Code.
- Documentar en `AGENTS.md` que estas dos skills existen y cuándo se usan.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

Ninguna. Las skills son instrucciones para el agente, no comportamiento del producto, y no cambian nada que el usuario vea. Por eso el cambio declara `skip_specs: true`. La corrección de cada skill se comprueba en las tareas.

## Impact

- Nuevas carpetas `.agents/skills/drizzle-neon/` y `.agents/skills/implementar-desde-mockup/`, cada una con su `SKILL.md`.
- Enlaces en `.claude/skills/` para que Claude Code cargue las mismas skills.
- Actualización de la sección de skills en `AGENTS.md`.
- Sin cambios de código, de base de datos ni de interfaz.
