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
