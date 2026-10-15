import { useEffect, useState } from "react";
import Field from "../components/Field";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useNotifications } from "../components/Notifications";
export default function Contacto({ selected }) {
  const notify = useNotifications();
  const [values, setValues] = useState({ nombre: "", email: "", consulta: "" });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (selected)
      setValues((prev) => ({
        ...prev,
        consulta: `Hola, quisiera consultar por ${selected.nombre} (${selected.descripcion}).\nCantidad: `,
      }));
  }, [selected]);
  const change = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({
      ...prev,
      [`contacto-${e.target.name}`]: undefined,
    }));
  };
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.nombre.trim()) next["contacto-nombre"] = "Ingresá tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next["contacto-email"] = "Ingresá un email válido.";
    if (!values.consulta.trim())
      next["contacto-consulta"] = "Contanos qué necesitás.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    const file = new Blob(
      [
        `CONSULTA PARA INSTALER\nNombre: ${values.nombre.trim()}\nEmail: ${values.email.trim()}\n\n${values.consulta.trim()}\n\nEste documento no fue enviado al negocio.`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "consulta-instaler.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify(
      "Consulta preparada para descargar. Todavía no fue enviada: acercala al local para recibir asesoramiento.",
    );
  };
  return (
    <section className="contact-section" id="contacto">
      <div className="container contact-grid">
        <div>
          <h2>Estamos cerca. Estamos para ayudarte.</h2>
          <p className="muted">
            Traé tu idea, tus dudas o tu lista de materiales.
            <br />
            Juntos encontramos lo que necesitás.
          </p>
          <div className="contact-line">
            <Icon name="pin" size={24} />
            <div>
              <strong>Visitanos en el local</strong>
              <p>
                Av. de los Constituyentes 4702
                <br />
                CABA, Argentina
              </p>
              <a
                className="text-button"
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/maps/search/?api=1&query=Av.+de+los+Constituyentes+4702+CABA"
              >
                Cómo llegar ↗
              </a>
            </div>
          </div>
          <div className="contact-line">
            <Icon name="clock" size={24} />
            <div>
              <strong>Horarios de atención</strong>
              <p>
                Lunes a viernes · 08:00 a 18:00
                <br />
                Sábados · 08:00 a 13:00
              </p>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit} noValidate>
          <h3>Prepará tu consulta</h3>
          <p className="muted">
            Completá tus datos y descargá el detalle para acercarlo al local.
          </p>
          <div className="form-row">
            <Field
              label="Nombre"
              name="contacto-nombre"
              autoComplete="name"
              required
              value={values.nombre}
              onChange={(e) =>
                change({ target: { name: "nombre", value: e.target.value } })
              }
              error={errors["contacto-nombre"]}
            />
            <Field
              label="Email"
              name="contacto-email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) =>
                change({ target: { name: "email", value: e.target.value } })
              }
              error={errors["contacto-email"]}
            />
          </div>
          <Field
            label="¿En qué podemos ayudarte?"
            name="contacto-consulta"
            multiline
            rows={4}
            required
            placeholder="Contanos qué materiales necesitás…"
            value={values.consulta}
            onChange={(e) =>
              change({ target: { name: "consulta", value: e.target.value } })
            }
            error={errors["contacto-consulta"]}
          />
          <Button type="submit" icon="arrow">
            Descargar consulta
          </Button>
          <small>
            El envío de consultas estará disponible cuando se integre su API.
            Este formulario no envía tus datos.
          </small>
        </form>
      </div>
    </section>
  );
}
