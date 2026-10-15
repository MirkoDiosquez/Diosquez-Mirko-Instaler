import Icon from "./Icon";
import { formatoPrecio } from "../utils/productos";
export default function ProductCard({ producto, onDetails, onConsult }) {
  return (
    <article className="product-card">
      <div className="product-visual">
        <span className="material-label">INSTALER / MATERIALES</span>
        <Icon name="box" size={78} />
        <span
          className={`badge ${producto.stock > 0 ? "available" : "unavailable"}`}
        >
          {producto.stock > 0 ? "En stock" : "Sin stock"}
        </span>
      </div>
      <div className="product-content">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <div className="price">
          {formatoPrecio(producto.precio)}
          <span> por unidad</span>
        </div>
        <div className="card-actions">
          <button className="text-button" onClick={() => onDetails(producto)}>
            Ver detalle <Icon name="arrow" size={16} />
          </button>
          <button
            className="text-button"
            disabled={producto.stock <= 0}
            onClick={() => onConsult(producto)}
          >
            Consultar
          </button>
        </div>
      </div>
    </article>
  );
}
