import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useCart } from "./context/CartContext";

// ====== DATA DE DESTINOS ======
// ====== DATA DE DESTINOS (6 destinos) ======
const destinos = [
  {
    id: 1,
    nombre: "Aventura en la Patagonia",
    descripcion: "Explora glaciares, lagos y montañas en un paisaje único.",
    incluye: "Vuelos + 5 noches + Desayuno",
    noches: 5,
    precio: 650000,
    imagenes: ["/assets/patagonia1.png", "/assets/patagonia2.png"],
    color: "#ffeefc",
  },
  {
    id: 2,
    nombre: "Descubre el Desierto de Atacama",
    descripcion: "Vive la magia del paisaje más árido del mundo.",
    incluye: "Vuelos + 4 noches + Desayuno",
    noches: 4,
    precio: 520000,
    imagenes: ["/assets/sanpedro1.jpeg", "/assets/sanpedro2.jpeg"],
    color: "#e6f5f8",
  },
  {
    id: 3,
    nombre: "La Magia de Isla de Pascua",
    descripcion: "Sumérgete en la historia de los Moai y su cultura.",
    incluye: "Vuelos + 3 noches + Desayuno",
    noches: 3,
    precio: 980000,
    imagenes: ["/assets/isladepascua1.png", "/assets/isladepascua2.png"],
    color: "#fef7e6",
  },
  {
    id: 4,
    nombre: "Descubre Nueva York",
    descripcion: "Luces, cultura y vida urbana en la Gran Manzana.",
    incluye: "Vuelos + 5 noches + Desayuno",
    noches: 5,
    precio: 1200000,
    imagenes: ["/assets/nyc1.png", "/assets/nyc2.png"],
    color: "#e6f5f8",
  },
  {
    id: 5,
    nombre: "Diversión en Orlando",
    descripcion: "Parques temáticos, sol y pura magia.",
    incluye: "Vuelos + 4 noches + Desayuno",
    noches: 4,
    precio: 1000000,
    imagenes: ["/assets/orlando1.png", "/assets/orlando2.png"],
    color: "#fef7e6",
  },
  {
    id: 6,
    nombre: "Escápate a Miami",
    descripcion: "Playas, compras y noches tropicales.",
    incluye: "Vuelos + 3 noches + Desayuno",
    noches: 3,
    precio: 900000,
    imagenes: ["/assets/miami1.png", "/assets/miami2.png"],
    color: "#f6eef7",
  },
];

