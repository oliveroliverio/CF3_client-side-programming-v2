import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState } from "react";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Shawshank Redemption",
            imageUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
            description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
            genre: "Drama",
            director: "Frank Darabont",
            releaseYear: "1994"
        },
        {
            id: 2,
            title: "The Godfather",
            imageUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            genre: "Crime, Drama",
            director: "Francis Ford Coppola",
            releaseYear: "1972"
        },
        {
            id: 3,
            title: "The Dark Knight",
            imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            genre: "Action, Crime, Drama",
            director: "Christopher Nolan",
            releaseYear: "2008"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView selectedMovie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    return (
        <div className="main-view">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    setSelectedMovie={setSelectedMovie}
                />
            ))}
        </div>
    );
};