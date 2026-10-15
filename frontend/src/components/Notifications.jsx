import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "./Icon";
const Context = createContext(null);
export const useNotifications = () => useContext(Context);
export default function Notifications({ children }) {
  const [items, setItems] = useState([]);
  const timers = useRef([]);
  const dismiss = useCallback(
    (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
    [],
  );
  const notify = useCallback(
    (message, type = "success") => {
      const id = crypto.randomUUID();
      setItems((prev) => [...prev, { id, message, type }]);
      timers.current.push(
        setTimeout(() => dismiss(id), type === "error" ? 12000 : 6500),
      );
    },
    [dismiss],
  );
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return (
    <Context.Provider value={notify}>
      {children}
      <div className="notifications" aria-label="Notificaciones">
        {items.map((item) => (
          <div
            key={item.id}
            className={`notification ${item.type}`}
            role={item.type === "error" ? "alert" : "status"}
          >
            <Icon name={item.type === "error" ? "close" : "check"} />
            <span>{item.message}</span>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Cerrar notificación"
            >
              <Icon name="close" size={17} />
            </button>
          </div>
        ))}
      </div>
    </Context.Provider>
  );
}
