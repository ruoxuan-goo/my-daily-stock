import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import dslogo from "../img/dslogo.png";

export default function Header() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "black" }}
        variant="dark"
      >
        <Navbar.Brand className="ms-4" href="/">
          <img
            src={dslogo}
            className="nav-logo d-inline-block align-top"
            alt="Daily Stock logo"
            width="130"
          />
        </Navbar.Brand>
        <Navbar.Toggle className="me-4" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="ms-4 nav-item">
              Home
            </NavLink>
            <NavLink to="/stocks" className="ms-4  nav-item">
              Stocks
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
