# base-de-datos Specification

## Purpose
Define la persistencia de Pulso en PostgreSQL: la aplicación se conecta a la base de datos, aplica su esquema mediante migraciones y guarda los usuarios con un rol.

## Requirements

### Requirement: La aplicación se conecta a PostgreSQL

La aplicación SHALL conectarse a PostgreSQL usando la cadena de conexión `DATABASE_URL`, que se lee de un archivo de entorno que no se versiona.

#### Scenario: Conexión con una cadena válida

- **WHEN** la aplicación arranca con `DATABASE_URL` apuntando a una base de datos accesible
- **THEN** la conexión se establece y una consulta de comprobación se responde sin error

#### Scenario: Falta la cadena de conexión

- **WHEN** la aplicación intenta conectarse sin `DATABASE_URL` definida
- **THEN** el intento falla con un error que indica que falta la cadena de conexión

### Requirement: El esquema se gestiona con migraciones

La base de datos SHALL tener un esquema versionado que se aplica mediante migraciones generadas por Drizzle Kit.

#### Scenario: Aplicar una migración nueva

- **WHEN** se ejecuta el comando de migración sobre una base de datos sin el esquema
- **THEN** se crean las tablas definidas en el esquema y el historial de migraciones registra la migración aplicada

#### Scenario: Volver a aplicar la misma migración

- **WHEN** se ejecuta el comando de migración sin cambios nuevos en el esquema
- **THEN** no se aplica ninguna migración repetida y el proceso termina sin error

### Requirement: La tabla de usuarios guarda cada cuenta

El sistema SHALL guardar los usuarios en una tabla con identificador, nombre, correo electrónico, contraseña cifrada y rol, y con una marca de tiempo de creación.

#### Scenario: Guardar un usuario nuevo

- **WHEN** se inserta un usuario con nombre, correo y contraseña cifrada
- **THEN** el usuario queda registrado con un identificador único y su rol por defecto

#### Scenario: El correo es único

- **WHEN** se intenta insertar un usuario con un correo ya registrado
- **THEN** la base de datos rechaza la operación por duplicado de correo

### Requirement: El rol distingue administradores

El sistema SHALL asignar a cada usuario un rol que solo puede ser `usuario` o `administrador`, con `usuario` como valor por defecto.

#### Scenario: Rol por defecto

- **WHEN** se crea un usuario sin especificar el rol
- **THEN** el usuario queda con el rol `usuario`

#### Scenario: Rol inválido

- **WHEN** se intenta guardar un usuario con un rol distinto de `usuario` o `administrador`
- **THEN** la base de datos rechaza el valor de rol
