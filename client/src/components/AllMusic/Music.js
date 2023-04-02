import { Link } from "react-router-dom";

export const Music = ({
    name,
    imgUrl,
    artist,
    _id
}) => {
    return (
        <div className="music-item">
            <img className="music-img" src={imgUrl} alt={`${artist}--${name}`} />
            <div className="music-details">
                <p>
                    <strong className="strong-name">Name: </strong><span className="music-name">{name}</span>
                </p>
                <p>
                    <strong className="strong-artist">Artist: </strong><span className="music-artist">{artist}</span>
                </p>
                <Link to={`/details/${_id}`} className="details-btn">Details</Link>
            </div>
        </div>
    );
};

// export const Music = ({
//     name,
//     imgUrl,
//     artist,
//     _id
// }) => {
//     return (
//         <div className="music">
//             <img src={imgUrl} alt={`${artist}--${name}`} />
//             <p>
//                 <strong>Name: </strong><span className="name">{name}</span>
//             </p>
//             <p><strong>Artist:</strong><span className="artist">{artist}</span></p>
//             <Link to={`/details/${_id}`} className="details-btn">Details</Link>
//         </div>
//     );
// };