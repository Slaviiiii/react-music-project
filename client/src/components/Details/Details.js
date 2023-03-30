import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";

export const Details = () => {
    const { userId, setMusic } = useContext(AuthContext);
    const { musicId } = useParams();
    const [detailsMusic, setDetailsMusic] = useState({});
    const musicService = useService(musicServiceFactory);
    const isOwner = userId === detailsMusic._ownerId;
    const navigate = useNavigate();

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setDetailsMusic(result);
            });
    }, [musicService, musicId]);

    const onDelete = async (musicId) => {
        const result = window.confirm("Are you sure you want to delete this music?");

        if (result === true) {
            await musicService.deleteFunc(musicId);

            setMusic(state => state.filter(x => x._id !== musicId));
            navigate('/allMusic');
        }
    };

    return (
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src={detailsMusic.imgUrl} alt={`${detailsMusic.artist}--${detailsMusic.name}`} />

                <p id="details-name">
                    Name: <span id="name">{detailsMusic.name}</span>
                </p>

                <p id="details-artist">
                    Artist: <span id="artist">{detailsMusic.artist}</span>
                </p>

                <p id="details-genre">
                    Genre: <span id="genre">{detailsMusic.genre}</span>
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Description:</h4>
                        <span>{detailsMusic.description}</span>
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