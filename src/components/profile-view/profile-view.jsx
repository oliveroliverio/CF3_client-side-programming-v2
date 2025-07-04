// profile-view.jsx
import { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Container, Alert } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import axios from "axios";

export const ProfileView = ({ user, token, movies, onUserUpdate }) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday ? user.birthday.slice(0, 10) : "");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Filter favorite movies
    const favoriteMovies = movies.filter(movie =>
        user.favoriteMovies?.includes(movie._id)
    );

    // Update user info
    const handleUpdate = async (event) => {
        event.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        const updatedData = {
            username,
            email,
            birthday
        };

        // Only include password if it's not empty
        if (password) {
            updatedData.password = password;
        }

        try {
            const response = await axios.put(
                `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}`,
                updatedData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Update local storage and parent component
            localStorage.setItem("user", JSON.stringify(response.data));
            onUserUpdate(response.data);
            setSuccessMessage("Profile updated successfully!");
            setPassword(""); // Clear password field
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("Failed to update profile. Please try again.");
        }
    };

    // Deregister user
    const handleDeregister = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await axios.delete(
                    `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                // Clear user data from localStorage and redirect to login
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href = "/login";
            } catch (error) {
                console.error("Error deleting account:", error);
                setErrorMessage("Failed to delete account. Please try again.");
            }
        }
    };

    // Remove movie from favorites
    const handleRemoveFavorite = async (movieId) => {
        try {
            await axios.delete(
                `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}/movies/${movieId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Update local storage and parent component
            const updatedUser = {
                ...user,
                favoriteMovies: user.favoriteMovies.filter(id => id !== movieId)
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            onUserUpdate(updatedUser);
        } catch (error) {
            console.error("Error removing favorite:", error);
            setErrorMessage("Failed to remove from favorites. Please try again.");
        }
    };

    return (
        <Container className="profile-view">
            <Row className="mb-4">
                <Col>
                    <h2 className="mb-4">Your Profile</h2>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                </Col>
            </Row>

            <Row>
                {/* User Information Form */}
                <Col md={6} className="mb-4">
                    <Card className="p-4">
                        <h3 className="mb-3">Update Information</h3>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>New Password (leave blank to keep current):</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBirthday" className="mb-3">
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between mt-4">
                                <Button variant="primary" type="submit">
                                    Update Profile
                                </Button>
                                <Button variant="danger" onClick={handleDeregister}>
                                    Delete Account
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>

                {/* Favorite Movies */}
                <Col md={6}>
                    <Card className="p-4 h-100">
                        <h3 className="mb-3">Your Favorite Movies</h3>
                        {favoriteMovies.length === 0 ? (
                            <p className="text-muted">You haven't added any favorite movies yet.</p>
                        ) : (
                            <Row xs={1} md={2} className="g-3">
                                {favoriteMovies.map(movie => (
                                    <Col key={movie._id}>
                                        <div className="position-relative">
                                            <MovieCard movie={movie} />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 end-0 m-2"
                                                onClick={() => handleRemoveFavorite(movie._id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};