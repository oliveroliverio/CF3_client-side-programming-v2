export const BookCard = ({ title, image_url, author }) => {
    return <>
        <img src={image_url} alt="" />
        <div>
            <h2 >{title}</h2>
            <span>{author}</span>
        </div>
    </>
};