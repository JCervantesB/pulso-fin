## Contexto

Las plantillas de `docs/mockups/` son HTML estático con Tailwind CSS cargado desde un CDN. La migración las convierte en una aplicación Next.js con Tailwind CSS instalado como dependencia. No cambia el comportamiento ni el aspecto visible: el resultado debe verse igual que la plantilla.

## Decisiones

- **Base del proyecto:** se genera con `create-next-app`, que deja Next.js con App Router, TypeScript en modo estricto y ESLint.
- **Tailwind CSS 4:** se integra como plugin de Turbopack en `next.config.ts`, la configuración que genera `create-next-app` por defecto, en lugar de un archivo de PostCSS. `app/globals.css` solo contiene `@import "tailwindcss";`.
- **Tipografía y modo oscuro:** se quitan las fuentes de Geist y el modo oscuro que trae la base, para usar la tipografía del sistema y los colores de las plantillas.
- **Navegación:** los enlaces internos usan `<Link>` de Next.js, conservando las clases de Tailwind de las plantillas.
- **Versiones:** se fijan versiones exactas en `package.json`. TypeScript 7 y ESLint 10 no son compatibles con `eslint-config-next` 16.4.6, por lo que se usan TypeScript 5.9.3 y ESLint 9.39.5.
- **Referencia visual:** las plantillas de `docs/mockups/` se conservan como fuente de comparación; cada página se comprueba contra su plantilla (clases y texto visible).

## Alternativas consideradas

- **PostCSS (`@tailwindcss/postcss`):** es la guía genérica de Tailwind. Se descartó a favor del plugin de Turbopack que genera `create-next-app`, equivalente en resultado y con una pieza menos que configurar.

## Riesgos

- Ninguno para el comportamiento: la migración no introduce lógica ni datos, solo estructura y estilos.
