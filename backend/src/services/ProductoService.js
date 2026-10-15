import productoRepository from "../repositories/ProductoRepository.js";
import { Messages } from "../enums/Messages.js";
import { BadRequestError, NotFoundError, ConflictError } from "../exceptions/AppError.js";
import { isNonEmptyString, isPositiveNumber, isNonNegativeInteger } from "../utils/validators.js";

class ProductoService {
    obtenerTodos() {
        return productoRepository.findAll();
    }

    obtenerPorId(id) {
        const idNumerico = this.#validarId(id);
        const producto = productoRepository.findById(idNumerico);
        if (!producto) {
            throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
        }
        return producto;
    }

    crear(datos) {
        this.#validarDatos(datos);
        if (productoRepository.findByNombre(datos.nombre)) {
            throw new ConflictError(Messages.DUPLICATED_RESOURCE);
        }
        return productoRepository.create(datos);
    }

    actualizar(id, datos) {
        const producto = this.obtenerPorId(id);
        this.#validarDatos(datos);

        const existente = productoRepository.findByNombre(datos.nombre);
        if (existente && existente.id !== producto.id) {
            throw new ConflictError(Messages.DUPLICATED_RESOURCE);
        }

        return productoRepository.update(producto.id, {
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            precio: datos.precio,
            stock: datos.stock,
            activo: datos.activo ?? producto.activo
        });
    }

    eliminar(id) {
        const producto = this.obtenerPorId(id);
        productoRepository.delete(producto.id);
    }

    #validarId(id) {
        const idNumerico = Number(id);
        if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
            throw new BadRequestError(Messages.INVALID_ID);
        }
        return idNumerico;
    }

    #validarDatos(datos) {
        if (
            !datos ||
            !isNonEmptyString(datos.nombre) ||
            !isNonEmptyString(datos.descripcion) ||
            !isPositiveNumber(datos.precio) ||
            !isNonNegativeInteger(datos.stock)
        ) {
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
}

export default new ProductoService();
