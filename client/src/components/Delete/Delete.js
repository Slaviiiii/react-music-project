import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { musicServiceFactory } from "../../services/musicService";
import { useService } from "../../hooks/useService";

export const Delete = ({
    onDelete
}) => {
    const { musicId } = useParams();
    const [music, setMusic] = useState({});
    const musicService = useService(musicServiceFactory);

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setMusic(result);
            });
    });

    return (
        <section id="details">
            <div id="details-delete-wrapper">
                <img id="details-img" src={music.imgUrl} alt={`${music.artist}--${music.name}`} />

                <p id="details-name">
                    Name: <span id="name">{music.name}</span>
                </p>

                <p id="details-artist">
                    Artist: <span id="artist">{music.artist}</span>
                </p>

                <p className="delete-message">
                    Are you sure you want to delete this music?
                </p>

                <div id="delete-actions">
                    <button className="procceed-btn" onClick={() => onDelete(musicId)} type="button">Finish</button>
                    <Link to={`/details/${musicId}`}>Cancel</Link>
                </div>
            </div>
        </section>
    );
};