export const BookCard = ({ book, setSelectedBook }) => {
    return (
        <div onClick={() => setSelectedBook(book)}>
            <img src={book.image} alt={book.title} />
            <div>
                <h2>{book.title}</h2>
                <span>{book.author}</span>
            </div>
        </div>
    );
};