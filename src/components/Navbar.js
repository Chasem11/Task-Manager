import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigationbar = ({ logout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mx-3">Task Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
          <Nav.Link as={Link} to="/add-task" className="mx-1">Add Task</Nav.Link>
          <Button variant="outline-danger" as={Link} to="/" onClick={logout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;

