# Instaler

Interfaz React y API Express para un comercio de materiales de construcción, instalaciones y mantenimiento.

## Ejecutar en localhost

Se necesita Node.js 20.19+ o 22.12+ (validado con Node.js 24).

En una terminal, iniciar la API:

```bash
cd backend
npm install
npm start
```

En otra terminal, iniciar el frontend de manera independiente:

```bash
cd frontend
npm install
npm run dev
```

- Aplicación: http://localhost:5173
- Gestión del CRUD: http://localhost:5173/#gestion
- API: http://localhost:3000/api/productos

Vite redirige `/api` al backend en el puerto 3000. Esto permite consumir la API desde el frontend sin agregar dependencias de CORS. El puerto 5173 es fijo: si está ocupado, Vite informa el problema.

`frontend/.env.example` documenta `VITE_API_URL`. Si se configura una URL absoluta de otro origen, el servidor de esa API debe autorizar CORS. Para publicar el build, configurar un proxy `/api` en el servidor de destino o la URL y CORS correspondientes.

## Organización de la entrega 3

```text
backend/                  API existente de la entrega 2
frontend/
  public/                 Recursos públicos
  src/
    assets/               Recursos extraídos del mockup e indicación de origen
    components/           Botones, campos, modales, tarjetas, notificaciones y estructura
    pages/                Inicio, catálogo, contacto y gestión
    services/             Peticiones HTTP y procesamiento de respuestas de productos
    utils/                Validaciones, búsqueda, formato de precios y pruebas
    styles/               Estilos compartidos y adaptación a pantallas pequeñas
    App.jsx               Navegación y coordinación de datos y operaciones
    main.jsx              Entrada React
```

Todo el código de la interfaz está en `frontend/src`; los archivos de configuración se encuentran en `frontend/`. Se normalizaron los nombres de las carpetas originales a minúsculas.

## Funcionalidades y diseño

Se conserva el recorrido del boceto de `Documentacion/instaler.docx`: navegación, presentación, sobre nosotros, productos destacados, beneficios, contacto y pie. Se usan azul industrial `#0B4F8C`, gris claro y naranja `#F28C28`, Montserrat y Open Sans (con fuentes locales de respaldo). Las imágenes provienen del mockup original, según `frontend/src/assets/README.md`.

Las mejoras consisten en un catálogo con búsqueda y detalle, una pantalla adicional de gestión y una adaptación a dispositivos pequeños, conservando la identidad y las secciones del diseño original. Las tarjetas emplean un ícono neutro porque la API no tiene fotos de productos.

El CRUD permite listar, consultar, crear, editar y eliminar productos reales de la API. Incluye filtros por estado, validación de datos, stock cero, estado activo/inactivo, estados de carga, reintento ante errores, bloqueo de acciones durante guardado y confirmación de eliminación. Un único sistema de notificaciones comunica éxitos y errores del servidor, sin `alert()`. Los campos inválidos incluyen mensajes asociados y reciben foco.

La navegación usa enlaces con hash; las ventanas usan `dialog` nativo con foco modal, cierre con Escape, devolución de foco al control anterior y botones semánticos. Hay etiquetas asociadas, textos alternativos, enlace para saltar al contenido, avisos accesibles y respeto por la preferencia de movimiento reducido.

## Alcance actual

La API de la entrega 2 implementa únicamente productos. No existen endpoints de autenticación, usuarios, contacto ni solicitudes de presupuesto. La gestión es una pantalla de demostración sin autenticación. El formulario de consulta valida los datos y permite descargar un archivo de texto para llevar al local; indica expresamente que no envía datos ni registra una solicitud. No se simulan envíos exitosos.

Los productos se almacenan en memoria del backend: reiniciar la API restaura los datos iniciales. El frontend no usa productos escritos manualmente ni guarda una copia en localStorage.

## Verificación

```bash
cd frontend
npm test
npm run build
npm run preview
```

`npm run preview` sirve el build en http://localhost:4173, también con proxy `/api`. Se debe mantener el backend encendido.

Recorrido manual recomendado: crear un producto, buscarlo, abrir el detalle, editar precio y stock, comprobarlo en el catálogo, cancelar una eliminación y luego confirmarla. Verificar nombre duplicado, valores inválidos, stock cero, producto inactivo y caída del backend (mensaje y reintento). En el formulario de consulta, comprobar validaciones y descarga. Recorrer enlaces, formulario y diálogo usando Tab y Escape, y revisar en ancho móvil.

---

## Entrega 2 - Arquitectura MVC

API REST con Express, persistencia en memoria (arrays) y manejo centralizado de errores.

### Estructura `backend/src`

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

| Método | Ruta                 | Descripción    |
| ------ | -------------------- | -------------- |
| GET    | `/api/productos`     | Obtener todos  |
| GET    | `/api/productos/:id` | Obtener por ID |
| POST   | `/api/productos`     | Crear          |
| PUT    | `/api/productos/:id` | Modificar      |
| DELETE | `/api/productos/:id` | Eliminar       |

### Cómo ejecutar

```bash
cd backend
npm install
npm start
```

## Entrega 1 - Estructura inicial

- `frontend/`
- `backend/`
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

- `backend/src/models/Usuario.js`
- `backend/src/models/Producto.js`
- `backend/src/models/SolicitudPresupuesto.js`
- `backend/src/models/DetalleSolicitud.js`

> Importante: en esta entrega solo se representa el dominio con clases y atributos; no se implementa lógica de negocio, base de datos ni Express.
