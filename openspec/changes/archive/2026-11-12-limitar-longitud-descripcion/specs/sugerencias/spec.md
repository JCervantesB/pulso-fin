# Spec Delta

## ADDED Requirements

### Requirement: La descripción tiene una longitud máxima

El sistema SHALL rechazar una sugerencia cuya descripción supere los 1000 caracteres, mostrando un mensaje claro.

#### Scenario: Descripción demasiado larga

- **WHEN** se envía una sugerencia con una descripción de más de 1000 caracteres
- **THEN** el sistema rechaza el envío y muestra un mensaje de que la descripción es demasiado larga

#### Scenario: Descripción dentro del límite

- **WHEN** se envía una sugerencia con una descripción de 1000 caracteres o menos
- **THEN** el sistema acepta la sugerencia
