import { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(""); // Clear any previous errors

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };

        console.log("Sending signup data:", data);

        fetch("https://myflix2-54ee4b2daeee.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log("Signup response status:", response.status);
                if (response.ok) {
                    return response.json().then(data => {
                        console.log("Signup successful:", data);
                        alert("Signup successful");
                        window.location.reload();
                    });
                } else {
                    // Try to get error message from response
                    return response.json().then(err => {
                        console.error("Signup error:", err);
                        setError(err.error || "Signup failed");
                    }).catch(e => {
                        console.error("Error parsing response:", e);
                        setError(`Signup failed: ${response.status}`);
                    });
                }
            })
            .catch((e) => {
                console.error("Fetch error:", e);
                setError(`Network error: ${e.message}`);
            });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Sign Up</Card.Title>
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
                                <Form.Group controlId="formEmail" className="mt-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBirthday" className="mt-3">
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
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