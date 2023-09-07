import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const NavigationMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [navigate]);


  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login')

  }
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">Saravana Agro Service</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/home" style={{ fontSize: '18px' }}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/product" style={{ fontSize: '18px' }}>
                Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/sale" style={{ fontSize: '18px' }}>
                Services
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => logoutHandler()} style={{ fontSize: '18px' }}>
                <FaSignOutAlt style={{ marginRight: '5px' }} />
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
