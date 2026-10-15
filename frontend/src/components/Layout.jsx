import Icon from "./Icon";
export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Instaler, ir al inicio">
      <svg
        className="brand-symbol"
        viewBox="0 0 48 56"
        width="48"
        height="56"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="brand-pillar"
          d="M2 23 14 16v36L2 55V23ZM18 9 30 2v47l-12 3V9Z"
        />
        <path className="brand-accent" d="m34 17 12 7v31l-12-6V17Z" />
      </svg>
      <span>
        <strong>
          INSTA<span>LER</span>
        </strong>
        <small>CONSTRUIMOS CON VOS</small>
      </span>
    </a>
  );
}
export default function Layout({ children, page }) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="header">
      <div className="topbar">
        <div className="container">
          <span>Materiales, soluciones y asesoramiento técnico.</span>
          <span>
            <Icon name="pin" size={13} /> Villa Pueyrredón, CABA
          </span>
        </div>
      </div>
        <div className="container header-content">
          <Brand />
          <nav aria-label="Navegación principal">
            <a
              href="#inicio"
              aria-current={page === "inicio" ? "page" : undefined}
            >
              Inicio
            </a>
            <a
              href="#productos"
              aria-current={page === "productos" ? "page" : undefined}
            >
              Productos
            </a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
            <a
              className="management-link"
              href="#gestion"
              aria-current={page === "gestion" ? "page" : undefined}
            >
              <Icon name="box" size={16} /> Gestión
            </a>
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="container footer-main">
          <div>
            <Brand />
            <p>
              Materiales para construcción,
              <br />
              instalaciones y mantenimiento.
            </p>
          </div>
          <div>
            <strong>Encontranos</strong>
            <p>
              Av. de los Constituyentes 4702
              <br />
              CABA, Argentina
            </p>
          </div>
          <div>
            <strong>Horarios de atención</strong>
            <p>
              Lunes a viernes · 08:00 a 18:00
              <br />
              Sábados · 08:00 a 13:00
            </p>
          </div>
          <a href="#inicio" className="footer-back">
            Volver al inicio ↑
          </a>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Instaler. Todos los derechos
            reservados.
          </span>
          <span>Tu proyecto empieza acá.</span>
        </div>
      </footer>
    </>
  );
}
