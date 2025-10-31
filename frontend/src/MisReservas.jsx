import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartProvider from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("reservas");
    if (data) setReservas(JSON.parse(data));
  }, []);

  const eliminarReserva = (id) => {
    Swal.fire({
      title: "¿Eliminar reserva?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b4c3b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#f8f1f6",
      customClass: {
        popup: "rounded-4 shadow",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevas = reservas.filter((r) => r.id !== id);
        setReservas(nuevas);
        localStorage.setItem("reservas", JSON.stringify(nuevas));

        Swal.fire({
          title: "Eliminada",
          text: "Tu reserva fue eliminada exitosamente.",
          icon: "success",
          confirmButtonColor: "#6b4c3b",
          background: "#f8f1f6",
          timer: 1800,
          showConfirmButton: false,
        });
      }
    });
  };

  const obtenerDetallePaquete = (destino) => {
    const detalles = {
      "Aventura en la Patagonia": {
        noches: 5,
        incluye: "Vuelos + 5 noches + desayuno",
      },
      "Descubre el Desierto de Atacama": {
        noches: 4,
        incluye: "Vuelos + 4 noches + excursión al Valle de la Luna",
      },
      "La Magia de Isla de Pascua": {
        noches: 5,
        incluye: "Vuelos + 5 noches + tour arqueológico",
      },
      "Descubre Nueva York": {
        noches: 5,
        incluye: "Vuelos + 5 noches + desayuno + city tour",
      },
      "Diversión en Orlando": {
        noches: 4,
        incluye: "Vuelos + 4 noches + entradas a parques",
      },
      "Escápate a Miami": {
        noches: 3,
        incluye: "Vuelos + 3 noches + desayuno + acceso a playa",
      },
    };
    return detalles[destino] || { noches: "-", incluye: "Paquete turístico" };
  };

  return (
    <div style={{ backgroundColor: "#e8f2e7", minHeight: "100vh" }}>
      {/* HEADER */}
      <header
        className="container-fluid py-3 px-4 shadow-sm"
        style={{ backgroundColor: "#f6d6c8" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="/assets/Logo.jpeg"
              alt="Logo Viajes"
              style={{ height: "120px", width: "auto" }}
            />
          </div>
          <div>
            <Link
              to="/"
              className="btn btn-outline-secondary rounded-pill px-4 me-3"
              style={{ backgroundColor: "rgb(233, 246, 227)" }}
            >
              Inicio
            </Link>
            <Link
              to="/reservas"
              className="btn btn-outline-secondary rounded-pill px-4 active"
              style={{ backgroundColor: "#fff" }}
            >
              Mis Reservas
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="container py-5">
        <h2 className="text-center text-muted mb-4">Mis Reservas</h2>
        {reservas.length === 0 ? (
          <p className="text-center text-secondary">
            No tienes reservas registradas aún.
          </p>
        ) : (
          <div className="row g-4">
            {reservas.map((r) => (
              <div className="col-md-6 col-lg-4" key={r.id}>
                <div
                  className="card shadow border-0 h-100"
                  style={{ backgroundColor: "#fffaf8" }}
                >
                  <img
                    src={r.imagen}
                    alt={r.destino}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{r.destino}</h5>
                    <p className="text-muted mb-1">
                      <i className="bi bi-calendar-event"></i> {r.fechaInicio} →{" "}
                      {r.fechaFin}
                    </p>
                    <p className="text-muted mb-1">
                      <i className="bi bi-people"></i> {r.personas} persona
                      {r.personas > 1 ? "s" : ""}
                    </p>
                    <p className="fw-bold mt-2">
                      Total: ${r.total.toLocaleString("es-CL")} CLP
                    </p>
                    <p className="small text-secondary mb-0">
                      ID Reserva: <strong>{r.id}</strong>
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary flex-fill"
                      onClick={() => setDetalle(r)}
                    >
                      <i className="bi bi-info-circle"></i> Ver detalle
                    </button>
                    <button
                      className="btn btn-outline-danger flex-fill"
                      onClick={() => eliminarReserva(r.id)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE DETALLE */}
      <Modal
        show={!!detalle}
        onHide={() => setDetalle(null)}
        centered
        size="md"
        backdrop="static"
      >
        {detalle && (
          <>
            <Modal.Header closeButton style={{ backgroundColor: "#f6d6c8" }}>
              <Modal.Title>{detalle.destino}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
              <img
                src={detalle.imagen}
                alt={detalle.destino}
                className="img-fluid rounded mb-3"
              />
              <p>
                <i className="bi bi-calendar-week"></i>{" "}
                <strong>Desde:</strong> {detalle.fechaInicio} →{" "}
                <strong>Hasta:</strong> {detalle.fechaFin}
              </p>
              <p>
                <i className="bi bi-people"></i>{" "}
                <strong>Pasajeros:</strong> {detalle.personas}
              </p>
              <p>
                <i className="bi bi-sun"></i>{" "}
                <strong>Noches:</strong>{" "}
                {obtenerDetallePaquete(detalle.destino).noches}
              </p>
              <p>
                <i className="bi bi-bag-check"></i>{" "}
                <strong>Incluye:</strong>{" "}
                {obtenerDetallePaquete(detalle.destino).incluye}
              </p>
              <hr />
              <p className="fw-bold text-center mb-0">
                Total: ${detalle.total.toLocaleString("es-CL")} CLP
              </p>
              <p className="text-center text-muted small mb-0">
                ID de reserva: <strong>{detalle.id}</strong>
              </p>
            </Modal.Body>
            <Modal.Footer className="bg-light">
              <Button
                variant="secondary"
                onClick={() => setDetalle(null)}
                className="rounded-pill"
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* FOOTER */}
      <footer
        style={{ backgroundColor: "#f8f1f6" }}
        className="text-center mt-5 p-4"
      >
        <h6 className="text-muted mb-2">Explora las maravillas de Chile ✈️</h6>
        <p className="text-secondary small mb-0">
          © 2025 Viajes con Isa. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default MisReservas;

