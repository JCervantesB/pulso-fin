# Plantillas de Pulso

Estas plantillas definen el diseño de cada página de Pulso. Son el punto de partida
visual del curso: todos los alumnos reciben las mismas, y el agente las usa como
referencia al construir cada parte de la aplicación con OpenSpec.

Son HTML estático con Tailwind CSS cargado desde su versión de navegador. No son
la aplicación: no envían formularios, no guardan datos y no tienen lógica.

## Páginas

| Archivo | Página | Módulo en el que se usa |
|---|---|---|
| `sugerencias.html` | Lista pública de sugerencias, con votos y estado | 7 (sugerencias), 9 (votaciones), 11 (estados) |
| `login.html` | Inicio de sesión | 6 (autenticación) |
| `registro.html` | Registro de usuarios | 6 (autenticación) |
| `nueva-sugerencia.html` | Formulario para enviar una sugerencia | 7 (sugerencias) |
| `panel-admin.html` | Panel de administración para cambiar el estado | 11 (especificaciones vivas) |

## Cómo verlas

Abre cualquier archivo en el navegador. Tailwind se carga desde internet, así
que necesitas conexión la primera vez.

## Qué cubre cada una

- **Lista pública:** muestra los votos, el estado y el autor de cada sugerencia.
  Los botones de votar y los estados aparecen en el diseño desde el principio,
  aunque su funcionalidad llega en módulos posteriores.
- **Login y registro:** comparten cabecera y tarjeta central, con los mismos
  identificadores de campo en todas las páginas de acceso.
- **Nueva sugerencia:** formulario con título y descripción.
- **Panel de administración:** tabla con un selector de estado por sugerencia.

## Qué no cubren

- Mensajes de error reales, estados de carga y pantallas vacías por sesión.
- Diseño responsive detallado: se revisará cuando se construya la aplicación.
- Ningún comportamiento: los enlaces y botones son visuales.
