import express from "express";
import cors from "cors";
import loginRoutes from "./routes/authRoutes.js"; // Importamos las rutas

const app = express();

// Middlewares
app.use(cors()); // Permitir peticiones entre frontend y backend
app.use(express.json()); // Para procesar JSON en el body

// Rutas
app.use("/api/auth", loginRoutes);

// ✅ Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("¡Bienvenido al servidor de Reservas!");
});

// iniciar el Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
