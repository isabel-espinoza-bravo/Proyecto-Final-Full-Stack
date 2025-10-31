import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CarritoLateral({ show, handleClose }) {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCart();
  const navigate = useNavigate();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>🛍️ Tu Carrito</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map((item, index) => (
              <div key={index} className="border-b mb-3 pb-2">
                <strong>{item.titulo}</strong>
                <p>Fechas: {item.fechaInicio} → {item.fechaFin}</p>
                <p>Personas: {item.personas}</p>
                <p>Precio: ${item.precio.toLocaleString("es-CL")}</p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}

            <h5>Total: ${total.toLocaleString("es-CL")}</h5>
            <div className="mt-3 d-flex gap-2">
              <Button variant="outline-danger" onClick={vaciarCarrito}>
                Vaciar carrito
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  handleClose();
                  navigate("/checkout");
                }}
              >
                Ir al pago 💳
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
