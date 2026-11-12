# autenticacion Specification

## Purpose
Define cómo Pulso identifica a cada persona: registro, inicio y cierre de sesión, y la frontera entre lo que puede hacer un visitante y lo que exige una sesión.

## Requirements

### Requirement: Registro de usuarios

El sistema SHALL permitir crear una cuenta con nombre, correo y contraseña, y SHALL cifrar la contraseña antes de guardarla. El correo SHALL ser único.

#### Scenario: Registro con datos válidos

- **WHEN** una persona envía nombre, un correo no registrado y una contraseña de al menos 8 caracteres
- **THEN** se crea la cuenta con la contraseña cifrada y se inicia sesión

#### Scenario: Correo ya registrado

- **WHEN** una persona se registra con un correo que ya tiene cuenta
- **THEN** el sistema rechaza el registro y muestra un mensaje claro de correo repetido

#### Scenario: Contraseña demasiado corta

- **WHEN** una persona se registra con una contraseña de menos de 8 caracteres
- **THEN** el sistema rechaza el registro con un mensaje claro

### Requirement: La contraseña no se guarda en texto plano

El sistema SHALL guardar la contraseña como un valor derivado con un algoritmo de derivación de clave y una sal aleatoria, de modo que la contraseña original no sea recuperable.

#### Scenario: Verificar una contraseña correcta

- **WHEN** se compara una contraseña con su valor guardado
- **THEN** la verificación acepta la contraseña correcta y rechaza una incorrecta

### Requirement: Inicio de sesión

El sistema SHALL iniciar sesión cuando el correo y la contraseña coinciden con una cuenta, y SHALL rechazar credenciales incorrectas sin revelar cuál de las dos falla.

#### Scenario: Credenciales correctas

- **WHEN** una persona inicia sesión con un correo y contraseña válidos
- **THEN** se crea una sesión para esa cuenta

#### Scenario: Credenciales incorrectas

- **WHEN** una persona inicia sesión con un correo o contraseña que no coinciden
- **THEN** el sistema rechaza el inicio de sesión con un mensaje genérico de credenciales incorrectas

### Requirement: Sesión en cookie segura

El sistema SHALL guardar la sesión en una cookie firmada, no accesible desde JavaScript, enviada solo por HTTPS y con expiración.

#### Scenario: Sesión válida

- **WHEN** se lee la cookie de sesión de una cuenta con sesión activa
- **THEN** el sistema reconoce a la cuenta y su rol

#### Scenario: Sesión ausente o inválida

- **WHEN** no hay cookie de sesión o la cookie no está firmada correctamente
- **THEN** el sistema trata la petición como la de un visitante sin sesión

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión de modo que la cookie deje de identificar a la cuenta.

#### Scenario: Cerrar sesión

- **WHEN** una persona con sesión inicia el cierre de sesión
- **THEN** la cookie de sesión se invalida y la persona vuelve a ser un visitante

### Requirement: Lectura pública y escritura protegida

Cualquier visitante SHALL poder leer el contenido público, y las rutas que crean contenido o administran SHALL exigir sesión, comprobada en el servidor.

#### Scenario: Acceso a una ruta protegida sin sesión

- **WHEN** un visitante sin sesión intenta acceder a una ruta que escribe o administra
- **THEN** el sistema le redirige a la página de inicio de sesión

#### Scenario: Acceso a una ruta protegida con sesión

- **WHEN** una persona con sesión accede a una ruta que escribe o administra
- **THEN** el sistema permite el acceso

#### Scenario: Lectura pública

- **WHEN** un visitante sin sesión accede al contenido público
- **THEN** el sistema muestra el contenido sin exigir sesión
