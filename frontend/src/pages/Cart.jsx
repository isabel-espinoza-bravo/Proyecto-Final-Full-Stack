import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

export default function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const formatoCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Tu carrito está vacío",
        text: "Agrega destinos antes de pagar.",
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Tu Carrito de Viajes</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">No tienes productos en tu carrito.</p>
      ) : (
        <>
          <div className="row g-4">
            {cart.map((item, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={item.imagenes?.[0]}
                    alt={item.nombre}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5>{item.nombre}</h5>
                    <p className="text-muted small">{item.descripcion}</p>
                    <p className="fw-bold mb-1">{formatoCLP(item.precio)}</p>
                    <p className="text-muted mb-0">
                      <i className="bi bi-people"></i> {item.personas} pasajero(s)
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => removeFromCart(index)}
                    >
                      <i className="bi bi-trash"></i> Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <h4>Total: {formatoCLP(total)}</h4>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btn btn-secondary" onClick={clearCart}>
                Vaciar carrito
              </button>
              <button className="btn btn-success" onClick={handleCheckout}>
                Proceder al pago
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
