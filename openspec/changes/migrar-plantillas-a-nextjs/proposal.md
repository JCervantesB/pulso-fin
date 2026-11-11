## Why

Las plantillas de `docs/mockups/` son HTML estático con Tailwind cargado desde un CDN. Para construir Pulso necesitamos una aplicación Next.js con Tailwind instalado como dependencia. Esta migración es el primer cambio grande del proyecto y establece la estructura sobre la que se construyen los siguientes cambios.

## What Changes

- Crear la aplicación Next.js con App Router, TypeScript, ESLint y Tailwind CSS 4, con versiones estables y fijadas en `package.json`.
- Convertir cada plantilla de `docs/mockups/` en una página de la aplicación:
  - `sugerencias.html` → `/`
  - `login.html` → `/login`
  - `registro.html` → `/registro`
  - `nueva-sugerencia.html` → `/sugerencias/nueva`
  - `panel-admin.html` → `/admin`
- Mantener textos, estructura de clases y diseño de cada plantilla.
- Eliminar la carga de Tailwind por CDN de las páginas convertidas.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

Ninguna. La migración no cambia el comportamiento visible ni los requisitos de la aplicación: las páginas se ven y se comportan igual que las plantillas. Por eso el cambio declara `skip_specs: true`. La comparación con la plantilla se verifica en las tareas.

## Impact

- Nuevos archivos de configuración del proyecto: `package.json`, `tsconfig.json`, `postcss.config.mjs`, `next.config.ts` y `eslint.config.mjs`.
- Nuevas carpetas `app/` y `public/`.
- Las plantillas de `docs/mockups/` se conservan como referencia.
- Sin base de datos, sin autenticación y sin formularios que envíen datos: esos llegan en módulos posteriores.
