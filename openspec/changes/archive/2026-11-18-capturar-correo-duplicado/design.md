# Design

## Context

La tabla `users` tiene una restricción de unicidad sobre `email`. Al insertar un correo repetido, Drizzle con el driver de Neon lanza un error `Failed query`, y la causa original (`NeonDbError`) lleva el código `23505`. Ese código es estable; el texto del mensaje depende del idioma y de la versión.

## Decisions

- **Reconocer por código, no por texto:** una función recorre la cadena `cause` y busca `code === "23505"` con la restricción `users_email_unique`. Así no depende de que el mensaje cambie.
- **Capturar solo ese error:** cualquier otro fallo de la inserción se relanza. Capturar todo ocultaría errores reales de la base de datos.
- **Mismo mensaje en los dos caminos:** la comprobación previa se conserva para el caso normal, y el error de la base de datos devuelve el mensaje de correo repetido.

## Risks / Trade-offs

- [El código `23505` es de PostgreSQL] → el proyecto usa Neon, que es PostgreSQL; si se cambiara de base de datos, habría que revisar esta función.
- [La prueba de concurrencia depende de la base de datos real] → se ejecuta en la prueba de integración, igual que el resto de pruebas de la base de datos.

## Migration Plan

1. Añadir la función de reconocimiento en `lib/auth/`.
2. Capturar el error en `registrar`.
3. Añadir la prueba de unidad y la prueba de concurrencia.
