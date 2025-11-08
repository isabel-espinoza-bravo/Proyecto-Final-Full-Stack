import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [email, setEmail] = useState("");

  const formatoCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const handlePayment = async () => {
  if (!email) {
    Swal.fire({
      icon: "warning",
      title: "Ingresa tu correo electrónico",
    });
    return;
  }

  try {
    // ✅ Crear array con los nombres que espera el backend
   const reservas = cart.map((item) => ({
  destino: item.nombre,
  fechaInicio: item.fechaInicio || new Date().toISOString().split("T")[0],
  personas: item.personas || 1,
  precioTotal: Number(item.precio),
  imagen: item.imagen,
}));
localStorage.setItem("reservas", JSON.stringify(reservas));


    console.log("🧾 Reservas enviadas al backend:", reservas);

    // Guardar reservas en localStorage (para PagoExitoso.jsx)
    localStorage.setItem("reservas", JSON.stringify(reservas));
    localStorage.setItem("emailReserva", email);

    // Enviar preferencia a backend
    const response = await axios.post(
      "http://localhost:4000/api/payments/create_preference",
      { items: reservas }
    );

    const { init_point } = response.data;

    clearCart();
    window.location.href = init_point;
  } catch (error) {
    console.error("❌ Error creando preferencia de pago:", error);
    Swal.fire({
      icon: "error",
      title: "Error al iniciar el pago",
      text: "Verifica el backend o tus credenciales de Mercado Pago.",
    });
  }
};
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">💳 Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">No hay productos para pagar.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>{item.nombre}</span>
                <strong>{formatoCLP(item.precio)}</strong>
              </li>
            ))}
          </ul>

          <h4 className="text-end mb-4">Total: {formatoCLP(total)}</h4>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100" onClick={handlePayment}>
            Ir a pagar con Mercado Pago
          </button>
        </>
      )}
    </div>
  );
}
