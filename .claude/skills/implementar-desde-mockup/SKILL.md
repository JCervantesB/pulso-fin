---
name: implementar-desde-mockup
description: Implementar una página o componente de Pulso a partir de una plantilla HTML. Usa esta skill cuando la tarea pida construir, migrar o ajustar una página y exista una plantilla de referencia en docs/mockups/. También cuando el usuario diga "implementa la página de...", "convierte la plantilla", "sigue el mockup" o "haz que se parezca a la plantilla".
---

Procedimiento para implementar una página de Pulso desde su plantilla de referencia. Síguelo completo, en orden.

## 1. Lee la especificación

Antes de escribir código, lee la propuesta del cambio en OpenSpec y el escenario que vas a implementar. No implementes nada que no esté en la propuesta aprobada.

## 2. Localiza la plantilla

Las plantillas viven en `docs/mockups/` y son el diseño de referencia:

- `sugerencias.html` → `/`
- `login.html` → `/login`
- `registro.html` → `/registro`
- `nueva-sugerencia.html` → `/sugerencias/nueva`
- `panel-admin.html` → `/admin`

La plantilla es el contrato visual: el resultado debe parecerse a ella, no solo funcionar.

## 3. Aplica las convenciones de AGENTS.md

- Tailwind CSS para todos los estilos. No escribas CSS a mano salvo que la propuesta lo pida.
- No cambies colores, tipografías ni espaciados que no estén en la plantilla o en la propuesta.
- En Next.js, usa `<Link>` de `next/link` para la navegación interna, conservando las clases de la plantilla.
- Los formularios se implementan como componentes de servidor con sus `action`; la lógica de envío y validación va en el servidor.

## 4. Verifica visualmente

1. Arranca la aplicación (`npm run dev`).
2. Abre la página junto a su plantilla y compara diseño, textos y estructura.
3. Si hay diferencias visibles, vuelve a la plantilla, ajusta y revisa de nuevo.

Completa la verificación con `npm run lint` y `npm run build`, que deben pasar sin errores.
