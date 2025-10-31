// backend/routes/paymentRoutes.js
import express from "express";
import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// Crear una preferencia de pago
router.post("/create_preference", async (req, res) => {
  try {
    const { items, email } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No se recibieron productos válidos." });
    }

    const preference = {
      items: items.map((i) => ({
        title: i.titulo,
        quantity: Number(i.cantidad || 1),
        unit_price: Number(i.precio),
        currency_id: "CLP",
      })),
      payer: {
        email: email || "cliente@demo.com",
      },
      back_urls: {
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending",
      },
      auto_return: "approved",
    };

    const resp = await mercadopago.preferences.create(preference);

    return res.json({
      init_point: resp.body.init_point || resp.body.sandbox_init_point,
    });
  } catch (error) {
    console.error("❌ Error creando preferencia:", error.response?.body || error.message);
    res.status(500).json({ message: "Error al crear preferencia de pago" });
  }
});

export default router;










