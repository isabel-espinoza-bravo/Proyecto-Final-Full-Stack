import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pending() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-100"
      style={{ backgroundColor: "#fff7e6" }}
    >
      <i
        className="bi bi-hourglass-split text-warning mb-3"
        style={{ fontSize: "5rem" }}
      ></i>
      <h2 className="mb-3 fw-bold" style={{ color: "#ff8f00" }}>
        Pago pendiente de confirmación
      </h2>
      <p className="text-muted mb-4">
        Tu pago está siendo procesado. Recibirás una confirmación pronto ⏱️
      </p>
      <button
        className="btn btn-warning rounded-pill px-4"
        onClick={() => navigate("/")}
      >
        Volver al inicio
      </button>
    </div>
  );
}
