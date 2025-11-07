import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const Success = () => {
  useEffect(() => {
  const registrarReservas = async () => {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const email = localStorage.getItem("emailReserva") || "sin-email@viajesisa.cl";
    const token = localStorage.getItem("token");

    if (reservas.length === 0) return;

    try {
      for (const reserva of reservas) {
        const body = {
          destino: reserva.destino || reserva.nombre,
          fechaInicio: reserva.fechaInicio,
          fechaFin: reserva.fechaFin || null,
          personas: reserva.personas || 1,
          precioTotal: reserva.precioTotal || reserva.precio || reserva.total || 0,
          usuarioEmail: email,
        };

        console.log("💾 Enviando reserva al backend:", body);

        // 👇👇 CAMBIA ESTA URL SEGÚN LA OPCIÓN QUE ELIJAS
        await axios.post(
  "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/payments/create_preference",
  body,
  token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined
);

      }

      localStorage.removeItem("reservas");
      localStorage.removeItem("emailReserva");
    } catch (err) {
      console.error("❌ Error al registrar reservas:", err);
    }
  };

  registrarReservas();
}, []);

  return (
    <div style={{ backgroundColor: "#e8f2e7", minHeight: "100vh" }}>
      {/* HEADER */}
      <header
        className="container-fluid py-3 px-4 shadow-sm"
        style={{ backgroundColor: "#f6d6c8" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <img
            src="/assets/Logo.jpeg"
            alt="Logo Viajes"
            style={{ height: "100px", width: "auto" }}
          />
          <h5 className="text-muted m-0">Viajes con Isa ✈️</h5>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="d-flex flex-column align-items-center justify-content-center text-center mt-5">
        <div
          className="p-5 rounded-4 shadow-lg"
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "600px",
            border: "2px solid #f6d6c8",
          }}
        >
          <h1 className="mb-3 text-success">🎉 ¡Pago exitoso!</h1>
          <p className="lead mb-4">
            Tu compra fue procesada correctamente.  
            Gracias por confiar en <strong>Viajes con Isa</strong> 🌸
          </p>

          <Button
            variant="success"
            href="/perfil"
            className="rounded-pill px-4 mt-2"
          >
            Ver mis reservas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;




