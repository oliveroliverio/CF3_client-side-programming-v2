import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie, setSelectedMovie }) => {
    const imageUrl = movie.imageURL || movie.imageUrl;

    return (
        <Card className="h-100 shadow-sm border-0 bg-light">
            <div style={{ height: '350px', overflow: 'hidden' }} className="bg-secondary bg-opacity-10">
                {imageUrl ? (
                    <Card.Img
                        variant="top"
                        src={imageUrl}
                        alt={movie.title}
                        className="w-100 h-100 object-fit-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                        }}
                    />
                ) : (
                    <div className="d-flex justify-content-center align-items-center h-100 bg-light">
                        <p className="text-muted fs-5">No image available</p>
                    </div>
                )}
            </div>
            <Card.Body className="d-flex flex-column p-3 p-lg-4">
                <Card.Title className="mb-2 fs-5 fw-bold text-truncate">{movie.title}</Card.Title>
                <Card.Text className="text-muted fs-6 mb-3">
                    {movie.director?.name || <span className="fst-italic">Director unknown</span>}
                </Card.Text>
                <Button
                    variant="primary"
                    size="sm"
                    className="mt-auto align-self-start"
                    onClick={() => setSelectedMovie(movie)}
                >
                    View Details
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