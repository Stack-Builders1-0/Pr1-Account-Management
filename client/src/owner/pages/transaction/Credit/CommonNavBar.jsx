import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

function CommonNavbar() {
  return (
    <Navbar sticky="top" bg="light" expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/transaction/credittransaction/add"}>
              Add
            </Nav.Link>

            <Nav.Link
              as={Link}
              to={"/transaction/credittransaction/settlepayment"}
            >
              Settle
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CommonNavbar;
