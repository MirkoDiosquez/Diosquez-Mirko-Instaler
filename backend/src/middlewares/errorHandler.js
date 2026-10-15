import AppError from "../exceptions/AppError.js";
import ApiResponse from "../responses/ApiResponse.js";
import { Messages } from "../enums/Messages.js";

export function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(ApiResponse.error(err.message));
    }

    console.error(err);
    return res.status(500).json(ApiResponse.error(Messages.INTERNAL_ERROR));
}

export function notFoundHandler(req, res) {
    res.status(404).json(ApiResponse.error(Messages.ROUTE_NOT_FOUND));
}
