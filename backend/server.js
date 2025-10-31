import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // 👈 ESTA IMPORTACIÓN

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 RUTA DE PAGOS
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🌍 Servidor activo en puerto ${PORT}`));

