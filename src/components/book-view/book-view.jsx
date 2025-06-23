export const BookView = ({ book }) => {
    return (
        <>
            <img src={book.image} alt="" />
            <div>
                <span>Title: </span>
                <span>{book.title}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{book.author}</span>
            </div>
        </>
    )
}