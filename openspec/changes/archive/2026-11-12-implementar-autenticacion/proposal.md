# Proposal

## Why

Pulso guarda usuarios en la base de datos pero todavía no hay forma de registrarse, iniciar sesión ni distinguir a una persona con sesión de un visitante. Sin autenticación no se puede saber quién envía una sugerencia ni proteger la escritura, que son la base de los siguientes módulos.

## What Changes

- Añadir registro de usuarios: crea la cuenta con la contraseña cifrada y rechaza un correo ya registrado con un mensaje claro.
- Añadir inicio de sesión: comprueba el correo y la contraseña y crea una sesión.
- Añadir cierre de sesión: invalida la sesión.
- Guardar la sesión en una cookie firmada, segura (no accesible desde JavaScript, solo por HTTPS) y con expiración.
- Proteger las rutas que escriben o administran: se comprueba la sesión en el servidor, no solo ocultando botones.
- Añadir pruebas con Vitest del registro, el inicio de sesión y la sesión.
- Añadir `SESSION_SECRET` a la configuración de entorno.

## Capabilities

### New Capabilities

- `autenticacion`: registro, inicio y cierre de sesión, y protección de rutas según la sesión.

### Modified Capabilities

Ninguna. La tabla `users` y el rol ya existen en la capacidad `base-de-datos`; este cambio los usa sin modificar sus requisitos.

## Impact

- Nueva dependencia `jose` para firmar la sesión, con versión fija.
- Nuevos archivos en `lib/auth/`: sesión, contraseñas y verificación de sesión.
- Nuevos server actions de registro, inicio de sesión y cierre de sesión.
- Las páginas `/registro` y `/login` pasan a formularios funcionales; `/sugerencias/nueva` y `/admin` comprueban la sesión en el servidor.
- Nueva variable `SESSION_SECRET` en `.env.example` (y en el `.env` local, que no se versiona).
- Nuevas pruebas en `test/`.
- Sin cambios en la interfaz visual: se conservan las clases y textos de las plantillas.
