# Instaler - Entrega 1

Repositorio: `diosquez-mirko-instaler`

## Estructura inicial

- `Frontend/`
- `Backend/`
  - `src/models/`

## Modelo de dominio

Entidades principales:

1. `Usuario`
2. `Producto`
3. `SolicitudPresupuesto`
4. `DetalleSolicitud`

Relaciones:

- Un `Usuario` (cliente) puede realizar muchas `SolicitudPresupuesto` (1:N).
- Una `SolicitudPresupuesto` puede contener muchos `DetalleSolicitud` (1:N).
- Cada `DetalleSolicitud` corresponde a un `Producto` (N:1).

## Archivos de modelos

- `Backend/src/models/Usuario.js`
- `Backend/src/models/Producto.js`
- `Backend/src/models/SolicitudPresupuesto.js`
- `Backend/src/models/DetalleSolicitud.js`

> Importante: en esta entrega solo se representa el dominio con clases y atributos; no se implementa lógica de negocio, base de datos ni Express.
