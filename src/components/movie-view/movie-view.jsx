export const MovieView = ({ selectedMovie, onBackClick }) => {
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

                <button onClick={onBackClick}>Back</button>
            </div>
        </div>
    );
};