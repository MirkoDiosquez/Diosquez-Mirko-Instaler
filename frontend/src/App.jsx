import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import Button from "./components/Button";
import ProductForm from "./components/ProductForm";
import { useNotifications } from "./components/Notifications";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Contacto from "./pages/Contacto";
import Gestion from "./pages/Gestion";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./services/productos";
import { formatoPrecio } from "./utils/productos";

const getPage = () => {
  const hash = window.location.hash.slice(1);
  return ["productos", "gestion"].includes(hash) ? hash : "inicio";
};
export default function App() {
  const [page, setPage] = useState(getPage);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState(null);
  const requestId = useRef(0);
  const saving = useRef(false);
  const notify = useNotifications();
  const load = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    setError("");
    try {
      const data = await getProductos();
      if (id === requestId.current) setProductos(data);
    } catch (err) {
      if (id === requestId.current) {
        setError(err.message);
        notify(err.message, "error");
      }
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [notify]);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    const navigate = () => {
      setPage(getPage());
      const section = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        if (["nosotros", "contacto"].includes(section))
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: "smooth" });
        else {
          window.scrollTo({ top: 0 });
          document.getElementById("contenido")?.focus({ preventScroll: true });
        }
      });
    };
    window.addEventListener("hashchange", navigate);
    if (["nosotros", "contacto"].includes(window.location.hash.slice(1)))
      navigate();
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  useEffect(() => {
    document.title = `${page === "gestion" ? "Gestión de productos" : page === "productos" ? "Catálogo" : "Materiales para tus proyectos"} · Instaler`;
  }, [page]);
  const consult = (producto) => {
    setSelected({ ...producto });
    setModal(null);
    window.location.hash = "contacto";
  };
  const save = async (values) => {
    if (saving.current) return;
    saving.current = true;
    setBusy(true);
    try {
      const editing = modal.type === "edit";
      const result = editing
        ? await actualizarProducto(modal.producto.id, values)
        : await crearProducto(values);
      setProductos((prev) =>
        editing
          ? prev.map((p) => (p.id === result.id ? result : p))
          : [...prev, result],
      );
      setModal(null);
      notify(
        editing
          ? "Producto actualizado correctamente."
          : "Producto creado correctamente.",
      );
    } catch (err) {
      notify(err.message, "error");
    } finally {
      saving.current = false;
      setBusy(false);
    }
  };
  const remove = async () => {
    if (saving.current) return;
    saving.current = true;
    setBusy(true);
    try {
      await eliminarProducto(modal.producto.id);
      setProductos((prev) => prev.filter((p) => p.id !== modal.producto.id));
      setModal(null);
      notify("Producto eliminado correctamente.");
    } catch (err) {
      notify(err.message, "error");
    } finally {
      saving.current = false;
      setBusy(false);
    }
  };
  const shared = {
    productos,
    loading,
    error,
    onRetry: load,
    onDetails: (producto) => setModal({ type: "detail", producto }),
    onConsult: consult,
  };
  return (
    <Layout page={page}>
      <main id="contenido" tabIndex={-1}>
        {page === "inicio" && <Inicio {...shared} />}
        {page === "productos" && (
          <div className="catalog-page">
            <div className="container breadcrumbs">
              <a href="#inicio">Inicio</a>
              <span>/</span>Productos
            </div>
            <Catalogo {...shared} />
          </div>
        )}
        {page === "gestion" && (
          <Gestion
            {...shared}
            busy={busy}
            onCreate={() => setModal({ type: "create" })}
            onEdit={(producto) => setModal({ type: "edit", producto })}
            onDelete={(producto) => setModal({ type: "delete", producto })}
          />
        )}
        {page !== "gestion" && <Contacto selected={selected} />}
      </main>
      {modal && (
        <Modal
          title={
            modal.type === "create"
              ? "Nuevo producto"
              : modal.type === "edit"
                ? "Editar producto"
                : modal.type === "delete"
                  ? "¿Eliminar este producto?"
                  : modal.producto.nombre
          }
          busy={busy}
          onClose={() => setModal(null)}
        >
          {["create", "edit"].includes(modal.type) && (
            <ProductForm
              producto={modal.producto}
              busy={busy}
              onSubmit={save}
              onCancel={() => setModal(null)}
            />
          )}
          {modal.type === "delete" && (
            <>
              <p>
                Vas a eliminar <strong>{modal.producto.nombre}</strong> del
                catálogo. Esta acción no se puede deshacer.
              </p>
              <div className="modal-actions">
                <Button
                  variant="secondary"
                  onClick={() => setModal(null)}
                  disabled={busy}
                >
                  Cancelar
                </Button>
                <Button variant="danger" onClick={remove} disabled={busy}>
                  {busy ? "Eliminando…" : "Sí, eliminar producto"}
                </Button>
              </div>
            </>
          )}
          {modal.type === "detail" && (
            <>
              <p className="detail-description">{modal.producto.descripcion}</p>
              <dl className="detail-list">
                <div>
                  <dt>Precio por unidad</dt>
                  <dd>{formatoPrecio(modal.producto.precio)}</dd>
                </div>
                <div>
                  <dt>Stock disponible</dt>
                  <dd>{modal.producto.stock} unidades</dd>
                </div>
                <div>
                  <dt>Estado</dt>
                  <dd>{modal.producto.activo ? "Activo" : "Inactivo"}</dd>
                </div>
              </dl>
              <div className="modal-actions">
                <Button variant="secondary" onClick={() => setModal(null)}>
                  Cerrar
                </Button>
                {modal.producto.activo && (
                  <Button
                    onClick={() => consult(modal.producto)}
                    disabled={modal.producto.stock <= 0}
                  >
                    Consultar producto
                  </Button>
                )}
              </div>
            </>
          )}
        </Modal>
      )}
    </Layout>
  );
}
