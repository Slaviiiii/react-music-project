import { Link } from "react-router-dom";

export const Music = ({
    name,
    imgUrl,
    genre,
    artist,
    description,
    _id
}) => {
    return (
        <div className="music">
            <img src={imgUrl} alt={`${artist}--${name}`} />
            <p>
                <strong>Name: </strong><span className="name">{name}</span>
            </p>
            <p><strong>Artist:</strong><span className="artist">{artist}</span></p>
            <Link to={`/details/${_id}`} className="details-btn">Details</Link>
        </div>
    );
};