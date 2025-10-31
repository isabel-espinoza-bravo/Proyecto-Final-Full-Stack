import React, { useState, useEffect } from "react";

export default function MisReservas() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(data);
  }, []);

  const buscarReserva = () => {
    const found = reservas.find((r) => r.id === codigo.trim());
    setResultado(found || "notfound");
  };

  const formatoCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🔎 Buscar Reserva</h2>

      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Ingresa tu código de reserva (ej: RES-2025-1234)"
          className="form-control w-75 mx-auto mb-3"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button className="btn btn-success" onClick={buscarReserva}>
          Buscar
        </button>
      </div>

      {resultado === "notfound" && (
        <p className="text-center text-danger">No se encontró la reserva.</p>
      )}

      {resultado && resultado !== "notfound" && (
        <div className="card shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          <img
            src={resultado.imagen}
            alt={resultado.destino}
            className="card-img-top"
            style={{ height: "250px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{resultado.destino}</h5>
            <p className="mb-1">
              <strong>Fechas:</strong> {resultado.fechaInicio} → {resultado.fechaFin}
            </p>
            <p className="mb-1">
              <strong>Pasajeros:</strong> {resultado.personas}
            </p>
            <p className="mb-0 fw-bold">
              Total: {formatoCLP(resultado.total)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


