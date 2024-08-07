import React from "react";
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const NavbarComponents = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  const handleLogout = () => {
    // Retrieve user role from cookies
    const user = JSON.parse(Cookies.get('user') || '{}');
    const role = user.role || 'User'; // Adjust according to your actual user object

    // Clear cookies or local storage here
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('permissions');

    // Display logout notification
    Swal.fire({
      title: 'Logged Out',
      text: `${role} has been successfully logged out.`,
      icon: 'info',
      button: false,
    });

    // Redirect to login page or home page
    navigate('/login');
  };

  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/"><strong>Kasir</strong> app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button variant="outline-light" onClick={handleLogin}>Login</Button>
          <Button variant="outline-light" onClick={handleLogout} className="ms-2">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponents;
