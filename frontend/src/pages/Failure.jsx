import React from "react";
import { useNavigate } from "react-router-dom";

export default function Failure() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{ backgroundColor: "#fde7e7" }}
    >
      <i
        className="bi bi-x-circle-fill text-danger mb-3"
        style={{ fontSize: "5rem" }}
      ></i>
      <h2 className="mb-3 fw-bold" style={{ color: "#b71c1c" }}>
        Ocurrió un error con tu pago
      </h2>
      <p className="text-muted mb-4">
        No se pudo procesar la transacción. Intenta nuevamente o elige otro método de pago 💳
      </p>
      <button
        className="btn btn-outline-danger rounded-pill px-4"
        onClick={() => navigate("/cart")}
      >
        Volver al carrito
      </button>
    </div>
  );
}
