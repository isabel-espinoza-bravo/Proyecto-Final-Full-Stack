// src/pages/Perfil.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Form,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";

const Perfil = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Campos del formulario
  const [destino, setDestino] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");

  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");

  const nombre = localStorage.getItem("nombre") || "";
  const token = localStorage.getItem("token");

  // 👉 función que ya tenías: obtener desde backend
  const obtenerReservas = async () => {
    try {
      const res = await axios.get(
        "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/bookings/mis-reservas",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReservas(res.data);
    } catch (error) {
      console.error("❌ Error al obtener reservas:", error);
      setError(
        error.response?.data?.message ||
          "No se pudieron cargar tus reservas."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ NUEVO: cargar primero lo que haya en localStorage
  useEffect(() => {
    // 1) probar con misReservas
    const guardadas = JSON.parse(localStorage.getItem("misReservas") || "[]");

    if (guardadas.length > 0) {
      setReservas(guardadas);
      setLoading(false);
    } else {
      // 2) si no hay misReservas, probamos con cart
      const carrito = JSON.parse(localStorage.getItem("cart") || "[]");

      if (Array.isArray(carrito) && carrito.length > 0) {
        // el carrito tiene un formato un poco distinto, lo adaptamos rápido
        const adaptadas = carrito.map((item) => ({
          destino: item.nombre || item.destino || "Destino",
          precioTotal: item.precio || item.total || 0,
          fechaInicio: item.fechaInicio || item.fecha || "",
          fechaFin: item.fechaFin || "",
          estado: "Pendiente",
        }));
        setReservas(adaptadas);
        setLoading(false);
      }
    }

    // 3) si hay token, sobreescribimos con lo real del backend
    if (token) {
      obtenerReservas();
    }
  }, []);

  // 🔹 Crear nueva reserva manualmente
  const crearReserva = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(
        "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/bookings/nueva",
        {
          destino,
          fechaInicio,
          fechaFin,
          precioTotal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("✅ Reserva creada con éxito");
      setDestino("");
      setFechaInicio("");
      setFechaFin("");
      setPrecioTotal("");
      obtenerReservas(); // refrescar tabla
    } catch (error) {
      console.error("❌ Error al crear reserva:", error);
      setError(error.response?.data?.message || "No se pudo crear la reserva.");
    }
  };

  // 🔹 Cancelar reserva
  const cancelarReserva = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta reserva?")) return;

    try {
      await axios.put(
        `https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/bookings/cancelar/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("✅ Reserva cancelada exitosamente");
      obtenerReservas();
    } catch (error) {
      console.error("❌ Error al cancelar reserva:", error);
      setError(
        error.response?.data?.message || "No se pudo cancelar la reserva."
      );
    }
  };

  // 🔹 Actualizar perfil
  const actualizarPerfil = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.put(
        "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/users/update-profile",
        {
          nombre,
          email,
          password: password || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message || "Perfil actualizado correctamente");
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar perfil");
    }
  };

  // 🔹 Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("email");
    // si quieres dejar misReservas/cart, no los borres
    window.location.href = "/";
  };

  // 🔹 Formato de CLP
  const formatoCLP = (valor) =>
    valor
      ? `$${Number(valor).toLocaleString("es-CL", {
          minimumFractionDigits: 0,
        })}`
      : "—";

  // 🔹 Obtener color de badge por estado
  const getBadgeVariant = (estado) => {
    if (!estado || estado === "Confirmada") return "success";
    if (estado === "Pendiente") return "warning";
    if (estado === "Cancelada") return "secondary";
    return "light";
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Bienvenido, {nombre} 👋</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="danger" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </div>

      {/* 🧳 Formulario de nueva reserva */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">Nueva Reserva</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={crearReserva}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Destino</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Isla de Pascua"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Fin</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio Total</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 1200000"
                    value={precioTotal}
                    onChange={(e) => setPrecioTotal(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col
                md={8}
                className="d-flex align-items-end justify-content-end"
              >
                <Button type="submit" variant="success" className="w-100">
                  Crear Reserva
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* 🧍 Actualizar perfil */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">Actualizar perfil</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={actualizarPerfil}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={nombre}
                    onChange={(e) =>
                      localStorage.setItem("nombre", e.target.value)
                    }
                    placeholder="Tu nombre"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="(opcional)"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="w-100">
              Guardar cambios
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* 🧾 Tabla de reservas */}
      <h4 className="mb-3">Tus Reservas</h4>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" />
          <p>Cargando reservas...</p>
        </div>
      ) : reservas.length === 0 ? (
        <p>No tienes reservas registradas.</p>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="shadow-sm rounded-3 overflow-hidden"
          style={{ backgroundColor: "#fff" }}
        >
          <thead style={{ backgroundColor: "#f6d6c8" }}>
            <tr>
              <th>Destino</th>
              <th>Precio</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r, index) => (
              <tr key={index}>
                <td>{r.destino}</td>
                <td>{formatoCLP(r.precioTotal || r.precio || r.total)}</td>
                <td>
                  {r.fechaInicio
                    ? new Date(r.fechaInicio).toLocaleDateString("es-CL")
                    : "—"}
                </td>
                <td>
                  {r.fechaFin
                    ? new Date(r.fechaFin).toLocaleDateString("es-CL")
                    : "—"}
                </td>
                <td>
                  <Badge bg={getBadgeVariant(r.estado)} pill>
                    {r.estado || "Confirmada"}
                  </Badge>
                </td>
                <td className="text-center">
                  {r._id ? (
                    r.estado !== "Cancelada" ? (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => cancelarReserva(r._id)}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      <span className="text-muted">—</span>
                    )
                  ) : (
                    <span className="text-muted">Local</span>
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

export default Perfil;







