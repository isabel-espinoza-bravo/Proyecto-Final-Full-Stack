import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const PagoExitoso = () => {
  useEffect(() => {
    const registrarReservas = async () => {
      const token = localStorage.getItem("token");
      const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

      if (!token || reservas.length === 0) {
        console.warn("⚠️ No hay reservas o usuario autenticado.");
        return;
      }

      try {
        for (const reserva of reservas) {
          await axios.post(
            "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/bookings/nueva",
            {
              destino: reserva.destino,
              fechaInicio: reserva.fechaInicio,
              personas: reserva.personas,
              total: reserva.total,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        Swal.fire({
          icon: "success",
          title: "Reservas confirmadas 🌸",
          text: "Tu compra fue registrada correctamente.",
          timer: 3000,
          showConfirmButton: false,
        });

        // Limpia reservas locales
        localStorage.removeItem("reservas");
      } catch (error) {
        console.error("❌ Error al registrar reservas:", error);
        Swal.fire({
          icon: "error",
          title: "Error al registrar reservas",
          text: "Ocurrió un problema al guardar tu compra.",
        });
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

export default PagoExitoso;

