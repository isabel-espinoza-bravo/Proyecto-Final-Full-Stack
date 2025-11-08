import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware base
app.use(express.json());

// ✅ Configuración CORS para desarrollo y Render
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Frontend local
      "https://travel-ecommerce-viajes-con-isa-kvb2.onrender.com", // Frontend en Render
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Permitir métodos usados
    allowedHeaders: ["Content-Type", "Authorization"], // Permitir headers de JWT
    credentials: true,
  })
);

// ✅ Ruta raíz (para test rápido)
app.get("/", (req, res) => {
  res.send("🌸 API Travel Ecommerce funcionando correctamente en Render!");
});

// ✅ Rutas principales
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Puerto dinámico (Render asigna uno automáticamente)
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});



