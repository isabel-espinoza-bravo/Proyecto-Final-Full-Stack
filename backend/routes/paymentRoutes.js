import express from "express";
import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// 🔹 Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
});

// 🔹 Crear preferencia de pago
router.post("/create_preference", async (req, res) => {
  try {
    const { items } = req.body;

    console.log("🧾 req.body recibido:", req.body);

    // Validación básica
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No se recibieron productos para el pago." });
    }

    // 🧩 Construir la preferencia correctamente
    const preference = {
      items: items.map((item) => ({
        title: item.nombre || "Producto sin nombre",
        picture_url: `http://localhost:5173${item.imagen || ""}`,
        unit_price: Number(item.precio) || 0, // ✅ asegurar número
        quantity: parseInt(item.personas) || 1, // ✅ asegurar entero
        currency_id: "CLP",
      })),
      
        back_urls: {
        success: "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/success",
        failure: "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/failure",
        pending: "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/pending",
      },

     
      auto_return: "approved",
      binary_mode: false,
      statement_descriptor: "TravelEcommerce",
    };

    console.log("📦 Enviando preferencia a Mercado Pago:", preference);

    // Crear la preferencia en Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    console.log("✅ Preferencia creada correctamente:", response.body.id);

    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("❌ Error al crear preferencia:", error);
    return res.status(500).json({
      message: "Error interno al crear preferencia",
      detalles: error.message,
    });
  }
});

export default router;

