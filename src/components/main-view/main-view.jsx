let books = [
    "Eloquent JavaScript",
    "Mastering JavaScript Functional Programming",
    "JavaScript: The Good Parts",
    "JavaScript: The Definitive Guide",
    "The Road to React",
]

export const MainView = () => {
    return (
        <div>
            {books.map((b) => {
                return <div>{b}</div>
            })}
        </div>
    );
};