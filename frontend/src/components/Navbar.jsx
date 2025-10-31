import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart() || { cart: [] }; // Previene error si el contexto no carga

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{ backgroundColor: "#f6d6c8" }}
    >
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold" style={{ color: "#5a3e36" }}>
          ✈️ Viajes con Isa
        </Link>

        {/* Botones de navegación */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="btn btn-outline-secondary rounded-pill px-3">
            Inicio
          </Link>

          <Link
            to="/reservas"
            className="btn btn-outline-secondary rounded-pill px-3"
          >
            Mis Reservas
          </Link>

          {/* Carrito */}
          <Link
            to="/cart"
            className="btn btn-outline-success position-relative rounded-pill px-3"
          >
            <i className="bi bi-cart3"></i>
            {cart.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
