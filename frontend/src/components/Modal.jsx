import { useEffect, useRef } from "react";
import Icon from "./Icon";
export default function Modal({ title, children, onClose, busy = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current && !busy) onClose();
      }}
    >
      <div className="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          disabled={busy}
          aria-label="Cerrar ventana"
        >
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
