import PropTypes from 'prop-types';

export const MovieCard = ({ movie, setSelectedMovie }) => {
    return (
        <div
            className="movie-card"
            onClick={() => setSelectedMovie(movie)}
        >
            <div className="movie-poster">
                <img src={movie.imageUrl} alt={movie.title} />
            </div>
            <div className="movie-title">
                <h2>{movie.title}</h2>
            </div>
        </div>
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