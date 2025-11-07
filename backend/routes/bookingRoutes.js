import express from "express";
import Booking from "../models/Booking.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =====================================================
   🔒 RUTAS PRIVADAS (requieren token JWT)
   ===================================================== */

/**
 * ✅ Crear nueva reserva (usuario autenticado)
 * POST /api/bookings/nueva
 */
router.post("/nueva", protect, async (req, res) => {
  try {
    const {
      destino,
      fechaInicio,
      fechaFin,
      personas,
      precioTotal,
      total,
      codigoReserva,
      usuarioEmail,
    } = req.body;

    // ✅ Confirmar email: desde token, body o valor por defecto
    const emailFinal = req.user?.email || usuarioEmail || "sin-email@viajesisa.cl";

    console.log("💾 Creando reserva con:", {
      email: emailFinal,
      destino,
      fechaInicio,
      personas,
      precioTotal,
    });

    const nuevaReserva = await Booking.create({
      user: req.user?._id || null,
      usuarioEmail: emailFinal,
      destino,
      fechaInicio,
      fechaFin: fechaFin || null,
      personas: Number(personas) || 1,
      precioTotal: Number(precioTotal || total || 0),
      codigoReserva:
        codigoReserva ||
        Math.random().toString(36).substring(2, 10).toUpperCase(),
      estado: "Confirmada",
    });

    res.status(201).json({
      message: "Reserva creada exitosamente",
      reserva: nuevaReserva,
    });
  } catch (error) {
    console.error("❌ Error al crear la reserva:", error);
    res.status(500).json({ message: "Error al crear la reserva" });
  }
});

/**
 * ✅ Obtener reservas del usuario autenticado
 * GET /api/bookings/mis-reservas
 */
router.get("/mis-reservas", protect, async (req, res) => {
  try {
    const emailUsuario = req.user?.email || req.body?.usuarioEmail;

    if (!emailUsuario) {
      console.warn("⚠️ No se pudo obtener el email del usuario autenticado.");
      return res
        .status(400)
        .json({ message: "No se pudo obtener el email del usuario." });
    }

    console.log("📨 Buscando reservas para:", emailUsuario);

    const reservas = await Booking.find({ usuarioEmail: emailUsuario }).sort({
      createdAt: -1,
    });

    if (!reservas.length) {
      console.warn("ℹ️ No hay reservas registradas para este usuario.");
    }

    res.status(200).json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas:", error);
    res.status(500).json({ message: "Error al obtener tus reservas" });
  }
});


/**
 * ✅ Cancelar reserva del usuario autenticado
 * PUT /api/bookings/cancelar/:id
 */
router.put("/cancelar/:id", protect, async (req, res) => {
  try {
    const reserva = await Booking.findById(req.params.id);
    if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });

    if (reserva.usuarioEmail !== req.user.email) {
      return res.status(403).json({ message: "No tienes permiso para cancelar esta reserva" });
    }

    reserva.estado = "Cancelada";
    await reserva.save();

    res.status(200).json({ message: "Reserva cancelada exitosamente", reserva });
  } catch (error) {
    console.error("❌ Error al cancelar reserva:", error);
    res.status(500).json({ message: "Error al cancelar la reserva" });
  }
});

/**
 * ✅ Obtener todas las reservas (solo admin)
 * GET /api/bookings/admin
 */
router.get("/admin", protect, isAdmin, async (req, res) => {
  try {
    const reservas = await Booking.find()
      .populate("user", "nombre email")
      .sort({ createdAt: -1 });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas (admin):", error);
    res.status(500).json({ message: "Error al obtener todas las reservas" });
  }
});

/* =====================================================
   🌍 RUTAS PÚBLICAS (sin autenticación)
   ===================================================== */

/**
 * Obtener reservas por email
 * GET /api/bookings/by-email/:email
 */
router.get("/by-email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email)
      return res.status(400).json({ message: "Debe proporcionar un email válido" });

    const reservas = await Booking.find({ usuarioEmail: email }).sort({
      createdAt: -1,
    });

    if (!reservas.length)
      return res.status(404).json({ message: "No se encontraron reservas para este usuario" });

    res.status(200).json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas por email:", error);
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
});

/**
 * Obtener reserva por código
 * GET /api/bookings/code/:codigo
 */
router.get("/code/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!codigo)
      return res
        .status(400)
        .json({ message: "Debe proporcionar un código de reserva" });

    const reserva = await Booking.findOne({ codigoReserva: codigo });
    if (!reserva)
      return res.status(404).json({ message: "Reserva no encontrada" });

    res.status(200).json(reserva);
  } catch (error) {
    console.error("❌ Error al buscar la reserva:", error);
    res.status(500).json({ message: "Error al buscar la reserva" });
  }
});

/**
 * Listar todas las reservas (público)
 * GET /api/bookings
 */
router.get("/", async (req, res) => {
  try {
    const reservas = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(reservas);
  } catch (error) {
    console.error("❌ Error al listar las reservas:", error);
    res.status(500).json({ message: "Error al listar las reservas" });
  }
});

export default router;



