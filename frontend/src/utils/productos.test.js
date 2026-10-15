import { test } from "node:test";
import assert from "node:assert/strict";
import { validarProducto, filtrarProductos } from "./productos.js";
const valido = {
  nombre: "Cemento",
  descripcion: "Bolsa 50 kg",
  precio: "8500.50",
  stock: "0",
};
test("acepta precio decimal y stock cero", () =>
  assert.deepEqual(validarProducto(valido), {}));
test("rechaza campos vacíos, precios no finitos y stock fraccionario o negativo", () => {
  assert.equal(
    Object.keys(
      validarProducto({
        nombre: " ",
        descripcion: "",
        precio: "Infinity",
        stock: "1.5",
      }),
    ).length,
    4,
  );
  for (const stock of ["", "-1", "NaN"])
    assert.ok(validarProducto({ ...valido, stock }).stock);
  for (const precio of ["", "0", "-1", "NaN"])
    assert.ok(validarProducto({ ...valido, precio }).precio);
});
test("combina búsqueda por descripción y estado sin modificar los datos", () => {
  const productos = [
    { nombre: "Cemento", descripcion: "Bolsa 50kg", activo: true },
    { nombre: "Arena", descripcion: "Bolsa 25kg", activo: false },
  ];
  assert.equal(filtrarProductos(productos, " BOLSA ").length, 2);
  assert.deepEqual(filtrarProductos(productos, "bolsa", "activos"), [
    productos[0],
  ]);
  assert.deepEqual(filtrarProductos(productos, "arena", "activos"), []);
  assert.equal(productos.length, 2);
});
