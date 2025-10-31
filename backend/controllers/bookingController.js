import Booking from "../models/bookingModel.js";
import Product from "../models/productModel.js";

export const createBooking = async (req, res) => {
  const { productId, startDate, totalPeople } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + product.durationDays);

  const totalPrice = totalPeople * product.pricePerPerson;
  const reservationCode = "RSV-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  const booking = await Booking.create({
    user: req.user._id,
    product: productId,
    startDate,
    endDate,
    totalPeople,
    totalPrice,
    reservationCode,
  });

  res.status(201).json({ message: "Reserva creada con éxito", booking });
};
