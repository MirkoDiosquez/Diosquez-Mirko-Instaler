# Auditoría inicial de Instaler

Paso 1. Estado del checkout local en commit `7d836da`, auditado el 15 de octubre de 2026. No se modificaron archivos del proyecto ni registros de productos.

## Método y límite de versión

Se leyó `~/.codex/skills/taste-skill/SKILL.md` y su referencia `references/critique.md`. Esta versión tiene pasos 1 a 10, reglas generales y casos especiales; no incluye secciones 11.B, 11.D o 14 ni define los tres diales del brief. Se cubren los puntos expresamente pedidos por el usuario. Los diales siguientes son una interpretación editorial en escala de 1 a 10, no resultados instrumentales de la skill.

Se usó el checkout existente, que contiene la implementación actual. No se infirió un despliegue público a partir del enlace de GitHub. No se consultaron Search Console, Analytics ni posiciones en buscadores.

Evidencia de código: React/Vite, CSS global, componentes, páginas, servicios y documentación de recursos. Evidencia de navegador: Chromium, inspector oficial de Taste Skill a 1440×900, 768×1024 y 390×844; recorrido adicional de hashes, búsqueda, detalle, consulta prellenada y gestión. Reportes: `report.json` y `baseline.json` en esta carpeta. Las dimensiones expresan píxeles CSS.

## Identidad y tokens actuales

| Elemento | Código | Navegador y diagnóstico |
|---|---|---|
| Primario | `--blue: #0B4F8C` | Presente en enlaces, marca y detalles. Conservar. |
| Azul oscuro | `--navy: #082E50` | Títulos, beneficios y footer. Conservar. |
| Acento | `--orange: #F28C28` | CTA principal. Hay variantes adicionales, como #CF6700 en la marca y #FFA343 en el hero. |
| Tipografía | Montserrat para títulos y Open Sans para texto, mediante Google Fonts; Arial/sans-serif de respaldo | Ambas familias cargaron en la prueba. El cuerpo dominante mide 13 px. |
| Logo | Nombre en texto, tres barras CSS inclinadas, descriptor pequeño | Reconocible y nítido como texto, pero con tratamiento distinto en header y footer. El descriptor cae de 8 a 6 px. Las barras azules pierden contraste en el footer oscuro. |
| Radios | Botones y badges 4 px; campos 5 px; tarjetas 6 px; contacto 7 px; modal 9 px | Falta una escala más consistente. |
| Superficies | Blanco, gris #F2F4F6; bordes finos y sombras | Separación comprensible, con ornamentación repetida que el estándar de la skill objeta. |

## Arquitectura de información y recorridos

Una aplicación de página única con tres vistas principales:

- Inicio: presentación, nosotros, productos, beneficios, contacto y footer.
- Productos: catálogo independiente y contacto.
- Gestión: indicadores, búsqueda, filtro de estado, tabla y formularios modales.

Navegación confirmada: Inicio → `#inicio`; Productos → `#productos`; Nosotros → `#nosotros`; Contacto → `#contacto`; Gestión → `#gestion`. El enlace de salto usa `#contenido`.

`#inicio` y `#gestion` son estados interpretados por JavaScript, sin elementos con esos mismos ID. `#nosotros`, `#productos`, `#contacto` y `#contenido` corresponden a elementos según la vista. Visitar `#contenido` desde gestión también cambia a inicio, porque el enrutador solo reconoce productos y gestión como vistas distintas. Es un comportamiento actual que debe registrarse para no alterarlo silenciosamente.

Recorrido comercial útil: explorar → buscar → ver detalle → consultar producto → contacto con mensaje prellenado → descargar consulta. El enlace Cómo llegar apunta a una búsqueda en Google Maps; su URL existe en el código, pero no se verificó el destino externo.

Recorrido administrativo: Gestión → buscar/filtrar → nuevo producto/editar/eliminar. La gestión no tiene autenticación y la API guarda datos en memoria; ambas limitaciones están explicadas actualmente.

## Contenido: conservar y revisar

Útil: categorías de actividad, descripción del negocio, productos y precios desde la API, disponibilidad, dirección, horarios, búsqueda, detalle y aclaración de descarga local.

Repetitivo: etiquetas sobre títulos como SOMOS INSTALER y MÁS QUE MATERIALES; sello MATERIALES DE CALIDAD; frases genéricas de confianza repetidas en hero, beneficios y footer. Son candidatos a reducir peso visual, no autorización para cambiar títulos o copy legal.

Los beneficios son afirmaciones del sitio, no pruebas verificadas de calidad, reseñas o certificaciones. No se encontraron testimonios, rankings o métricas comerciales verificadas y no deben inventarse.

