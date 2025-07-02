import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export const NavbarView = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {user && (
                            <>
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