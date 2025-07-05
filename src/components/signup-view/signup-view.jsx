import { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

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

        // Format birthday in YYYY-MM-DD format if it's not already
        if (data.birthday) {
            data.birthday = new Date(data.birthday).toISOString().split('T')[0];
        }

        axios.post("https://myflix2-54ee4b2daeee.herokuapp.com/users", data)
            .then(response => {
                console.log("Signup response status:", response.status);
                console.log("Signup successful:", response.data);
                alert("Signup successful");
                window.location.reload();
            })
            .catch(error => {
                console.error("Signup error:", error);
                
                // Handle different types of errors
                if (error.response) {
                    // The request was made and the server responded with a status code outside of 2xx
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                    
                    // Extract error message from response
                    const errorMessage = error.response.data && error.response.data.error 
                        ? error.response.data.error 
                        : `Signup failed: ${error.response.status}`;
                    setError(errorMessage);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("Error request:", error.request);
                    setError("No response from server. Please try again later.");
                } else {
                    // Something happened in setting up the request
                    console.error("Error message:", error.message);
                    setError(`Network error: ${error.message}`);
                }
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