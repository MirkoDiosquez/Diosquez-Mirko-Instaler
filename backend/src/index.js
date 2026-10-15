import express from "express";
import productoRoutes from "./routes/producto.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            nombre: "API Instaler",
            endpoints: {
                productos: "/api/productos"
            }
        }
    });
});

app.use("/api/productos", productoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor Instaler escuchando en http://localhost:${PORT}`);
});

export default app;
