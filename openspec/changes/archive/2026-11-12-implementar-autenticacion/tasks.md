# Tasks

## 1. Dependencias y secretos

- [x] 1.1 Instalar `jose` con versión exacta. Verificación: `npm ls jose` muestra la versión fija.
- [x] 1.2 Añadir `SESSION_SECRET` a `.env.example` con una indicación de cómo generarlo, y configurarlo en el `.env` local. Verificación: `SESSION_SECRET` aparece en `.env.example` y `.env` lo define.

## 2. Lógica de contraseñas y sesión

- [x] 2.1 Crear `lib/auth/password.ts` con `hashPassword` y `verifyPassword` usando `crypto.scrypt` con sal aleatoria. Verificación: `npx tsc --noEmit` compila y una prueba confirma que verifica la contraseña correcta y rechaza la incorrecta.
- [x] 2.2 Crear `lib/auth/session.ts` con `crearSesion`, `leerSesion` y `borrarSesion` usando `jose` y `cookies()`. Verificación: firmar y verificar un token con `SESSION_SECRET` produce el `sub` y el `role` correctos.

## 3. Acciones de servidor

- [x] 3.1 Crear las acciones de registro, inicio y cierre de sesión. Verificación: `npm run build` compila y las acciones se importan en los formularios.

## 4. Páginas

- [x] 4.1 Convertir `/registro` en formulario funcional que valida en el servidor y muestra errores. Verificación: al registrar un correo repetido se muestra el mensaje de error; un registro válido inicia sesión.
- [x] 4.2 Convertir `/login` en formulario funcional. Verificación: credenciales incorrectas muestran error; credenciales correctas inician sesión.
- [x] 4.3 Proteger `/sugerencias/nueva` y `/admin` comprobando la sesión en el servidor. Verificación: sin sesión se redirige a `/login`; con sesión se muestra la página.

## 5. Pruebas

- [x] 5.1 Añadir pruebas de Vitest para contraseñas, sesión y las funciones de registro/inicio. Verificación: `npm test` pasa todas las pruebas.
- [x] 5.2 Documentar `SESSION_SECRET` y el flujo de autenticación en `AGENTS.md`. Verificación: la documentación refleja el comportamiento implementado.

## Workflow follow-up

- Archivar el cambio con `openspec archive implementar-autenticacion` cuando las tareas estén completas.
