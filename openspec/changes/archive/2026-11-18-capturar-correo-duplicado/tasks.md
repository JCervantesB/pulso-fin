# Tasks

## 1. Reconocer el error

- [x] 1.1 Crear `lib/auth/errores.ts` con una función que recibe un error y devuelve `true` si su cadena `cause` contiene el código `23505` de la restricción `users_email_unique`. Verificación: `npx tsc --noEmit` compila.
- [x] 1.2 Añadir la prueba de unidad: reconoce un error con ese código, ignora otro código y ignora un valor que no es un error. Verificación: `npm test` pasa.

## 2. Capturar el error en el registro

- [x] 2.1 En `registrar`, capturar el error de la inserción; si es de correo repetido, devolver el mismo mensaje que la comprobación previa; si no, relanzarlo. Verificación: `npm run build` compila.

## 3. Verificar la concurrencia

- [x] 3.1 Añadir la prueba de integración que inserta dos usuarios con el mismo correo a la vez y comprueba que uno se guarda y el otro falla con el error reconocido. Verificación: `npm test` pasa de forma repetida.
- [x] 3.2 Ejecutar `npm run lint`, `npm test` y `npm run build`. Verificación: los tres pasan sin errores.

## Workflow follow-up

- Archivar el cambio con `openspec archive capturar-correo-duplicado` cuando las tareas estén completas.
