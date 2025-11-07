import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB(); // 👈 conexión a MongoDB centralizada

const app = express();

// 🧩 Middlewares base
app.use(cors());
app.use(express.json());

// 🧭 Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// 🌍 Ruta base de prueba
app.get("/", (req, res) => res.send("API funcionando correctamente 🌍"));

// 🛠️ (Opcional) ver las rutas activas para debug
// console.log(app._router.stack.map(r => r.route && r.route.path).filter(Boolean));

// 🚀 Inicializar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

