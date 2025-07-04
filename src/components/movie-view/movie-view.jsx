import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const MovieView = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`https://myflix2-54ee4b2daeee.herokuapp.com/movies/id/${movieId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setMovie(response.data);

                // If we want to fetch similar movies, we can do it here
                // For now, we'll just use the movies array from the parent
                // and filter by genre
                const moviesResponse = await axios.get('https://myflix2-54ee4b2daeee.herokuapp.com/movies', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const similar = moviesResponse.data.filter(m =>
                    m._id !== response.data._id &&
                    m.genre?.name === response.data.genre?.name
                ).slice(0, 5);

                setSimilarMovies(similar);
            } catch (error) {
                console.error("Error fetching movie:", error);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [movieId, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <Container>
            <Row className="my-4">
                <Col md={8}>
                    <Card>
                        <Card.Img variant="top" src={movie.imageURL || movie.imageUrl} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>Director: {movie.director?.name || 'N/A'}</Card.Text>
                            <Card.Text>Genre: {movie.genre?.name || 'N/A'}</Card.Text>
                            <Card.Text>{movie.description}</Card.Text>
                            <Button variant="primary" onClick={() => navigate(-1)}>Back</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <h4>Similar Movies</h4>
                    {similarMovies.length > 0 ? (
                        similarMovies.map(movie => (
                            <Card className="mb-3" key={movie._id}>
                                <Card.Img variant="top" src={movie.imageURL || movie.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Button variant="link" onClick={() => navigate(`/movies/${movie._id}`)}>
                                        View
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No similar movies found</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

MovieView.propTypes = {};