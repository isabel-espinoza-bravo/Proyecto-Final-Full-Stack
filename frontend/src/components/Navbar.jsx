import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          🌍 Chabela’s Bon Voyage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Registrarse
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/perfil">
                  Hola, {nombre?.split(" ")[0]} 👋
                </Nav.Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
