import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ModalReserva({ show, onClose, producto }) {
  const { addToCart } = useCart();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [pasajeros, setPasajeros] = useState(1);

  if (!show || !producto) return null;

  const handleAdd = () => {
    if (!fechaInicio || !fechaFin || !pasajeros) return;
    addToCart({
      id: producto.id || producto._id || producto.titulo,
      titulo: producto.titulo,
      precio: producto.precio,            // precio por persona
      imagen: producto.imagen,
      fechaInicio,
      fechaFin,
      pasajeros: Number(pasajeros),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-xl font-semibold mb-4">Añadir: {producto.titulo}</h3>

        <label className="block mb-2 text-sm">Fecha inicio</label>
        <input
          type="date"
          className="border rounded w-full p-2 mb-3"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <label className="block mb-2 text-sm">Fecha fin</label>
        <input
          type="date"
          className="border rounded w-full p-2 mb-3"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />

        <label className="block mb-2 text-sm">Pasajeros</label>
        <input
          type="number"
          min={1}
          className="border rounded w-full p-2 mb-4"
          value={pasajeros}
          onChange={(e) => setPasajeros(e.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 rounded bg-emerald-600 text-white" onClick={handleAdd}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

