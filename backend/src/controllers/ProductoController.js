import productoService from "../services/ProductoService.js";
import ApiResponse from "../responses/ApiResponse.js";

class ProductoController {
    obtenerTodos(req, res, next) {
        try {
            const productos = productoService.obtenerTodos();
            res.status(200).json(ApiResponse.success(productos));
        } catch (error) {
            next(error);
        }
    }

    obtenerPorId(req, res, next) {
        try {
            const producto = productoService.obtenerPorId(req.params.id);
            res.status(200).json(ApiResponse.success(producto));
        } catch (error) {
            next(error);
        }
    }

    crear(req, res, next) {
        try {
            const producto = productoService.crear(req.body);
            res.status(201).json(ApiResponse.success(producto));
        } catch (error) {
            next(error);
        }
    }

    actualizar(req, res, next) {
        try {
            const producto = productoService.actualizar(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(producto));
        } catch (error) {
            next(error);
        }
    }

    eliminar(req, res, next) {
        try {
            productoService.eliminar(req.params.id);
            res.status(200).json(ApiResponse.success(null));
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductoController();
