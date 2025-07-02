import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavbarView } from "../navbar-view/navbar-view";

export const MainView = () => {
    // const HEROKU_API_URL = process.env.HEROKU_API_URL;
    const HEROKU_API_URL = "https://myflix2-54ee4b2daeee.herokuapp.com"

    const [movies, setMovies] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

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
    }, [token]);

    const handleLogout = () => {
        // Clear user data from state
        setUser(null);
        setToken(null);
        setSelectedMovie(null);
        setMovies([]);

        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

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

    return (
        <>
            <NavbarView user={user} onLoggedOut={handleLogout} />

            {selectedMovie ? (
                <MovieView
                    selectedMovie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                    similarMovies={movies.filter(movie =>
                        // Don't include the current movie
                        movie._id !== selectedMovie._id &&
                        // Match on genre
                        movie.genre && selectedMovie.genre &&
                        movie.genre.name === selectedMovie.genre.name
                    ).slice(0, 5)} // Limit to 5 similar movies
                    setSelectedMovie={setSelectedMovie}
                />
            ) : (
                <div className="main-view">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            setSelectedMovie={setSelectedMovie}
                        />
                    ))}
                </div>
            )}
        </>
    );
};