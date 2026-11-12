# votaciones Specification

## Purpose
Define cómo se votan las sugerencias en Pulso: una persona con sesión vota una sugerencia una sola vez, puede retirar su voto, y el total se muestra en la lista pública.

## Requirements

### Requirement: Votar una sugerencia

El sistema SHALL permitir a una persona con sesión votar una sugerencia, con un único voto por persona y sugerencia.

#### Scenario: Votar por primera vez

- **WHEN** una persona con sesión vota una sugerencia que todavía no ha votado
- **THEN** el voto queda registrado y el contador de la sugerencia aumenta en uno

#### Scenario: Votar dos veces la misma sugerencia

- **WHEN** una persona intenta votar una sugerencia que ya ha votado
- **THEN** no se registra un segundo voto: la base de datos rechaza el voto duplicado

### Requirement: Retirar el voto

El sistema SHALL permitir a una persona con sesión retirar su voto de una sugerencia.

#### Scenario: Retirar el voto

- **WHEN** una persona con sesión retira su voto de una sugerencia que había votado
- **THEN** el voto desaparece y el contador de la sugerencia disminuye en uno

### Requirement: Contador de votos visible

El sistema SHALL mostrar en la lista pública el número de votos de cada sugerencia.

#### Scenario: Contador en la lista

- **WHEN** un visitante abre la lista de sugerencias
- **THEN** cada sugerencia muestra su número actual de votos

### Requirement: Votar exige sesión

El sistema SHALL exigir sesión para votar y SHALL redirigir a inicio de sesión a quien no la tenga.

#### Scenario: Visitante sin sesión

- **WHEN** un visitante sin sesión intenta votar una sugerencia
- **THEN** el sistema le redirige a la página de inicio de sesión