function App() {
  const { cart, addToCart, removeFromCart, clearCart, total } = useCart();

  // Estado modales
  const [showDetalles, setShowDetalles] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [destinoDetalles, setDestinoDetalles] = useState(null);
  const [destinoAdd, setDestinoAdd] = useState(null);

  // Datos de reserva temporal
  const [fechaInicio, setFechaInicio] = useState("");
  const [personas, setPersonas] = useState(1);

  // Búsqueda de reservas
  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [reservaEncontrada, setReservaEncontrada] = useState(null);

  const formatoCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  // 🔹 Abrir detalle de destino
  const abrirDetalles = (d) => {
    setDestinoDetalles(d);
    setShowDetalles(true);
  };

  // 🔹 Abrir modal para añadir al carrito
  const abrirAdd = (d) => {
    setDestinoAdd(d);
    setFechaInicio("");
    setPersonas(1);
    setShowAdd(true);
  };

  // 🔹 Agregar al carrito
  const agregarAlCarrito = () => {
    if (!fechaInicio) {
      Swal.fire({
        icon: "warning",
        title: "Completa la fecha",
        text: "Selecciona una fecha antes de continuar.",
      });
      return;
    }

    addToCart({
      id: destinoAdd.id,
      nombre: destinoAdd.nombre,
      imagen: destinoAdd.imagenes[0],
      precio: destinoAdd.precio * personas,
      personas,
      fechaInicio,
    });

    Swal.fire({
      icon: "success",
      title: "Agregado al carrito 🛒",
      text: `${destinoAdd.nombre} se añadió correctamente.`,
    });

    setShowAdd(false);
  };

  // 🔹 Checkout con MercadoPago
  const pagar = async () => {
    if (cart.length === 0) {
      Swal.fire("Carrito vacío", "Agrega productos antes de pagar", "warning");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/payments/create_preference", {
        email: "cliente@demo.com",
        items: cart.map((item) => ({
          titulo: item.nombre,
          cantidad: item.personas,
          precio: item.precio / item.personas,
        })),
      });

      const { init_point } = response.data;
      window.location.href = init_point; // Redirige al pago
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo iniciar el pago", "error");
    }
  };

  // 🔹 Buscar reserva por código
  const buscarReserva = () => {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const encontrada = reservas.find((r) => r.id === codigoBusqueda);
    if (encontrada) {
      setReservaEncontrada(encontrada);
    } else {
      Swal.fire("No encontrada", "No existe una reserva con ese código", "info");
      setReservaEncontrada(null);
    }
  };

  // 🔹 Cargar reservas pasadas
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    if (data.length > 0) setReservaEncontrada(data[data.length - 1]);
  }, []);

  return (
    <div style={{ backgroundColor: "#e8f2e7" }}>
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

          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={() => setShowCart(true)}
            >
              🛒 Carrito ({cart.length})
            </button>
          </div>
        </div>
      </header>

      {/* SECCIÓN DESTINOS */}
      <section id="tours" className="container my-5">
        <h2 className="text-center mb-4 text-muted">Nuestros Destinos</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {destinos.map((d) => (
            <div className="col" key={d.id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ backgroundColor: d.color, borderRadius: "16px" }}
              >
                <div
                  id={`carousel-${d.id}`}
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {d.imagenes.map((img, i) => (
                      <div
                        key={i}
                        className={`carousel-item ${i === 0 ? "active" : ""}`}
                      >
                        <img
                          src={img}
                          className="d-block w-100"
                          alt={d.nombre}
                          style={{
                            height: "360px",
                            objectFit: "cover",
                            borderRadius: "16px 16px 0 0",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-body">
                  <h5>{d.nombre}</h5>
                  <p className="text-muted">{d.descripcion}</p>
                  <div className="d-flex justify-content-between">
                    <span>{d.noches} noches</span>
                    <span className="fw-bold">{formatoCLP(d.precio)}</span>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() => abrirDetalles(d)}
                  >
                    Ver detalles
                  </Button>
                  <Button variant="success" onClick={() => abrirAdd(d)}>
                    Añadir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL: DETALLES */}
      <Modal show={showDetalles} onHide={() => setShowDetalles(false)} centered>
        {destinoDetalles && (
          <>
            <Modal.Header closeButton style={{ backgroundColor: "#f6d6c8" }}>
              <Modal.Title>{destinoDetalles.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{destinoDetalles.descripcion}</p>
              <p>{destinoDetalles.incluye}</p>
              <p>Duración: {destinoDetalles.noches} noches</p>
              <p className="fw-bold text-end">
                {formatoCLP(destinoDetalles.precio)}
              </p>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* MODAL: AÑADIR AL CARRITO */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        {destinoAdd && (
          <>
            <Modal.Header closeButton style={{ backgroundColor: "#f6d6c8" }}>
              <Modal.Title>Reserva • {destinoAdd.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Personas</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAdd(false)}>
                Cancelar
              </Button>
              <Button variant="success" onClick={agregarAlCarrito}>
                Añadir al carrito
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* MODAL: CARRITO */}
      <Modal show={showCart} onHide={() => setShowCart(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🛒 Tu carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>No tienes productos agregados.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <strong>{item.nombre}</strong>
                  <p className="small mb-0">
                    {item.personas} persona(s) – {item.fechaInicio}
                  </p>
                </div>
                <div>
                  <span className="fw-bold">{formatoCLP(item.precio)}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => removeFromCart(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div className="text-end mt-3 fw-bold">
              Total: {formatoCLP(total)}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clearCart}>
            Vaciar carrito
          </Button>
          <Button variant="success" onClick={pagar}>
            Ir a pagar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* BUSCAR RESERVA */}
      <section className="container my-5">
        <h4 className="text-center mb-3">🔍 Buscar reserva por código</h4>
        <div className="d-flex justify-content-center gap-2">
          <input
            type="text"
            placeholder="Ej: RES-2025-1234"
            value={codigoBusqueda}
            onChange={(e) => setCodigoBusqueda(e.target.value)}
            className="form-control w-50"
          />
          <Button onClick={buscarReserva}>Buscar</Button>
        </div>
        {reservaEncontrada && (
          <div className="mt-4 text-center">
            <h5>Reserva encontrada</h5>
            <p>
              <strong>{reservaEncontrada.destino}</strong> –{" "}
              {reservaEncontrada.fechaInicio} → {reservaEncontrada.fechaFin}
            </p>
            <p>Personas: {reservaEncontrada.personas}</p>
            <p>Total: {formatoCLP(reservaEncontrada.total)}</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        style={{ backgroundColor: "#f8f1f6" }}
        className="text-center mt-5 p-4"
      >
        <h6 className="text-muted mb-2">
          Explora las maravillas del mundo ✈️
        </h6>
        <p className="text-secondary small mb-0">
          © 2025 Viajes con Isa. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;


