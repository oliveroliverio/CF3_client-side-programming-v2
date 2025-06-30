export const MovieView = ({ selectedMovie, onBackClick }) => {
    return (
        <div className="movie-view">
            <div className="movie-poster">
                <img src={selectedMovie.imageUrl} alt={selectedMovie.title} />
            </div>
            <div className="movie-details">
                <div className="movie-title">
                    <h2>{selectedMovie.title}</h2>
                </div>
                <div className="movie-description">
                    <span>Description: </span>
                    <span>{selectedMovie.description}</span>
                </div>
                <div className="movie-genre">
                    <span>Genre: </span>
                    <span>{selectedMovie.genre}</span>
                </div>
                <div className="movie-director">
                    <span>Director: </span>
                    <span>{selectedMovie.director}</span>
                </div>
                <div className="movie-release">
                    <span>Release Year: </span>
                    <span>{selectedMovie.releaseYear}</span>
                </div>
                <button
                    onClick={onBackClick}
                    className="back-button"
                >
                    Back
                </button>
            </div>
        </div>
    );
};
