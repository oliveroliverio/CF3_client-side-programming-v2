import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const MovieCard = ({ movie, user, token, onUserUpdate }) => {
    const imageUrl = movie.imageURL || movie.imageUrl;
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(
        user?.favoriteMovies?.includes(movie._id)
    );

    const handleFavoriteClick = async (e) => {
        e.stopPropagation(); // Prevent navigating to movie page when clicking favorite

        // Add detailed request logging before API call
        console.log('Favorite operation details:', {
            operation: isFavorite ? 'remove' : 'add',
            userId: user?._id,
            username: user?.username,
            movieId: movie?._id,
            endpoint: `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}/favorites/${movie?._id}`
        });

        console.log('Auth token being used:', token ? `${token.substring(0, 15)}...` : 'No token');

        try {
            let response;

            if (isFavorite) {
                // Remove from favorites
                console.log('Attempting to remove from favorites');
                response = await axios.delete(
                    `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}/favorites/${movie._id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            } else {
                // Add to favorites
                console.log('Attempting to add to favorites');
                response = await axios.post(
                    `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}/favorites/${movie._id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }

            console.log('API response:', response);

            if (response.data) {
                // Use the user data returned from the API instead of manually updating
                const updatedUser = response.data;
                console.log('Updated user data:', updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                onUserUpdate(updatedUser);

                // Update state
                setIsFavorite(!isFavorite);
            } else {
                throw new Error("No user data returned from the API");
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
            console.error("Error response data:", error.response?.data);
            console.error("Error response status:", error.response?.status);
            console.error("Error response headers:", error.response?.headers);

            // Additional helpful debug info
            if (error.request) {
                console.error("Request was made but no response was received:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }

            alert(`Failed to update favorites. Error: ${error.response?.data?.message || error.message}`);
        }
    };

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
                {user && (
                    <Button
                        variant={isFavorite ? "danger" : "outline-danger"}
                        size="sm"
                        className="position-absolute top-0 end-0 m-2"
                        onClick={handleFavoriteClick}
                    >
                        {isFavorite ? "♥" : "♡"}
                    </Button>
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

// Update PropTypes
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        imageUrl: PropTypes.string,
        _id: PropTypes.string,
        genre: PropTypes.object,
        director: PropTypes.object,
        description: PropTypes.string
    }).isRequired,
    user: PropTypes.array,
    token: PropTypes.string
};