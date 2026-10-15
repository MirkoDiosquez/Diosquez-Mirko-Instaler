class Producto {
    constructor(id, nombre, descripcion, precio, stock, activo = true) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.activo = activo;
    }
}

export default Producto;
