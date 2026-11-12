# busqueda Specification

## Purpose
Define cómo se buscan las sugerencias en Pulso: una persona escribe un término y ve las sugerencias cuyo título o descripción lo contienen.

## Requirements

### Requirement: Buscar sugerencias por texto

El sistema SHALL permitir buscar sugerencias por un término que coincide con el título o la descripción, sin distinguir mayúsculas de minúsculas.

#### Scenario: Coincidencia en el título

- **WHEN** se busca un término que aparece en el título de una sugerencia
- **THEN** la sugerencia aparece en los resultados

#### Scenario: Coincidencia en la descripción

- **WHEN** se busca un término que aparece en la descripción de una sugerencia
- **THEN** la sugerencia aparece en los resultados

#### Scenario: Sin distinción de mayúsculas

- **WHEN** se busca un término escrito con mayúsculas o minúsculas distintas a las guardadas
- **THEN** la sugerencia coincide igualmente

#### Scenario: Búsqueda vacía

- **WHEN** se busca sin escribir ningún término
- **THEN** se muestran todas las sugerencias, como en la lista sin filtro

### Requirement: Resultados en el orden de la lista

El sistema SHALL mostrar los resultados de la búsqueda en el mismo orden de la lista pública, de la más reciente a la más antigua.

#### Scenario: Orden de los resultados

- **WHEN** una búsqueda devuelve varias sugerencias
- **THEN** se muestran ordenadas de la más reciente a la más antigua
