import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/NavbarComp.css";

function NavbarComp() {
  const brandStyle = {
    color: "#00000", 
    fontWeight: "bold", 
    fontSize: "1.5rem", 
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
    >
      <Container className="mt-0">
        <Navbar.Brand as={Link} to="/" style={brandStyle}>
          Car Care 360
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <NavDropdown title="Vehicle Systems" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/engine">Engine</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/brakes">Brakes</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as={Link} to="/service-booking">Appointments</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Link to="/login">
              <Button variant="primary mr-2 mt-auto mb-2 loginBtns">
                LOGIN
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary mr-2 mt-auto mb-2 loginBtns">
                SIGNUP
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
