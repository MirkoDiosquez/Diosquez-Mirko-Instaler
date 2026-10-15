import { useState } from "react";
import Button from "./Button";
import Field from "./Field";
import { validarProducto } from "../utils/productos";
export default function ProductForm({ producto, onSubmit, onCancel, busy }) {
  const [values, setValues] = useState(
    producto
      ? { ...producto }
      : { nombre: "", descripcion: "", precio: "", stock: "", activo: true },
  );
  const [errors, setErrors] = useState({});
  const change = (event) => {
    const { name, value, checked, type } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validarProducto(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    onSubmit({
      nombre: values.nombre.trim(),
      descripcion: values.descripcion.trim(),
      precio: Number(values.precio),
      stock: Number(values.stock),
      activo: values.activo,
    });
  };
  return (
    <form onSubmit={submit} noValidate aria-busy={busy}>
      <p className="muted form-intro">
        Completá los datos del material. Los campos con * son obligatorios.
      </p>
      <fieldset disabled={busy}>
        <Field
          label="Nombre"
          name="nombre"
          required
          value={values.nombre}
          onChange={change}
          error={errors.nombre}
          autoFocus
        />
        <Field
          label="Descripción"
          name="descripcion"
          multiline
          rows={3}
          required
          value={values.descripcion}
          onChange={change}
          error={errors.descripcion}
        />
        <div className="form-row">
          <Field
            label="Precio (ARS)"
            name="precio"
            type="number"
            min="0.01"
            step="any"
            required
            value={values.precio}
            onChange={change}
            error={errors.precio}
          />
          <Field
            label="Stock (unidades)"
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            value={values.stock}
            onChange={change}
            error={errors.stock}
          />
        </div>
        <label className="checkbox">
          <input
            type="checkbox"
            name="activo"
            checked={values.activo}
            onChange={change}
          />
          Producto activo en el catálogo
        </label>
      </fieldset>
      <div className="modal-actions">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={busy}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={busy}>
          {busy
            ? "Guardando…"
            : producto
              ? "Guardar cambios"
              : "Crear producto"}
        </Button>
      </div>
    </form>
  );
}
