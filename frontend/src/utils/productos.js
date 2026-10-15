export const formatoPrecio = (value) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);

export function validarProducto(values) {
  const errors = {};
  if (!values.nombre.trim()) errors.nombre = "Ingresá el nombre del producto.";
  if (!values.descripcion.trim())
    errors.descripcion = "Ingresá una descripción.";
  if (
    values.precio === "" ||
    !Number.isFinite(Number(values.precio)) ||
    Number(values.precio) <= 0
  )
    errors.precio = "El precio debe ser un número mayor que cero.";
  if (
    String(values.stock).trim() === "" ||
    !Number.isInteger(Number(values.stock)) ||
    Number(values.stock) < 0
  )
    errors.stock = "El stock debe ser un número entero igual o mayor que cero.";
  return errors;
}

export function filtrarProductos(productos, busqueda, estado = "todos") {
  const query = busqueda.trim().toLocaleLowerCase("es-AR");
  return productos.filter(
    (p) =>
      `${p.nombre} ${p.descripcion}`
        .toLocaleLowerCase("es-AR")
        .includes(query) &&
      (estado === "todos" || (estado === "activos" ? p.activo : !p.activo)),
  );
}
