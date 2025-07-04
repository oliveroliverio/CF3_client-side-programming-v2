import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
    const imageUrl = movie.imageURL || movie.imageUrl;
    const navigate = useNavigate();

    return (
        <Card className="h-100 shadow-sm border-0 bg-light">
            <div style={{ height: '280px', overflow: 'hidden' }} className="bg-secondary bg-opacity-10">
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
                        <p className="text-muted small">No image available</p>
                    </div>
                )}
            </div>
            <Card.Body className="d-flex flex-column p-2 p-md-3">
                <Card.Title className="mb-1 fs-6 fw-bold text-truncate" title={movie.title}>
                    {movie.title}
                </Card.Title>
                <Card.Text className="text-muted small mb-2">
                    {movie.director?.name || <span className="fst-italic">Director N/A</span>}
                </Card.Text>
                <Button
                    variant="primary"
                    size="sm"
                    className="mt-auto align-self-stretch"
                    onClick={() => navigate(`/movies/${movie._id}`)}
                >
                    View
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
    }).isRequired
};