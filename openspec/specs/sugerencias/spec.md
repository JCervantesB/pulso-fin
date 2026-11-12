# sugerencias Specification

## Purpose
Define cómo se proponen y se leen las sugerencias en Pulso: una persona con sesión envía una idea y cualquier visitante puede ver la lista pública.

## Requirements

### Requirement: Enviar una sugerencia

El sistema SHALL permitir a una persona con sesión enviar una sugerencia con título y descripción, y SHALL guardarla ligada a esa persona.

#### Scenario: Envío con título y descripción

- **WHEN** una persona con sesión envía un título y una descripción no vacíos
- **THEN** la sugerencia se guarda ligada a esa persona y aparece en la lista pública

#### Scenario: Envío sin sesión

- **WHEN** una persona sin sesión intenta enviar una sugerencia
- **THEN** el sistema le redirige a la página de inicio de sesión

### Requirement: Validación de los campos

El sistema SHALL rechazar una sugerencia con el título o la descripción vacíos, mostrando un mensaje claro.

#### Scenario: Título vacío

- **WHEN** se envía una sugerencia con el título vacío
- **THEN** el sistema rechaza el envío y muestra un mensaje de error

#### Scenario: Descripción vacía

- **WHEN** se envía una sugerencia con la descripción vacía
- **THEN** el sistema rechaza el envío y muestra un mensaje de error

### Requirement: Lista pública de sugerencias

El sistema SHALL mostrar las sugerencias registradas a cualquier visitante, ordenadas de la más reciente a la más antigua, con título, descripción, autor y fecha.

#### Scenario: Lista con sugerencias

- **WHEN** un visitante abre la lista con sugerencias registradas
- **THEN** ve las sugerencias ordenadas de la más reciente a la más antigua, cada una con su título, descripción, autor y fecha

#### Scenario: Lista vacía

- **WHEN** un visitante abre la lista sin ninguna sugerencia registrada
- **THEN** ve un mensaje que indica que todavía no hay sugerencias

### Requirement: La descripción tiene una longitud máxima

El sistema SHALL rechazar una sugerencia cuya descripción supere los 1000 caracteres, mostrando un mensaje claro.

#### Scenario: Descripción demasiado larga

- **WHEN** se envía una sugerencia con una descripción de más de 1000 caracteres
- **THEN** el sistema rechaza el envío y muestra un mensaje de que la descripción es demasiado larga

#### Scenario: Descripción dentro del límite

- **WHEN** se envía una sugerencia con una descripción de 1000 caracteres o menos
- **THEN** el sistema acepta la sugerencia
