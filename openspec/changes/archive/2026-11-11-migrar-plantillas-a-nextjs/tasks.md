## 1. Aplicación base

- [x] 1.1 Generar la base Next.js con App Router, TypeScript, ESLint y Tailwind CSS 4, con versiones exactas en `package.json`. Verificación: `npm run build` termina sin errores.
- [x] 1.2 Quitar las fuentes de Geist y el modo oscuro de la base, para usar la tipografía de las plantillas. Verificación: `app/layout.tsx` y `app/globals.css` no cargan fuentes externas ni definen colores de modo oscuro.

## 2. Páginas

- [x] 2.1 Convertir cada plantilla de `docs/mockups/` en su página: `/`, `/login`, `/registro`, `/sugerencias/nueva` y `/admin`. Verificación: las cinco rutas responden en `npm run start`.
- [x] 2.2 Usar `<Link>` para los enlaces internos, con las mismas clases. Verificación: `npm run lint` pasa sin errores.

## 3. Verificación frente a las plantillas

- [x] 3.1 Comparar el HTML renderizado de cada página con su plantilla: clases de Tailwind y texto visible. Verificación: las cinco páginas coinciden en clases y texto.
- [x] 3.2 Revisar cada página en el navegador frente a su plantilla. Verificación: revisión manual, sin diferencias de maquetación.

## Workflow follow-up

- Archivar el cambio con `openspec archive migrar-plantillas-a-nextjs` cuando la tarea 3.2 esté completa.
