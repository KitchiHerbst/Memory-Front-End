import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <Navbar bg='#1e2833' sticky="top">
      <Navbar.Brand href="/home" className="text-light">
        MEMORY
      </Navbar.Brand>
      <Nav className="mr-auto text-light">
        <Nav.Link href="/home" className="text-light">
          Home
        </Nav.Link>
        <Nav.Link href="/friendslist" className="text-light">
          Friends
        </Nav.Link>
        <Nav.Link href="/people" className="text-light">
          Search
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
