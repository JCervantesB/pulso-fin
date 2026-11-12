# gestion-estado Specification

## Purpose
Define cómo se gestiona el estado de las sugerencias: un administrador cambia el estado de una sugerencia y el cambio se refleja en la lista pública.

## Requirements

### Requirement: Cambiar el estado de una sugerencia

El sistema SHALL permitir a un administrador cambiar el estado de una sugerencia entre pendiente, en desarrollo y completada.

#### Scenario: Cambiar el estado

- **WHEN** un administrador cambia el estado de una sugerencia
- **THEN** el estado queda guardado y se refleja en la lista pública

### Requirement: Solo los administradores cambian el estado

El sistema SHALL exigir el rol de administrador para cambiar el estado, y SHALL impedirlo a cualquier otra persona.

#### Scenario: Sin rol de administrador

- **WHEN** una persona sin rol de administrador intenta cambiar el estado de una sugerencia
- **THEN** el sistema rechaza el cambio

#### Scenario: Sin sesión

- **WHEN** una persona sin sesión intenta cambiar el estado de una sugerencia
- **THEN** el sistema le redirige a la página de inicio de sesión

### Requirement: El estado se muestra en la lista pública

El sistema SHALL mostrar el estado actualizado de cada sugerencia en la lista pública.

#### Scenario: Estado visible

- **WHEN** un visitante abre la lista pública después de un cambio de estado
- **THEN** ve el estado actualizado de cada sugerencia
