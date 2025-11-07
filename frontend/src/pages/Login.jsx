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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Petición al backend
      const res = await axios.post("http://localhost:4000/api/users/login", {
        email,
        password,
      });

      // Guardar token y nombre del usuario
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("nombre", res.data.nombre);

      // Mensaje de confirmación en consola (opcional)
      console.log("✅ Usuario autenticado:", res.data.nombre);

      // Redirigir al perfil o a reservas
      navigate("/perfil");
    } catch (err) {
      console.error("❌ Error en login:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Usuario o contraseña incorrecta");
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
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{" "}
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </div>
      </Form>

      <p className="mt-3 text-center">
        ¿No tienes cuenta? <a href="/signup">Regístrate</a>
      </p>
    </Container>
  );
};

export default Login;

