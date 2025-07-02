export const BookView = ({ selectedBook, onBackClick }) => {
    return (
        <>
            <img src={selectedBook.image} alt="" />
            <div>
                <span>Title: </span>
                <span>{selectedBook.title}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{selectedBook.author}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </>
    )
}