import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/**
 * ✅ Obtener todas las reservas asociadas a un correo electrónico
 * Endpoint: GET /api/bookings/by-email/:email
 */
router.get("/by-email/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Debe proporcionar un email válido" });
    }

    // Buscar reservas en la base de datos
    const reservas = await Booking.find({ usuarioEmail: email }).sort({
      createdAt: -1, // Las más recientes primero
    });

    if (!reservas || reservas.length === 0) {
      return res.status(404).json({ message: "No se encontraron reservas para este usuario" });
    }

    res.status(200).json(reservas);
  } catch (error) {
    console.error("❌ Error al obtener reservas:", error.message);
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
});

/**
 * ✅ Obtener una reserva específica por código
 * Endpoint: GET /api/bookings/code/:codigo
 */
router.get("/code/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;

    if (!codigo) {
      return res.status(400).json({ message: "Debe proporcionar un código de reserva" });
    }

    const reserva = await Booking.findOne({ codigoReserva: codigo });

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.status(200).json(reserva);
  } catch (error) {
    console.error("❌ Error al obtener la reserva:", error.message);
    res.status(500).json({ message: "Error al buscar la reserva" });
  }
});

/**
 * Endpoint: GET /api/bookings
 */
router.get("/", async (req, res) => {
  try {
    const reservas = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(reservas);
  } catch (error) {
    console.error("❌ Error al listar todas las reservas:", error.message);
    res.status(500).json({ message: "Error al listar las reservas" });
  }
});

export default router;

