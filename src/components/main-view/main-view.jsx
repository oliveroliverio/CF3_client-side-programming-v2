import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    // const HEROKU_API_URL = process.env.HEROKU_API_URL;
    const HEROKU_API_URL = "https://myflix2-54ee4b2daeee.herokuapp.com"

    const [movies, setMovies] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!token) return;
        fetch(HEROKU_API_URL + '/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Movie data structure:", JSON.stringify(data[0], null, 2));
                setMovies(data);
            })
            .catch(error => console.error("Error fetching movies:", error));
    }, []);


    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        // Find movies with the same genre as the selected movie
        const similarMovies = movies.filter(movie =>
            // Don't include the current movie
            movie._id !== selectedMovie._id &&
            // Match on genre
            movie.genre && selectedMovie.genre &&
            movie.genre.name === selectedMovie.genre.name
        ).slice(0, 5); // Limit to 5 similar movies

        return (
            <MovieView
                selectedMovie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
                similarMovies={similarMovies}
                setSelectedMovie={setSelectedMovie}
            />
        );
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

// No PropTypes needed for MainView since it doesn't receive props
// If you convert it to receive props in the future, add them here