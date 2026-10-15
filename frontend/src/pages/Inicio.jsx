import Catalogo from "./Catalogo";
import Icon from "../components/Icon";
import frente from "../assets/local-frente.jpg";
const benefits = [
  [
    "shield",
    "Calidad garantizada",
    "Materiales confiables para proyectos que duran.",
  ],
  [
    "tools",
    "Asesoramiento técnico",
    "Te ayudamos a elegir la solución adecuada.",
  ],
  ["box", "Todo para tu obra", "Construcción, instalaciones y mantenimiento."],
  [
    "people",
    "Atención personalizada",
    "Nos involucramos en cada uno de tus proyectos.",
  ],
];
export default function Inicio(props) {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-eyebrow">
            <span /> TU OBRA, EN BUENAS MANOS
          </span>
          <h1>
            Todo para construir.
            <br />
            Todo para <em>avanzar.</em>
          </h1>
          <p>
            Materiales para instalaciones, construcción y mantenimiento. El
            respaldo que tu proyecto necesita, en un solo lugar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#productos">
              Explorar productos <Icon name="arrow" />
            </a>
            <a className="hero-secondary" href="#contacto">
              Consultar presupuesto ↗
            </a>
          </div>
          <div className="hero-caption">
            <Icon name="pin" size={16} /> Av. de los Constituyentes 4702 · CABA
          </div>
        </div>
        <div className="hero-stamp">
          <Icon name="shield" size={28} />
          <span>
            MATERIALES DE CALIDAD
            <br />
            <strong>Confianza en cada proyecto.</strong>
          </span>
        </div>
      </section>
      <section className="about-section" id="nosotros">
        <div className="container about-grid">
          <div className="about-photo">
            <img
              src={frente}
              alt="Frente del local Instaler, con su fachada azul y acceso a la tienda"
            />
            <span>Tu aliado, de principio a fin.</span>
          </div>
          <div>
            <span className="eyebrow">SOMOS INSTALER</span>
            <h2>
              Detrás de cada obra,
              <br />
              un buen equipo.
            </h2>
            <p>
              Somos un comercio dedicado a la venta de materiales y soluciones
              para instalaciones, construcción y mantenimiento edilicio.
            </p>
            <p>
              Creemos que un buen proyecto empieza con una buena elección. Por
              eso combinamos productos de calidad con asesoramiento técnico y
              una atención cercana, para profesionales y particulares.
            </p>
            <a className="text-button" href="#contacto">
              Conocé dónde encontrarnos <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>
      <Catalogo {...props} compact />
      <section className="benefits">
        <div className="container">
          <span className="eyebrow">MÁS QUE MATERIALES</span>
          <h2>Razones para elegirnos.</h2>
          <div className="benefit-grid">
            {benefits.map(([icon, title, text]) => (
              <article key={title}>
                <Icon name={icon} size={33} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
