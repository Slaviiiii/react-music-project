import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as musicService from "../../services/musicService";

export const Details = () => {
    const { musicId } = useParams();
    const [music, setMusic] = useState({});

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setMusic(result);
            });
    }, [musicId]);

    return (
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src={music.imgUrl} alt={`${music.artist}--${music.name}`} />

                <p id="details-name">
                    Name: <span id="name">{music.name}</span>
                </p>

                <p id="details-artist">
                    Artist: <span id="artist">{music.artist}</span>
                </p>

                <p id="details-genre">
                    Genre: <span id="genre">{music.genre}</span>
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Description:</h4>
                        <span>{music.description}</span>
                    </div>
                </div>

                {/* <!--Edit and Delete are only for creator--> */}
                <div id="actions">
                    <Link to={`/edit/${musicId}`} id="edit-btn">Edit</Link>
                    <Link to={`/delete/${musicId}`} id="delete-btn">Delete</Link>
                </div>
            </div>
        </section>
    );
};