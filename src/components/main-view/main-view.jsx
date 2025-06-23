let books = [
    { id: 1, title: "Eloquent JavaScript" },
    { id: 2, title: "Mastering JavaScript Functional Programming" },
    { id: 3, title: "JavaScript: The Good Parts" },
    { id: 4, title: "JavaScript: The Definitive Guide" },
    { id: 5, title: "The Road to React" },
];


export const MainView = () => {
    return (
        <div>
            {books.map((b) => {
                return <div key={b.id}>{b.title}</div>
            })}
        </div>
    );
};