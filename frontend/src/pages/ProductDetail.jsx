import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ producto }) {
  const { agregarAlCarrito } = useCart();

  const handleAdd = () => {
    agregarAlCarrito(producto);
    alert("Producto agregado al carrito 🛒");
  };

  return (
    <div>
      <h2>{producto.titulo}</h2>
      <p>{producto.descripcion}</p>
      <p>Precio: {producto.precio.toLocaleString("es-CL")} CLP</p>
      <button onClick={handleAdd}>Agregar al carrito</button>
    </div>
  );
}
