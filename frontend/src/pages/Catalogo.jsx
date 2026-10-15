import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductState from "../components/ProductState";
import Icon from "../components/Icon";
import { filtrarProductos } from "../utils/productos";
export default function Catalogo({
  productos,
  loading,
  error,
  onRetry,
  onDetails,
  onConsult,
  compact = false,
}) {
  const [query, setQuery] = useState("");
  const visibles = filtrarProductos(
    productos.filter((p) => p.activo),
    query,
  );
  return (
    <section className="catalog-section" id="productos">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MATERIALES PARA CADA ETAPA</span>
            <h2>
              {compact
                ? "Lo que tu proyecto necesita."
                : "Nuestro catálogo de productos."}
            </h2>
            <p>
              Encontrá materiales de calidad y consultanos por tu próxima obra.
            </p>
          </div>
          {compact && (
            <a className="text-button" href="#productos">
              Explorar catálogo <Icon name="arrow" />
            </a>
          )}
        </div>
        <div className="catalog-toolbar">
          <label className="search">
            <Icon name="search" />
            <span className="sr-only">
              Buscar productos por nombre o descripción
            </span>
            <input
              type="search"
              placeholder="¿Qué material estás buscando?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <span className="muted" role="status">
            {loading
              ? "Cargando…"
              : `${visibles.length} producto${visibles.length === 1 ? "" : "s"} disponible${visibles.length === 1 ? "" : "s"}`}
          </span>
        </div>
        <ProductState
          loading={loading}
          error={error}
          onRetry={onRetry}
          empty={!visibles.length}
        />
        {!loading && !error && (
          <div className="product-grid">
            {visibles.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onDetails={onDetails}
                onConsult={onConsult}
              />
            ))}
          </div>
        )}
        <div className="catalog-note">
          <Icon name="people" />
          <p>
            <strong>¿No encontrás lo que necesitás?</strong> Acercate al local y
            te ayudamos a elegir la mejor solución.
          </p>
          <a href="#contacto">
            Contactanos <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