## Patrones que conviene preservar

- Paleta azul/naranja y Montserrat/Open Sans.
- Hero reconocible con tienda/materiales, navegación y orden general del boceto.
- Voseo y tono cercano: encontrá, consultanos, contanos, traé.
- Información de productos obtenida de la API y peticiones centralizadas.
- Búsqueda, detalle, precio en ARS y prellenado de consulta.
- Campos, orden, etiquetas, foco visible, modal nativo, mensajes de validación, notificaciones y estados de carga/error/vacío/deshabilitado.
- Descarga de consulta sin sugerir que hubo envío al negocio.

La estructura de esos estados se confirmó en código. Esta auditoría no repitió todos los estados ni todo el CRUD mediante interacción.

## Problemas comprobados y patrones a retirar

| Hallazgo | Evidencia | Implicación |
|---|---|---|
| Todos los productos muestran la misma caja SVG | Código y navegador | Arena y cemento no se identifican visualmente. |
| Hero de 604×313 y frente de 410×221 | Archivos originales y capturas | Se amplían y pierden detalle. Son recortes del mockup, no fotografías verificadas del local. |
| Alternativa de imagen afirma “Frente del local Instaler” | Código | La atribución visible para lectores de pantalla es más categórica que la documentación de recursos. |
| Cuerpo dominante de 13 px; 19 tamaños en escritorio, 17 en móvil | Inspector | Lectura pequeña y jerarquía demasiado fragmentada. |
| 40 bloques menores de 13 px en escritorio | Inspector | Avisos, metadatos y acciones secundarias difíciles de leer. |
| Hero en 4 líneas a 390 px | Inspector y captura móvil | Domina demasiado la primera pantalla. El texto debe conservarse; una eventual corrección debe actuar sobre composición y escala. |
| Título de contacto en 3 líneas a 768 px | Inspector y captura tablet | Columna demasiado estrecha para el contenido actual. |
| En móvil, “obra,un” se junta visualmente | Captura y CSS que oculta el salto de línea | Hay que conservar la separación de palabras al adaptar el layout. |
| Nota de contacto con contraste 4,3:1 | Inspector | No llega al umbral 4,5:1 aplicado a ese texto pequeño. |
| Dos productos en una grilla de tres columnas en escritorio | Captura | Queda una columna vacía y el catálogo pierde presencia. |
| Tabla de gestión desplazable en móvil | Navegador | El contenedor tiene 214 px de contenido horizontal adicional; estado y acciones quedan fuera de la primera vista, aunque no desborda la página. |
| Repetición de etiquetas pequeñas, líneas finas, fondos degradados y tarjetas de íconos | Código, inspector y capturas | Introduce ruido y reduce la identidad material del negocio. |

No se observaron imágenes rotas ni desbordamiento horizontal de la landing a los tres anchos. Tampoco hubo desbordamiento global de gestión. No se verificaron todos los anchos intermedios.

El lint encontró 26 coincidencias FAIL y 14 WARN. El inspector agrupó 12 hallazgos FAIL y 4 WARN. Son reglas de la skill, no 26 errores de ejecución ni una certificación de accesibilidad. El warning por Montserrat entra en conflicto con la conservación explícita de la marca, por lo que no justifica cambiar la fuente. Las sombras de modales/notificaciones y bordes de formularios o tablas tienen una función real. El degradado del hero requiere evaluación como velo de legibilidad; no se debe equiparar automáticamente con el fondo decorativo de las tarjetas. La exigencia de más movimiento del inspector se debe reconciliar con el brief de animación moderada, sin agregar animaciones de relleno.

## Diales inferidos del estado actual

- DESIGN_VARIANCE: 3/10. Composiciones convencionales, dos columnas y grillas repetidas; la marca aporta distinción.
- MOTION_INTENSITY: 2/10. Hover, transiciones breves y spinner; no hay coreografía de secciones. La preferencia de movimiento reducido está contemplada en CSS. El scroll suave también se solicita desde JavaScript y requiere una comprobación específica con esa preferencia activada.
- VISUAL_DENSITY: 5/10. Información moderada, con fragmentación en etiquetas y texto pequeño. La densidad de información útil es menor que la cantidad de elementos visuales.

Estos valores describen la línea base. No constituyen la dirección propuesta del paso 2.

## Línea base SEO y preservación

Títulos de navegador confirmados:

- Inicio, Nosotros, Contacto y Contenido: `Materiales para tus proyectos · Instaler`.
- Productos: `Catálogo · Instaler`.
- Gestión: `Gestión de productos · Instaler`.

El HTML inicial declara `Instaler · Materiales para tus proyectos`; React lo cambia al título de la vista. Se debe registrar esta diferencia, no normalizarla sin aprobación.

