import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { useService } from "../../hooks/useService";
import { MusicContext } from "../../contexts/MusicContext";

export const Details = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const { musicId } = useParams();
    const [music, setMusic] = useState({});
    const musicService = useService(musicServiceFactory);
    const { onDelete } = useContext(MusicContext);

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setMusic(result);
            });
    }, [musicId]);

    const isOwner = auth._id === music._ownerId;

    return (
        <section id="details">
            <div id="details-wrapper">
                <div className="back-div">
                    <Link to={`/allMusic`}>Back</Link>
                </div>

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
                {isOwner && (
                    <div id="actions">
                        <Link to={`/edit/${musicId}`} id="edit-btn">Edit</Link>
                        <Link onClick={() => onDelete(musicId)}>Delete</Link>
                    </div>
                )}
            </div>
        </section>
    );
};