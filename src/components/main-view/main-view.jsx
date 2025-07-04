import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { Container, Row, Col } from 'react-bootstrap'
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

export const MainView = () => {
    const HEROKU_API_URL = "https://myflix2-54ee4b2daeee.herokuapp.com";
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${HEROKU_API_URL}/movies`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovies(response.data);
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        };

        fetchMovies();
    }, [token]);

    const handleLogout = () => {
        // Clear user data from state
        setUser(null);
        setToken(null);
        setMovies([]);

        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    if (!user) {
        return (
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={5} className="text-center">
                        <LoginView onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }} />
                        <div className="mt-3">or</div>
                        <SignupView />
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <>
            <NavbarView user={user} onLoggedOut={handleLogout} />
            <Container fluid className="main-view py-5 px-4">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            !user ? (
                                <Row className="justify-content-center">
                                    <Col md={5} className="text-center">
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                        <div className="mt-3">or</div>
                                        <SignupView />
                                    </Col>
                                </Row>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            !user ? (
                                <Row className="justify-content-center">
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                </Row>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <MovieView />
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <div>No movies found</div>
                            ) : (
                                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                                    {movies.map((movie) => (
                                        <Col key={movie._id} xl={2}>
                                            <MovieCard movie={movie} />
                                        </Col>
                                    ))}
                                </Row>
                            )
                        }
                    />
                </Routes>
            </Container>
        </>
    );
};