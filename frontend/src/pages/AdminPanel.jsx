import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";

const AdminPanel = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre");

  const obtenerTodasLasReservas = async () => {
    try {
      const res = await axios.get("hhttps://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/bookings/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservas(res.data);
    } catch (error) {
      console.error("❌ Error al obtener reservas:", error);
      setError(error.response?.data?.message || "No se pudieron cargar las reservas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerTodasLasReservas();
  }, []);

  const cancelarReserva = async (id) => {
    if (!window.confirm("¿Cancelar esta reserva?")) return;
    try {
      await axios.put(
        `https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/bookings/cancelar/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("✅ Reserva cancelada correctamente");
      obtenerTodasLasReservas();
    } catch (error) {
      setError(error.response?.data?.message || "No se pudo cancelar la reserva.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Panel de Administración 🛫</h2>
      <p className="text-center text-muted">
        Bienvenida, <strong>{nombre}</strong> — vista de administrador
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <p>Cargando reservas...</p>
        </div>
      ) : reservas.length === 0 ? (
        <Alert variant="info">No hay reservas en el sistema.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Destino</th>
              <th>Precio</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r, i) => (
              <tr key={i}>
                <td>{r.user?.nombre || "—"}</td>
                <td>{r.user?.email || "—"}</td>
                <td>{r.destino}</td>
                <td>
                  {r.precioTotal
                    ? `$${r.precioTotal.toLocaleString("es-CL")}`
                    : "—"}
                </td>
                <td>{new Date(r.fechaInicio).toLocaleDateString("es-CL")}</td>
                <td>{new Date(r.fechaFin).toLocaleDateString("es-CL")}</td>
                <td>{r.estado}</td>
                <td className="text-center">
                  {r.estado !== "cancelada" ? (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => cancelarReserva(r._id)}
                    >
                      Cancelar
                    </Button>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminPanel;
