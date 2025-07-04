import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarView = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" className="me-3">Home</Nav.Link>
                                <Nav.Link as={Link} to="/profile" className="me-3">Profile</Nav.Link>
                                <Navbar.Text className="me-3">
                                    Welcome, {user.username}
                                </Navbar.Text>
                                <Button variant="danger" onClick={onLoggedOut}>Sign Out</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};