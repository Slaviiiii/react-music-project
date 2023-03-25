import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as musicService from "../../services/musicService";

export const Delete = () => {
    const { musicId } = useParams();
    const [music, setMusic] = useState({});

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setMusic(result);
            });
    });

    const onDelete = (music) => {

    };

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

                <p>
                    Are you sure you want to delete this music?
                </p>

                <div id="actions">
                    <button onClick={() => onDelete(music)} type="button">Procceed</button>
                </div>
            </div>
        </section>
    );
};