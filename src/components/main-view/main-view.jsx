import { BookCard } from "../book-card/book-card";
import { useState } from "react";



export const MainView = () => {
    const [books, setBooks] = useState([
        { id: 1, title: "Eloquent JavaScript" },
        { id: 2, title: "Mastering JavaScript Functional Programming" },
        { id: 3, title: "JavaScript: The Good Parts" },
        { id: 4, title: "JavaScript: The Definitive Guide" },
        { id: 5, title: "The Road to React" },
    ])

    return (
        <div>
            {books.map((b) => {
                return <BookCard key={b.id} title={b.title} />
            })}
        </div>
    );
};