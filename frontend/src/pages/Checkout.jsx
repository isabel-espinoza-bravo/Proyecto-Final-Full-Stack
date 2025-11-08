import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [email, setEmail] = useState("");

  // ✅ URL del backend en Render (usa variable de entorno o fallback local)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

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
      // ✅ Armar reservas con la estructura esperada por el backend
      const reservas = cart.map((item) => ({
        destino: item.nombre,
        fechaInicio: item.fechaInicio || new Date().toISOString().split("T")[0],
        personas: item.personas || 1,
        precioTotal: Number(item.precio),
        imagen: item.imagen,
      }));

      // Guardar reservas y correo en localStorage para usarlas en PagoExitoso.jsx
      localStorage.setItem("reservas", JSON.stringify(reservas));
      localStorage.setItem("emailReserva", email);

      console.log("🧾 Reservas enviadas al backend:", reservas);

      // ✅ Enviar preferencia de pago a tu backend en Render
      const response = await axios.post(`${API_URL}/payments/create_preference`, {
        items: reservas.map((r) => ({
          title: r.destino,
          quantity: 1,
          unit_price: r.precioTotal,
          currency_id: "CLP",
        })),
        payer: { email },
      });

      // ✅ Obtener el link de pago de Mercado Pago
      const { init_point } = response.data;

      // Limpiar carrito y redirigir a la pasarela de pago
      clearCart();
      window.location.href = init_point;
    } catch (error) {
      console.error("❌ Error creando preferencia de pago:", error);
      Swal.fire({
        icon: "error",
        title: "Error al procesar el pago",
        text: "No se pudo guardar la reserva antes del pago o el backend no respondió.",
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


