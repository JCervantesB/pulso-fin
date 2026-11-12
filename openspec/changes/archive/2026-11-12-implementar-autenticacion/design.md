# Design

## Context

La tabla `users` ya existe (capacidad `base-de-datos`) con `id`, `nombre`, `email` único, `password_hash`, `role` (`usuario`/`administrador`) y `created_at`. Las páginas `/login` y `/registro` son formularios estáticos. No hay ninguna librería de autenticación en el proyecto.

## Goals / Non-Goals

**Goals:**

- Autenticación propia y sencilla, sin servicio externo.
- Sesión firmada en cookie, segura y con expiración.
- Lógica de contraseñas y de sesión separada de Next.js para poder probarla con Vitest.

**Non-Goals:**

- No se implementa todavía la recuperación de contraseña ni verificación de correo.
- No se gestiona el panel de administración completo (el rol se usa, pero el panel llega en un módulo posterior).

## Decisions

- **Sesión firmada con `jose`:** JWT HS256 con `{ sub: id, role }` y expiración de 7 días, firmado con `SESSION_SECRET`. Alternativa: cookies firmadas a mano con HMAC; descartada porque `jose` es la librería recomendada por Next.js y evita reinventar la firma.
- **Contraseñas con `crypto.scrypt` de Node:** derivación de clave con sal aleatoria de 16 bytes, guardando `sal:hash` en hex. Alternativa: `bcrypt`; descartada para no añadir una dependencia nativa cuando `scrypt` cumple el requisito de derivación de clave.
- **Server Actions + `useActionState`:** los formularios de login y registro usan acciones de servidor, como recomienda la documentación de Next.js. Los errores se devuelven en el estado y se muestran en el mensaje de error existente.
- **`cookies()` async:** se usa `await cookies()` según la API vigente de Next.js.
- **Verificación en el servidor:** las rutas `/sugerencias/nueva` y `/admin` comprueban la sesión en el propio componente de servidor (o en la acción), no solo ocultando botones.
- **Separación para pruebas:** `lib/auth/password.ts` y `lib/auth/session.ts` son funciones puras (reciben el secreto como parámetro) y se prueban con Vitest sin depender de `next/headers`.

## Risks / Trade-offs

- [La sesión depende de un `SESSION_SECRET` que debe ser secreto] → se documenta en `.env.example` y se guarda solo en `.env`, que no se versiona.
- [Las rutas protegidas se comprueban solo en componentes de servidor] → cualquier escritura futura revalidará la sesión en la acción, no solo en la página.
- [`scrypt` sin parámetros guardados explícitos] → se usan los parámetros por defecto de Node y se guarda la sal para poder re-verificar.

## Migration Plan

1. Instalar `jose` con versión fija.
2. Crear `lib/auth/` con contraseñas, sesión y verificación.
3. Convertir `/registro` y `/login` a formularios con acciones de servidor.
4. Proteger `/sugerencias/nueva` y `/admin`.
5. Añadir `SESSION_SECRET` a `.env.example` y al `.env` local.
6. Añadir y ejecutar las pruebas de Vitest.

Rollback: el cambio es aditivo; para revertir bastaría con quitar la comprobación de sesión y las acciones, dejando los formularios estáticos.
