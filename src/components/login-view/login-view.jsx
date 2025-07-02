import { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        fetch("https://myflix2-54ee4b2daeee.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    setError("No such user");
                }
            })
            .catch((e) => {
                setError("Something went wrong");
                console.log(e);
            });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="mt-5">
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        minLength="3"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mt-3">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};