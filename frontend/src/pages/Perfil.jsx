// src/pages/Perfil.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";

const Perfil = () => {
  const [reservas, setReservas] = useState([]);
  const nombre = localStorage.getItem("nombre");
  const token = localStorage.getItem("token");

  const obtenerReservas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/bookings/" + token);
      setReservas(res.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    window.location.href = "/";
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Bienvenido, {nombre} 👋</h2>

      <Button variant="danger" className="mb-3" onClick={cerrarSesion}>
        Cerrar sesión
      </Button>

      <h4>Tus Reservas</h4>
      {reservas.length === 0 ? (
        <p>No tienes reservas registradas.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Destino</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r, index) => (
              <tr key={index}>
                <td>{r.destino}</td>
                <td>${r.precio.toLocaleString("es-CL")}</td>
                <td>{r.cantidad}</td>
                <td>{r.fechaInicio}</td>
                <td>{r.fechaFin}</td>
                <td>{r.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Perfil;

