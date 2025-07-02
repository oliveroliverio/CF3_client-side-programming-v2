import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export const MovieView = ({ selectedMovie, onBackClick, similarMovies, setSelectedMovie }) => {
    return (
        <Container>
            <Row className="my-4">
                <Col md={8}>
                    <Card>
                        <Card.Img variant="top" src={selectedMovie.imageURL} />
                        <Card.Body>
                            <Card.Title>{selectedMovie.title}</Card.Title>
                            <Card.Text>Director: {selectedMovie.director?.name}</Card.Text>
                            <Card.Text>Genre: {selectedMovie.genre?.name}</Card.Text>
                            <Card.Text>{selectedMovie.description}</Card.Text>
                            <Button variant="primary" onClick={onBackClick}>Back</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <h4>Similar Movies</h4>
                    {similarMovies.length > 0 ? (
                        similarMovies.map(movie => (
                            <Card className="mb-3" key={movie._id}>
                                <Card.Img variant="top" src={movie.imageURL} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Button variant="link" onClick={() => setSelectedMovie(movie)}>
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


// Update MovieView.propTypes
MovieView.propTypes = {
    selectedMovie: PropTypes.shape({
        // Remove capitalized duplicates, keep only lowercase
        title: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        genre: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string
        }),
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string
        }),
        _id: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    similarMovies: PropTypes.array.isRequired,
    setSelectedMovie: PropTypes.func.isRequired
};