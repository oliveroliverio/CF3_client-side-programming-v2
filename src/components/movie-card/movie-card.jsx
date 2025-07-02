import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie, setSelectedMovie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.imageURL} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director?.name}</Card.Text>
                <Button variant="primary" onClick={() => setSelectedMovie(movie)}>
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

// Add PropTypes
MovieCard.propTypes = {
    movie: PropTypes.shape({
        // Remove capitalized duplicates, keep only lowercase
        title: PropTypes.string,
        imageUrl: PropTypes.string,
        _id: PropTypes.string,
        // Add other properties that might be needed
        genre: PropTypes.object,
        director: PropTypes.object,
        description: PropTypes.string
    }).isRequired,
    setSelectedMovie: PropTypes.func.isRequired
};