import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Spinner } from "react-bootstrap";

export default function Success() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const registrarReserva = async () => {
      try {
        if (!cart || cart.length === 0) {
          setMensaje("El carrito está vacío o ya fue procesado.");
          setLoading(false);
          return;
        }

        const reserva = {
          email: "cliente@demo.com",
          items: cart.map((item) => ({
            titulo: item.nombre || item.titulo,
            cantidad: item.pasajeros || 1,
            precio: item.precio,
          })),
          total,
          estado: "pagado",
          fechaPago: new Date(),
        };

        await axios.post("http://localhost:4000/api/bookings", reserva);
        clearCart();
        setMensaje("✅ ¡Pago confirmado y reserva registrada con éxito!");
      } catch (error) {
        console.error("Error registrando reserva:", error);
        setMensaje("❌ Hubo un problema registrando tu reserva. Contacta soporte.");
      } finally {
        setLoading(false);
      }
    };

    registrarReserva();
  }, []);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{ backgroundColor: "#eaf7e9" }}
    >
      {loading ? (
        <>
          <Spinner animation="border" variant="success" className="mb-3" />
          <p className="text-muted">Procesando tu reserva...</p>
        </>
      ) : (
        <>
          <i
            className="bi bi-check-circle-fill text-success mb-3"
            style={{ fontSize: "5rem" }}
          ></i>
          <h2 className="mb-3 fw-bold" style={{ color: "#2e7d32" }}>
            ¡Pago realizado con éxito!
          </h2>
          <p className="text-muted mb-4">{mensaje}</p>
          <button
            className="btn btn-success rounded-pill px-4"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </>
      )}
    </div>
  );
}

