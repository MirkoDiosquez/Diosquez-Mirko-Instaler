import Producto from "../models/Producto.js";

class ProductoRepository {
    constructor() {
        this.productos = [
            new Producto(1, "Cemento", "Bolsa x 50kg", 8500, 100, true),
            new Producto(2, "Arena fina", "Bolsa x 25kg", 3200, 200, true)
        ];
        this.nextId = 3;
    }

    findAll() {
        return this.productos;
    }

    findById(id) {
        return this.productos.find((p) => p.id === id) ?? null;
    }

    findByNombre(nombre) {
        return this.productos.find(
            (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
        ) ?? null;
    }

    create({ nombre, descripcion, precio, stock, activo = true }) {
        const producto = new Producto(this.nextId++, nombre, descripcion, precio, stock, activo);
        this.productos.push(producto);
        return producto;
    }

    update(id, datos) {
        const producto = this.findById(id);
        if (!producto) return null;
        Object.assign(producto, datos);
        return producto;
    }

    delete(id) {
        const index = this.productos.findIndex((p) => p.id === id);
        if (index === -1) return false;
        this.productos.splice(index, 1);
        return true;
    }
}

export default new ProductoRepository();
