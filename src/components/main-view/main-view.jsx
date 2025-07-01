import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";

export const MainView = () => {
    // const HEROKU_API_URL = process.env.HEROKU_API_URL;
    const HEROKU_API_URL = "https://myflix2-54ee4b2daeee.herokuapp.com"

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(HEROKU_API_URL + '/movies')
            .then(response => response.json())
            .then(data => {
                console.log("Movie data structure:", JSON.stringify(data[0], null, 2));
                setMovies(data);
            })
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView selectedMovie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    return (
        <div className="main-view">
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    setSelectedMovie={setSelectedMovie}
                />
            ))}
        </div>
    );
};