// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ URL base del backend en Render (centralizada)
  const API_URL = "https://travel-ecommerce-viajes-con-isa-ndz6.onrender.com/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Petición al backend Render
      const res = await axios.post(`${API_URL}/users/login`, { email, password });

      // Guardar token y nombre en localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("nombre", res.data.nombre);
      localStorage.setItem("email", email);

      console.log("✅ Usuario autenticado:", res.data.nombre);

      // Redirigir al perfil
      navigate("/perfil");
    } catch (err) {
      console.error("❌ Error en login:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
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

        <div className="d-grid">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </div>
      </Form>

      <p className="mt-3 text-center">
        ¿No tienes cuenta?{" "}
        <a href="/signup" className="text-decoration-none">
          Regístrate
        </a>
      </p>
    </Container>
  );
};

export default Login;
