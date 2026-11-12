# Proposal

## Why

Las sugerencias ya tienen un estado (pendiente, en desarrollo, completada), con `pendiente` por defecto, porque la plantilla lo mostraba. Pero el panel de administración sigue siendo una tabla estática: nadie puede cambiar ese estado. Para que el estado signifique algo, los administradores necesitan poder mover cada sugerencia de un estado a otro.

## What Changes

- Añadir la acción para que un administrador cambie el estado de una sugerencia.
- Hacer funcional el panel de administración: leer las sugerencias reales con su autor y votos, y permitir cambiar el estado desde un desplegable.
- El cambio de estado se refleja en la lista pública.
- Mantener intactas las funcionalidades anteriores: sugerencias, votos y la búsqueda pendiente.

## Capabilities

### New Capabilities

- `gestion-estado`: cambio del estado de una sugerencia por parte de un administrador.

### Modified Capabilities

Ninguna. El estado ya existía en `base-de-datos` (capacidad del módulo 4); este cambio añade el comportamiento de cambiarlo, que es una capacidad nueva.

## Impact

- Nueva server action `cambiarEstado` que exige rol de administrador.
- La página `/admin` lee sugerencias, autores y votos, y renderiza un desplegable por fila.
- Nuevo componente cliente para el desplegable de estado.
- Nuevas pruebas de Vitest y de Playwright.
- Sin cambios en el esquema de base de datos ni en el diseño.
