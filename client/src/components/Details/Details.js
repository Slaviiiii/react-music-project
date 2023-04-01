import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";

export const Details = ({
    onDelete
}) => {
    const auth = localStorage.getItem("auth");
    const { musicId } = useParams();
    const [music, setMusic] = useState({});
    const musicService = useService(musicServiceFactory);

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setMusic(result);
            });
    }, [musicId]);

    const isOwner = auth._id === music._ownerId;
    console.log("userId:");
    console.log(userId);
    console.log("ownerId:");
    console.log(music._ownerId);

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