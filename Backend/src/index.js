import Usuario from "./models/Usuario.js";
import Producto from "./models/Producto.js";
import SolicitudPresupuesto from "./models/SolicitudPresupuesto.js";
import DetalleSolicitud from "./models/DetalleSolicitud.js";

const usuario = new Usuario(1, "Mirko", "mirko@mail.com", "1234", "Cliente");
const producto = new Producto(1, "Cemento", "Bolsa x 50kg", 8500, 100, true);
const solicitud = new SolicitudPresupuesto(1, "2026-09-14", "Pendiente", usuario.id);
const detalle = new DetalleSolicitud(1, solicitud.id, producto.id, 3, producto.precio);

console.log("Modelos creados correctamente:");
console.log({ usuario, producto, solicitud, detalle });
