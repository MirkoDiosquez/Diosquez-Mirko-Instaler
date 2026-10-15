const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new Error(
      "No pudimos conectar con el servidor. Verificá que el backend esté encendido y volvé a intentar.",
    );
  }
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(
      "El servidor devolvió una respuesta inesperada. Volvé a intentar.",
    );
  }
  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        `No se pudo completar la operación (${response.status}).`,
    );
  }
  return result.data;
}

export const getProductos = () => request("/productos");
export const getProducto = (id) => request(`/productos/${id}`);
export const crearProducto = (data) =>
  request("/productos", { method: "POST", body: JSON.stringify(data) });
export const actualizarProducto = (id, data) =>
  request(`/productos/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const eliminarProducto = (id) =>
  request(`/productos/${id}`, { method: "DELETE" });
