import React from "react";

export default function Home() {
  return (
    <main className="container my-5">
      <div
        className="row justify-content-center align-items-center bg-light rounded shadow p-4"
        style={{ backgroundColor: "#f9eae1", minHeight: "400px" }}
      >
        <div className="col-lg-6 d-flex flex-column justify-content-center text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="mb-3" style={{ color: "#6b4c3b" }}>
            ¿Quiénes somos?
          </h2>
          <p className="lead" style={{ color: "#5a3e36" }}>
            Somos una agencia de viajes apasionada por conectar a las personas
            con experiencias inolvidables. Ofrecemos tours por Chile y el
            mundo con profesionalismo y amor por la naturaleza.
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src="/assets/ExplorandoCL.png"
            alt="Paisaje turístico"
            className="img-fluid w-100 rounded"
            style={{ objectFit: "cover", maxHeight: "400px" }}
          />
        </div>
      </div>
    </main>
  );
}

