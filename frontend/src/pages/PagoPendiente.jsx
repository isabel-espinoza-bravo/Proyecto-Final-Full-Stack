import React from "react";
import { Button } from "react-bootstrap";

const PagoPendiente = () => {
  return (
    <div style={{ backgroundColor: "#f8f1f6", minHeight: "100vh" }}>
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
          <h1 className="mb-3 text-warning">⌛ Pago pendiente</h1>
          <p className="lead mb-4">
            Tu pago está siendo procesado por Mercado Pago.  
            Recibirás una confirmación cuando se acredite 💌
          </p>

          <Button
            variant="secondary"
            href="/"
            className="rounded-pill px-4 mt-2"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PagoPendiente;
