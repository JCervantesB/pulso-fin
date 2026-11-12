# deteccion-duplicados Specification

## Purpose
Define cómo se evitan las sugerencias duplicadas: antes de publicar una nueva, el sistema avisa si ya existen sugerencias con un título parecido.

## Requirements

### Requirement: Avisar de sugerencias similares

El sistema SHALL buscar, al enviar una sugerencia, las existentes cuyo título coincide con el nuevo sin distinguir mayúsculas, y SHALL mostrarlas sin crear el duplicado.

#### Scenario: Título que ya existe

- **WHEN** una persona envía una sugerencia cuyo título coincide con el de una sugerencia existente
- **THEN** el sistema muestra las sugerencias parecidas y no crea la nueva

#### Scenario: Título sin coincidencias

- **WHEN** una persona envía una sugerencia cuyo título no coincide con ninguna existente
- **THEN** el sistema crea la sugerencia como de costumbre
