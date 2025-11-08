// src/App.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useCart } from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";




// ====== DATA DE DESTINOS ======
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

  // ====== AUTENTICACIÓN ======
  const [usuario, setUsuario] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombre");
    if (nombreGuardado) {
      setUsuario({ nombre: nombreGuardado });
    }
  }, []);

  // ====== MODALES / ESTADOS ======
  const [showDetalles, setShowDetalles] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [destinoDetalles, setDestinoDetalles] = useState(null);
  const [destinoAdd, setDestinoAdd] = useState(null);

  // datos de reserva
  const [fechaInicio, setFechaInicio] = useState("");
  const [personas, setPersonas] = useState(1);

  // búsqueda de reserva
  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [reservaEncontrada, setReservaEncontrada] = useState(null);

  const formatoCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  // cargar última reserva guardada (opcional)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];
    if (data.length > 0) setReservaEncontrada(data[data.length - 1]);
  }, []);

  // abrir detalle
  const abrirDetalles = (d) => {
    setDestinoDetalles(d);
    setShowDetalles(true);
  };

  // abrir modal añadir
  const abrirAdd = (d) => {
    setDestinoAdd(d);
    setFechaInicio("");
    setPersonas(1);
    setShowAdd(true);
  };

  // añadir al carrito
  const agregarAlCarrito = () => {
    if (!fechaInicio) {
      Swal.fire("Completa la fecha", "Selecciona una fecha antes de continuar.", "warning");
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

    Swal.fire("Agregado 🛒", `${destinoAdd.nombre} se añadió al carrito.`, "success");
    setShowAdd(false);
  };

  // buscar reserva de localStorage
  const buscarReserva = () => {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const encontrada = reservas.find((r) => r.id === codigoBusqueda);
    if (encontrada) {
      setReservaEncontrada(encontrada);
    } else {
      setReservaEncontrada(null);
      Swal.fire("No encontrada", "No existe una reserva con ese código", "info");
    }
  };

  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#e8f2e7" }}>
      {/* HEADER */}
      <header
        className="container-fluid py-3 px-4 shadow-sm"
        style={{ backgroundColor: "#f6d6c8" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <img src="/assets/Logo.jpeg" alt="Logo Viajes" style={{ height: "100px" }} />

        <div className="d-flex gap-3 align-items-center">
  {!usuario ? (
    <>
      {/* 🔐 Botones visibles solo si no hay sesión */}
      <button
        className="btn btn-outline-dark rounded-pill px-4"
        onClick={() => setShowLogin(true)}
      >
        Iniciar sesión
      </button>
      <button
        className="btn btn-outline-dark rounded-pill px-4"
        onClick={() => setShowSignup(true)}
      >
        Crear cuenta
      </button>
    </>
  ) : (
    <>
      {/* 👋 Bienvenida */}
      <span className="fw-semibold">Hola, {usuario.nombre.split(" ")[0]} 👋</span>

   {/* 🧳  Mis Reservas */}
   <button
  className="btn btn-outline-primary rounded-pill px-4"
  onClick={async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Inicia sesión", "Debes iniciar sesión para ver tus reservas.", "info");
        return;
      }

      const res = await axios.get("https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/bookings/mis-reservas", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("misReservas", JSON.stringify(res.data));

      // esto ahora sí va a mostrar solo el perfil
      navigate("/perfil");
    } catch (error) {
      console.error("❌ Error al obtener reservas del usuario:", error);
      Swal.fire("Error", "No se pudieron cargar tus reservas. Intenta nuevamente.", "error");
    }
  }}
>
  Mis Reservas
</button>

      {/* 🚪 Cerrar sesión */}
      <button
        className="btn btn-outline-danger rounded-pill px-4"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("nombre");
          localStorage.removeItem("misReservas");
          setUsuario(null);
          Swal.fire("Sesión cerrada", "Vuelve pronto 💫", "info");
        }}
      >
        Cerrar sesión
      </button>
    </>
  )}

  {/* 🛒 Carrito */}
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
                {/* carrusel simple */}
                <div id={`carousel-${d.id}`} className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {d.imagenes.map((img, i) => (
                      <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
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
                  <Button variant="outline-secondary" onClick={() => abrirDetalles(d)}>
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

      {/* MODAL: LOGIN */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#f6d6c8" }}>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              try {
                const res = await axios.post("https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/users/login", {
                  email,
                  password,
                });
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("nombre", res.data.nombre);
                setUsuario({ nombre: res.data.nombre });
                setShowLogin(false);
                Swal.fire("Bienvenida 🌸", "Has iniciado sesión correctamente", "success");
              } catch (err) {
                Swal.fire(
                  "Error",
                  err.response?.data?.message || "Credenciales incorrectas",
                  "error"
                );
              }
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="correo@ejemplo.com" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" placeholder="********" required />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Ingresar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL: REGISTRO */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#f6d6c8" }}>
          <Modal.Title>Crear cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              const nombre = e.target.nombre.value;
              const email = e.target.email.value;
              const password = e.target.password.value;
              try {
                await axios.post("https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api/users/register", {
                  nombre,
                  email,
                  password,
                });
                Swal.fire("Cuenta creada 🎉", "Ahora puedes iniciar sesión", "success");
                setShowSignup(false);
                setShowLogin(true);
              } catch (err) {
                Swal.fire(
                  "Error",
                  err.response?.data?.message || "No se pudo crear la cuenta",
                  "error"
                );
              }
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" placeholder="Tu nombre" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="correo@ejemplo.com" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" placeholder="********" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
              <p className="fw-bold text-end">{formatoCLP(destinoDetalles.precio)}</p>
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
            <div className="text-end mt-3 fw-bold">Total: {formatoCLP(total)}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
<Button
  variant="success"
  onClick={async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/payments/create_preference",
        { items: cart }
      );
      const { init_point } = response.data;

      // 🪄 Guardar reservas localmente antes de redirigir al pago
      const reservasExistentes = JSON.parse(localStorage.getItem("misReservas") || "[]");

      const nuevasReservas = cart.map((item) => ({
        id: `RES-${new Date().getFullYear()}-${Math.floor(
          1000 + Math.random() * 9000
        )}`,
        destino: item.nombre,
        imagen: item.imagen || "",
        fechaInicio: item.fechaInicio || "",
        personas: item.personas || 1,
        total: item.precio || 0,
        estado: "Pendiente",
      }));

      const actualizadas = [...reservasExistentes, ...nuevasReservas];

      localStorage.setItem("misReservas", JSON.stringify(actualizadas));
      localStorage.setItem("reservas", JSON.stringify(actualizadas));
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log("✅ Reservas guardadas antes del pago:", actualizadas);

      // 💬 Mensaje y delay antes de redirigir
      Swal.fire({
        icon: "info",
        title: "Redirigiendo a Mercado Pago...",
        text: "Tus reservas se confirmarán al completar el pago.",
        showConfirmButton: false,
        timer: 2000,
      });

      // ⏳ Espera 2 segundos para asegurar que todo se guarde
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 🚀 Redirigir al pago
      window.location.href = init_point;
    } catch (err) {
      console.error("❌ Error al procesar el pago:", err);
      Swal.fire("Error", "No se pudo guardar la reserva antes del pago", "error");
    }
  }}
>
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
              <strong>{reservaEncontrada.destino}</strong> – {reservaEncontrada.fechaInicio}
            </p>
            <p>Personas: {reservaEncontrada.personas}</p>
            <p>Total: {formatoCLP(reservaEncontrada.total)}</p>
            <p className="text-muted">Código: {reservaEncontrada.id}</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        style={{ backgroundColor: "#f8f1f6" }}
        className="text-center mt-5 p-4"
      >
        <h6 className="text-muted mb-2">Explora las maravillas del mundo ✈️</h6>
        <p className="text-secondary small mb-0">
          © 2025 Viajes con Isa. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;
