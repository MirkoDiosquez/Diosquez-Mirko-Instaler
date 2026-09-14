# Proyecto: apellido-nombre-negocio

Este proyecto tiene como objetivo desarrollar una aplicación que gestione [describir brevemente el negocio, por ejemplo, "una clínica veterinaria" o "un servicio de reservas de turnos"]. 

## Estructura del Repositorio

El repositorio está organizado de la siguiente manera:

```
apellido-nombre-negocio
├── Frontend
│   └── [Descripción de la funcionalidad que se desarrollará en el frontend]
├── Backend
│   └── src
│       └── models
│           ├── Cliente.js
│           ├── Mascota.js
│           └── Turno.js
└── README.md
```

### Descripción de Carpetas

- **Frontend/**: Esta carpeta está destinada al desarrollo de la parte frontend de la aplicación, que se implementará en etapas posteriores.

- **Backend/**: Esta carpeta contiene la lógica del backend, donde se definirán los modelos y la lógica de negocio.

### Modelos

- **Cliente.js**: Define la clase `Cliente`, que representa a los clientes del negocio. Contiene los atributos `id`, `nombre`, y `telefono`.

- **Mascota.js**: Define la clase `Mascota`, que representa a las mascotas asociadas a los clientes. Contiene los atributos `id`, `nombre`, `tipo`, y `edad`.

- **Turno.js**: Define la clase `Turno`, que representa las citas o turnos solicitados por los clientes. Contiene los atributos `id`, `fecha`, `hora`, y `clienteId`.

## Objetivos del Proyecto

1. **Organización**: Establecer una estructura clara y organizada para el desarrollo del proyecto.
2. **Modelado del Dominio**: Identificar y representar las entidades principales del negocio a través de clases en JavaScript.
3. **Desarrollo Iterativo**: Implementar la funcionalidad del frontend y backend en etapas, asegurando que cada parte funcione correctamente antes de avanzar.

Este archivo README servirá como guía para el desarrollo y la colaboración en el proyecto.