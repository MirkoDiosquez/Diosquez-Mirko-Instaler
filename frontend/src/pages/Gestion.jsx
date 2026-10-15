import { useState } from "react";
import Button from "../components/Button";
import Icon from "../components/Icon";
import ProductState from "../components/ProductState";
import { filtrarProductos, formatoPrecio } from "../utils/productos";
export default function Gestion({
  productos,
  loading,
  error,
  onRetry,
  onCreate,
  onEdit,
  onDelete,
  onDetails,
  busy,
}) {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("todos");
  const visibles = filtrarProductos(productos, query, estado);
  return (
    <section className="management container">
      <div className="breadcrumbs">
        <a href="#inicio">Inicio</a>
        <span>/</span>Gestión de productos
      </div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">ADMINISTRACIÓN DEL CATÁLOGO</span>
          <h1>Gestión de productos</h1>
          <p>Todos tus materiales, organizados en un solo lugar.</p>
        </div>
        <Button onClick={onCreate} icon="plus" disabled={busy}>
          Nuevo producto
        </Button>
      </div>
      <p className="demo-note">
        Entorno de entrega: gestión sin autenticación. Los datos se guardan en
        memoria y se reinician junto con el backend.
      </p>
      <div className="stats">
        {[
          ["Productos registrados", productos.length],
          ["Activos en el catálogo", productos.filter((p) => p.activo).length],
          ["Sin stock", productos.filter((p) => p.stock === 0).length],
        ].map(([label, count]) => (
          <div key={label}>
            <Icon name="box" size={24} />
            <span>
              {label}
              <strong>{loading || error ? "—" : count}</strong>
            </span>
          </div>
        ))}
      </div>
      <div className="management-panel">
        <div className="catalog-toolbar">
          <label className="search">
            <Icon name="search" />
            <span className="sr-only">Buscar productos</span>
            <input
              type="search"
              placeholder="Buscar por nombre o descripción…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="filter">
            Estado
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="activos">Activos</option>
              <option value="inactivos">Inactivos</option>
            </select>
          </label>
          <Button
            variant="secondary"
            icon="refresh"
            onClick={onRetry}
            disabled={loading || busy}
          >
            Actualizar
          </Button>
        </div>
        <ProductState
          loading={loading}
          error={error}
          empty={!visibles.length}
          onRetry={onRetry}
        />
        {!loading && !error && visibles.length > 0 && (
          <div className="table-scroll">
            <table>
              <caption className="sr-only">
                Productos: nombre, precio, stock, estado y acciones
              </caption>
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <button
                        className="product-name"
                        onClick={() => onDetails(p)}
                      >
                        {p.nombre}
                      </button>
                      <span className="table-description">{p.descripcion}</span>
                    </td>
                    <td>{formatoPrecio(p.precio)}</td>
                    <td>
                      <span className={p.stock === 0 ? "stock-zero" : ""}>
                        {p.stock} unidades
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${p.activo ? "available" : "unavailable"}`}
                      >
                        {p.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          aria-label={`Editar ${p.nombre}`}
                          onClick={() => onEdit(p)}
                          disabled={busy}
                        >
                          <Icon name="edit" />
                        </button>
                        <button
                          className="icon-button danger-text"
                          aria-label={`Eliminar ${p.nombre}`}
                          onClick={() => onDelete(p)}
                          disabled={busy}
                        >
                          <Icon name="trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="table-footer" role="status">
          {!loading && !error
            ? `${visibles.length} de ${productos.length} productos`
            : "Consultando catálogo"}
        </div>
      </div>
    </section>
  );
}