Encabezados principales existentes:

- H1 de inicio: `Todo para construir. Todo para avanzar.`
- H2: `Detrás de cada obra, un buen equipo.`
- H2 del catálogo en inicio: `Lo que tu proyecto necesita.`
- H2 del catálogo independiente: `Nuestro catálogo de productos.`. Esa vista no tiene H1 propio actualmente.
- H2: `Razones para elegirnos.`
- H2: `Estamos cerca. Estamos para ayudarte.`
- H3: `Prepará tu consulta`.
- H1 administrativo: `Gestión de productos`.
- Beneficios H3: `Calidad garantizada`, `Asesoramiento técnico`, `Todo para tu obra`, `Atención personalizada`.
- Los nombres de productos aparecen como H3 dinámicos. Los modales tienen H2 contextual y los estados de error/vacío incluyen H3. El inventario de render se conserva en `baseline.json`.

Metadatos: `lang="es-AR"`, UTF-8, viewport, theme-color y descripción del negocio. No se encontraron canonical, Open Graph, Twitter Cards, JSON-LD/datos estructurados, sitemap ni robots.txt en la aplicación inspeccionada. La aplicación depende de JavaScript para renderizar su contenido. No se midieron indexación ni Core Web Vitals ni rendimiento de producción. El repositorio no prueba la existencia de páginas posicionadas.

Anclas a conservar: `#inicio`, `#productos`, `#nosotros`, `#contacto`, `#gestion`, `#contenido`.

Campos de contacto confirmados y en orden: `contacto-nombre`, `contacto-email`, `contacto-consulta`.

Campos de producto confirmados y en orden: `nombre`, `descripcion`, `precio`, `stock`, `activo`.

Copy legal registrado: `© 2026 Instaler. Todos los derechos reservados.`. El año se calcula dinámicamente.

Hay un em dash U+2014 en el estado de carga/error de los indicadores de gestión. Debe revisarse en la implementación aprobada para cumplir el requisito de cero guiones largos. No se detectaron otros em/en dashes en los archivos JS/JSX inspeccionados; eso no sustituye una inspección de todos los estados visibles.

## Comprobaciones de interacción de esta auditoría

- Navegación por los seis hashes: render y títulos registrados.
- API: catálogo muestra Cemento y Arena fina.
- Búsqueda “Cemento”: devuelve únicamente Cemento.
- Ver detalle: abre diálogo con descripción, precio, stock y estado del producto correcto.
- Consultar producto: cambia a `#contacto` y prellena el texto con Cemento y su descripción.
- Nuevo producto: abre formulario con los cinco campos esperados; se cerró sin guardar.
- No hubo excepciones JavaScript capturadas en este recorrido.

No se crearon, editaron ni eliminaron registros. En esta auditoría no se volvió a ejecutar la descarga final ni pruebas exhaustivas de teclado, lector de pantalla, errores de red, todos los estados de carga o preferencias de movimiento. No se presentan esas áreas como verificadas.

## Crítica visual según la referencia de la skill

ROUND 0
Seen in one second: título blanco sobre interior de una tienda de materiales, con CTA naranja.
Idea (one sentence): el comercio ofrece materiales y asesoramiento en un mismo lugar; la composición actual todavía podría pertenecer a otro comercio del rubro al cambiar la marca.
Live thing: buscar materiales reales y trasladar un producto a una consulta prellenada.
Layout words by section: hero=imagen completa / nosotros=dos columnas / productos=grilla / beneficios=fila de íconos / contacto=dos columnas / footer=columnas.
Scores: design 5.5 · usability 7.0 · creativity 4.5 · content 6.0 → overall 5.8.
Caps applied: máximo 6 por FAIL del inspector; imágenes escasas, etiquetas pequeñas y título de cuatro líneas refuerzan los problemas. Es un juicio editorial de la skill, no un ranking externo.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `desktop-page-01.jpg`: arena y cemento comparten caja genérica; requieren identificación visual específica, sin atribuir imágenes ilustrativas a productos exactos.
2. `mobile-fold.jpg` y `tablet-page-01.jpg`: jerarquía fragmentada y saltos de títulos excesivos; se debe recomponer respetando las palabras existentes.
3. `desktop-fold.jpg`: imágenes ampliadas de baja resolución y marca secundaria diminuta; se necesitan recursos adecuados y un refinamiento consistente del logo autorizado.

## Estado del paso 1

Auditoría completada; diseño actual con problemas documentados. No se declara un rediseño terminado ni se aplicaron cambios. Se espera el OK explícito del usuario para redactar la dirección del paso 2. Ese OK no habilita todavía la implementación del paso 3, que tiene su propia aprobación en el brief.
