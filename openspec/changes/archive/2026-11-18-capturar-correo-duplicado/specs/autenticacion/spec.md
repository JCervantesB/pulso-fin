# Spec Delta

## ADDED Requirements

### Requirement: El correo repetido se rechaza también en un registro simultáneo

El sistema SHALL rechazar un registro cuyo correo ya existe en el momento de insertar, aunque la comprobación previa no lo hubiera detectado, y SHALL mostrar el mismo mensaje de correo repetido que en el caso normal.

#### Scenario: Dos registros simultáneos con el mismo correo

- **WHEN** dos personas se registran con el mismo correo casi al mismo tiempo
- **THEN** se crea una única cuenta y la otra persona recibe el mensaje de que ya existe una cuenta con ese correo

#### Scenario: Error de base de datos que no es un correo repetido

- **WHEN** la inserción falla por una causa distinta de un correo repetido
- **THEN** el sistema no muestra el mensaje de correo repetido y deja que el error se propague
