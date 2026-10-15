import Icon from "./Icon";
import Button from "./Button";
export default function ProductState({ loading, error, onRetry, empty }) {
  if (loading)
    return (
      <div className="state" role="status">
        <span className="spinner" />
        Cargando productos…
      </div>
    );
  if (error)
    return (
      <div className="state" role="alert">
        <Icon name="box" size={36} />
        <h3>No pudimos cargar los productos</h3>
        <p>{error}</p>
        <Button variant="secondary" onClick={onRetry} icon="refresh">
          Volver a intentar
        </Button>
      </div>
    );
  if (empty)
    return (
      <div className="state">
        <Icon name="box" size={36} />
        <h3>No hay productos para mostrar</h3>
        <p>Probá otra búsqueda o agregá un producto desde Gestión.</p>
      </div>
    );
  return null;
}
