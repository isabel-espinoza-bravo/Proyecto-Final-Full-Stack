import React from "react";
import destinos from "../data/destinos";
import { Link } from "react-router-dom";

export default function Catalog() {
  return (
    <div className="container my-4">
      <h2 className="text-center text-muted mb-4">Catálogo de Destinos</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {destinos.map((d) => (
          <div className="col" key={d.id}>
            <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: d.color }}>
              <img src={d.imagenes[0]} className="card-img-top" style={{height: 220, objectFit:"cover"}} alt={d.nombre}/>
              <div className="card-body">
                <h5 className="card-title">{d.nombre}</h5>
                <p className="text-muted">{d.descripcion}</p>
                <div className="d-flex justify-content-between">
                  <span className="badge text-bg-light">{d.noches} noches</span>
                  <span className="fw-bold">${d.precio.toLocaleString("es-CL")} CLP</span>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex gap-2">
                <Link to={`/producto/${d.id}`} className="btn btn-outline-secondary flex-fill">Ver detalles</Link>
                <Link to={`/producto/${d.id}`} className="btn btn-success flex-fill"><i className="bi bi-cart-plus" /> Añadir</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
