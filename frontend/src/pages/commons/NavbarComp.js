import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/NavbarComp.css";

function NavbarComp() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
    >
      <Container className="mt-0">
        <Navbar.Brand href="/">Car Care 360</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/features">Features</Nav.Link> */}
            {/* <NavDropdown title="Vehicle Systems" id="collasible-nav-dropdown"> */}
            {/* <NavDropdown.Item href="#tank-system">
                Tank System
              </NavDropdown.Item> */}
            {/* Add more items if needed */}
            {/* </NavDropdown> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
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
