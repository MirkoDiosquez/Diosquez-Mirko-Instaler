# Instaler

Repositorio: `diosquez-mirko-instaler`

## Entrega 2 - Arquitectura MVC

API REST con Express, persistencia en memoria (arrays) y manejo centralizado de errores.

### Estructura `Backend/src`

- `controllers/` → reciben la request y devuelven la response.
- `services/` → lógica y validaciones de negocio.
- `repositories/` → acceso a datos (arrays en memoria).
- `models/` → clases del dominio.
- `routes/` → definición de endpoints.
- `middlewares/` → manejo centralizado de errores.
- `responses/` → formato consistente de respuestas (`ApiResponse`).
- `exceptions/` → `AppError` y subclases (`BadRequestError`, `NotFoundError`, `ConflictError`).
- `enums/` → `Messages.js` con los mensajes centralizados.
- `utils/` → validadores reutilizables.

### CRUD de Producto

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/productos` | Obtener todos |
| GET | `/api/productos/:id` | Obtener por ID |
| POST | `/api/productos` | Crear |
| PUT | `/api/productos/:id` | Modificar |
| DELETE | `/api/productos/:id` | Eliminar |

### Cómo ejecutar

```bash
cd Backend
npm install
npm start
```

## Entrega 1 - Estructura inicial

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
