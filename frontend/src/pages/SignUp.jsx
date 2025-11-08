// src/pages/SignUp.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import.meta.env.VITE_API_URL

const SignUp = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ URL base del backend Render
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";


  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_URL}/users`, {
        nombre,
        email,
        password,
      });

      setSuccess("🎉 Usuario registrado con éxito");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("❌ Error al registrar:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error al registrar. Intenta con otro correo.");
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Crear Cuenta</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Registrarme
        </Button>
      </Form>

      <p className="mt-3 text-center">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-decoration-none">
          Inicia sesión
        </a>
      </p>
    </Container>
  );
};

export default SignUp;

   

          
