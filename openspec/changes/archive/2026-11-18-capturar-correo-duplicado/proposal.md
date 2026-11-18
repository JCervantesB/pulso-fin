# Proposal

## Why

El registro comprueba si el correo existe antes de insertar. Esa comprobación da un mensaje claro en el caso normal, pero no es una garantía: si dos personas envían el formulario con el mismo correo casi a la vez, las dos pueden pasar la comprobación. La restricción de unicidad de la base de datos sí lo impide, pero la aplicación no captura su error y la persona ve una página de error genérica en lugar del mensaje de correo repetido.

## What Changes

- Capturar el error de correo duplicado de la base de datos al insertar el usuario, y devolver el mismo mensaje que la comprobación previa.
- Reconocer ese error por su código de PostgreSQL (`23505`) y no por el texto del mensaje.
- Añadir pruebas: una de unidad para el reconocimiento del error y una de integración que envía dos registros simultáneos con el mismo correo y comprueba que solo uno se guarda y el otro recibe el mensaje claro.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `autenticacion`: se añade el requisito de que un registro simultáneo con un correo repetido se rechace con el mismo mensaje claro.

## Impact

- `lib/auth/` gana una función que reconoce el error de correo duplicado.
- `app/actions/auth.ts`: la acción `registrar` captura ese error.
- Nuevas pruebas en `test/`.
- Sin cambios en el esquema, en la interfaz ni en las demás acciones.
