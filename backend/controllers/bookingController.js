import Booking from "../models/bookingModel.js";

// 🧾 Obtener todas las reservas (por ejemplo para administradores o vista general)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "nombre email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
};

// 🔍 Obtener una reserva por ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user", "nombre email");
    if (booking) res.json(booking);
    else res.status(404).json({ message: "Reserva no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva" });
  }
};

// ✏️ Actualizar una reserva existente
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Reserva no encontrada" });

    booking.destino = req.body.destino || booking.destino;
    booking.fechaInicio = req.body.fechaInicio || booking.fechaInicio;
    booking.fechaFin = req.body.fechaFin || booking.fechaFin;
    booking.precioTotal = req.body.precioTotal || booking.precioTotal;
    booking.estado = req.body.estado || booking.estado;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva" });
  }
};

// 🗑️ Eliminar una reserva
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Reserva no encontrada" });

    await booking.deleteOne();
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reserva" });
  }
};

// 🆕 Crear nueva reserva (ruta protegida con JWT)
export const crearReserva = async (req, res) => {
  try {
    const { destino, fechaInicio, fechaFin, precioTotal } = req.body;

    const nuevaReserva = await Booking.create({
      user: req.user._id, // viene del middleware protect
      destino,
      fechaInicio,
      fechaFin,
      precioTotal,
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// 🙋‍♀️ Obtener las reservas del usuario autenticado
export const obtenerMisReservas = async (req, res) => {
  try {
    const reservas = await Booking.find({ user: req.user._id });
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tus reservas" });
  }
};

