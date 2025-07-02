import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({ selectedMovie, onBackClick, similarMovies, setSelectedMovie }) => {
    return (
        <div className="movie-view">
            <div className="movie-poster">
                <img src={selectedMovie.ImagePath || selectedMovie.imageUrl} alt={selectedMovie.Title || selectedMovie.title} />
            </div>
            <div className="movie-details">
                <h2>{selectedMovie.title || selectedMovie.title}</h2>

                {/* Handle nested Genre object */}
                <h3>Genre:</h3>
                <p>{selectedMovie.genre ? selectedMovie.genre.name : 'Unknown'}</p>

                {/* Handle nested Director object */}
                <h3>Director:</h3>
                <p>{selectedMovie.director ? selectedMovie.director.name : 'Unknown'}</p>

                <h3>Description:</h3>
                <p>{selectedMovie.description || selectedMovie.description}</p>

                <hr />
                <h2>Similar Movies</h2>
                <div className="similar-movies">
                    {similarMovies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            setSelectedMovie={setSelectedMovie}
                        />
                    ))}
                </div>

                <button onClick={onBackClick}>Back</button>
            </div>
        </div>
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