---
name: implementar-desde-mockup
description: Implementar una página de la aplicación a partir de su plantilla HTML en docs/mockups/. Usa esta skill cuando la tarea pida construir, migrar o ajustar una página y exista una plantilla de referencia. También cuando el usuario diga "implementa la página de...", "convierte la plantilla", "sigue el mockup" o "haz que se parezca a la plantilla".
---

Procedimiento para implementar una página desde su plantilla. Síguelo completo y en orden. No des la tarea por terminada hasta completar el paso 6.

## 1. Lee la especificación

- Lee la propuesta del cambio activo en OpenSpec y el requisito que corresponde a la página.
- No implementes nada que no esté en la propuesta aprobada. Si falta algo, pregunta antes de escribir código.

## 2. Localiza la plantilla

| Plantilla | Ruta |
| --- | --- |
| `docs/mockups/sugerencias.html` | `/` |
| `docs/mockups/login.html` | `/login` |
| `docs/mockups/registro.html` | `/registro` |
| `docs/mockups/nueva-sugerencia.html` | `/sugerencias/nueva` |
| `docs/mockups/panel-admin.html` | `/admin` |

- Lee la plantilla completa antes de escribir código. Anota sus secciones, sus textos y sus clases.
- La plantilla es el contrato visual: el resultado debe parecerse a ella, no solo funcionar.

## 3. Implementa copiando la plantilla

- Copia las clases de Tailwind tal cual. No las simplifiques ni las "mejores".
- Copia los textos exactos, con acentos y signos de puntuación.
- Conserva el orden de las secciones.
- Traduce HTML a JSX: `class` pasa a `className`, `for` pasa a `htmlFor`, los atributos pasan a camelCase (`maxlength` pasa a `maxLength`) y los comentarios pasan a `{/* */}`.
- Los enlaces internos usan `<Link>` de `next/link`, con las mismas clases.
- No escribas CSS a mano. No cambies colores, tipografías ni espaciados que no estén en la plantilla o en la propuesta.
- No añadas nada que la plantilla no tenga.
- Si el generador del proyecto trajo fuentes, modo oscuro o contenido de demostración, retíralos e indícalo en el informe.
- Los formularios usan acciones de servidor. La validación y el envío se hacen en el servidor, y los mensajes de error usan la clase de error de la plantilla.
- Si el build indica que una ruta depende de la petición (por ejemplo, porque lee la sesión), márcala con `export const instant = false`.

## 4. Compara con la plantilla delante

Para cada página, en este orden y sin saltarte ninguno:

1. **Estructura:** mismas secciones, mismo orden.
2. **Textos:** cada título, etiqueta, placeholder, mensaje y botón, palabra por palabra.
3. **Diseño:** colores, tamaños de letra, espaciados, bordes y sombras, en escritorio y en pantalla estrecha.
4. **Estados:** enlaces y botones activos, estado vacío, mensajes de error aunque en la plantilla estén ocultos.

Si hay diferencias, corrígelas en el código, vuelve a la plantilla y repite la comparación completa.

## 5. Ejecuta las comprobaciones

- `npm run lint` y `npm run build` deben pasar sin errores.
- No silencies un error con `eslint-disable` ni con `any`. Corrige la causa.

## 6. Informa del resultado

Tu respuesta final incluye:

- las páginas implementadas, con su ruta y su plantilla;
- las diferencias que quedan y por qué;
- lo que retiraste de lo que generó el proyecto por defecto;
- el resultado de `npm run lint` y `npm run build`;
- qué comprobaste en el paso 4 y qué no pudiste comprobar.

Una respuesta que solo dice "página implementada" no cumple esta skill.

## Prohibido

- Cambiar textos de la plantilla por "mejorarlos".
- Implementar funcionalidad que la propuesta no pide.
- Dar una página por buena sin completar el paso 4.
