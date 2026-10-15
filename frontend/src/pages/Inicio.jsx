import Catalogo from "./Catalogo";
import Icon from "../components/Icon";
import frente from "../assets/materiales/oficio.webp";
import hero from "../assets/materiales/hero.webp";
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
        <div className="hero-copy">
          <h1>
            Todo para construir.
            <br />
            Todo para avanzar.
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
            <Icon name="pin" size={20} /> Av. de los Constituyentes 4702 · CABA
          </div>
        </div>
        <figure className="hero-media">
          <img
            src={hero}
            width="1536"
            height="1024"
            fetchPriority="high"
            decoding="async"
            alt="Composición ilustrativa de arena, cemento, barras de acero y caños para construcción"
          />
          <figcaption>
            Materiales que acompañan tu proyecto. Imagen ilustrativa.
          </figcaption>
        </figure>
      </section>
      <section className="about-section" id="nosotros">
        <div className="container about-grid">
          <figure className="about-photo">
            <img
              src={frente}
              alt="Composición ilustrativa de herramientas, ladrillo y materiales de obra"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Tu aliado, de principio a fin. Imagen ilustrativa.
            </figcaption>
          </figure>
          <div>
            <h2>Detrás de cada obra, un buen equipo.</h2>
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
          <h2>Razones para elegirnos.</h2>
          <div className="benefit-grid">
            {benefits.map(([, title, text]) => (
              <article key={title}>
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
