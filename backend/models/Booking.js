import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    usuarioEmail: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        titulo: { type: String, required: true },
        cantidad: { type: Number, default: 1 },
        precio: { type: Number, required: true },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "pagado"],
      default: "pendiente",
    },
    pagoId: {
      type: String,
      required: false,
    },
    codigoReserva: {
      type: String,
      required: true,
      unique: true,
    },
    fechaPago: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

