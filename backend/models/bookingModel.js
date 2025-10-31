import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destino: String,
  precio: Number,
  cantidad: Number,
  fechaInicio: String,
  fechaFin: String,
  estado: { type: String, default: "confirmada" },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

