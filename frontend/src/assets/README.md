# Recursos visuales de Instaler

El rediseño usa cuatro imágenes ilustrativas generadas con la herramienta integrada `image_gen` y optimizadas a WebP. No representan fotografías verificadas del local, personas del negocio, marcas ni productos exactos. Esta condición se indica en el hero, la sección Nosotros y el catálogo.

- `materiales/hero.webp`: composición de arena, bolsa sin marca, acero y caños, 1536 × 1024.
- `materiales/oficio.webp`: herramientas y materiales de obra, 1200 × 800.
- `materiales/cemento.webp`: ilustración de cemento, 1200 × 800.
- `materiales/arena.webp`: ilustración de arena fina, 1200 × 800.

Los prompts finales y la procedencia están registrados en `materiales/procedencia.json`. No se usaron imágenes de terceros ni se agregaron fuentes externas de imágenes. Los originales generados se conservan fuera del repositorio; los archivos consumidos por la aplicación están incluidos aquí.

`materiales/catalogo.js` asocia las imágenes a los materiales disponibles por nombre y no modifica el contrato de la API. Para productos desconocidos, o ante un fallo de carga, se muestra el nombre del producto y “Imagen no disponible”. Las fotografías exactas pueden reemplazar estos recursos más adelante.

La marca se conserva como texto con un símbolo SVG de tres barras en `components/Layout.jsx`, refinado sobre la geometría existente. Las versiones clara y oscura usan el mismo componente; los íconos funcionales se centralizan en `components/Icon.jsx`.

Los recursos históricos `local-interior.jpg` y `local-frente.jpg` proceden del mockup de `Documentacion/instaler.docx`. Se conservaron como referencia del boceto, pero ya no son consumidos por la interfaz.
