import cemento from "./cemento.webp";
import arena from "./arena.webp";

// Recursos ilustrativos del material, independientes del contrato de la API.
// No se infieren imágenes para productos desconocidos.
const recursos = [
  {
    match: /\bcemento\b/i,
    src: cemento,
    alt: "Ilustración de una bolsa sin marca y polvo de cemento gris",
  },
  {
    match: /\barena\b/i,
    src: arena,
    alt: "Ilustración de arena fina de construcción y una pala de mano",
  },
];

export function imagenProducto(nombre) {
  return recursos.find((recurso) => recurso.match.test(nombre)) || null;
}
