import { useState } from "react";
import Icon from "./Icon";
import { formatoPrecio } from "../utils/productos";
import { imagenProducto } from "../assets/materiales/catalogo";

export default function ProductCard({ producto, onDetails, onConsult }) {
  const imagen = imagenProducto(producto.nombre);
  const [failedImage, setFailedImage] = useState(null);
  const hasImage = imagen && failedImage !== imagen.src;
  return (
    <article className="product-card">
      <div className="product-visual">
        {hasImage ? (
          <img
            src={imagen.src}
            alt={imagen.alt}
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            onError={() => setFailedImage(imagen.src)}
          />
        ) : (
          <div className="product-no-image">
            <span>{producto.nombre}</span>
            <p>Imagen no disponible</p>
          </div>
        )}
      </div>
      <div className="product-content">
        <div className="product-title-row">
          <h3>{producto.nombre}</h3>
          <span
            className={`badge ${producto.stock > 0 ? "available" : "unavailable"}`}
          >
            {producto.stock > 0 ? "En stock" : "Sin stock"}
          </span>
        </div>
        <p>{producto.descripcion}</p>
        <div className="price">
          {formatoPrecio(producto.precio)}
          <span> por unidad</span>
        </div>
        <div className="card-actions">
          <button className="text-button" onClick={() => onDetails(producto)}>
            Ver detalle <Icon name="arrow" size={18} />
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
