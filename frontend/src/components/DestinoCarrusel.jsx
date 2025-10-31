import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const destinos = [
  {
    id: 1,
    titulo: "Nueva York",
    imagenes: ["/assets/nyc1.png", "/assets/nyc2.png"],
    descripcion: "Explora la Gran Manzana: cultura, compras y luces.",
    detalles: "Incluye vuelos + 5 noches + desayuno",
    precio: 1200000,
  },
  {
    id: 2,
    titulo: "Orlando",
    imagenes: ["/assets/orlando1.png", "/assets/orlando2.png"],
    descripcion: "Diversión mágica en los parques de Disney y Universal.",
    detalles: "Incluye vuelos + 4 noches + entradas + desayuno",
    precio: 1000000,
  },
  {
    id: 3,
    titulo: "Miami",
    imagenes: ["/assets/miami1.png", "/assets/miami2.png"],
    descripcion: "Relájate en playas paradisíacas y vive el glamour de South Beach.",
    detalles: "Incluye vuelos + 3 noches + desayuno buffet",
    precio: 900000,
  },
];

const DestinoCarrusel = () => {
  const { agregarAlCarrito } = useCart();

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4 text-muted">Destinos en Estados Unidos</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {destinos.map((destino) => (
          <div className="col" key={destino.id}>
            <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: "#f9f9f9" }}>
              <div id={`carousel${destino.id}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {destino.imagenes.map((img, i) => (
                    <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
                      <img
                        src={img}
                        className="d-block w-100"
                        alt={destino.titulo}
                        style={{ objectFit: "cover", height: "400px" }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carousel${destino.id}`}
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carousel${destino.id}`}
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>

              <div className="card-body text-center">
                <h5 className="card-title">{destino.titulo}</h5>
                <p className="card-text">{destino.descripcion}</p>
                <p className="fw-bold text-primary">
                  ${destino.precio.toLocaleString("es-CL")}
                </p>
              </div>

              <div className="card-footer bg-transparent border-0 d-flex gap-2">
                <Button variant="outline-success" className="flex-fill" onClick={() => agregarAlCarrito(destino)}>
                  <i className="bi bi-cart-plus"></i> Añadir al carrito
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinoCarrusel;


