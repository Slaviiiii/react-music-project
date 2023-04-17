import "./Profile.css";
import { useState, useEffect, useContext } from "react";

import Music from "../AllMusic/Music";
import { Spinner } from "../Spinner/Spinner";

import { AuthContext } from "../../contexts/AuthContext";

import { musicServiceFactory } from "../../services/musicService";

export const Profile = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [music, setMusic] = useState([]);
    const { userId } = useContext(AuthContext);
    const musicService = musicServiceFactory();

    useEffect(() => {
        musicService.getAll()
            .then(result => {
                setIsLoaded(true);
                setMusic(result);
            })
    }, []);

    const userMusic = music.filter(m => m._ownerId === userId);

    return (
        <section id="all-music">
            {isLoaded === false && <Spinner /> }

            {isLoaded === true && (
            <>
                <h2>
                <i id="yellow-layer" className="fa-solid fa-layer-group"></i>
                <span id="first-half">Your </span>
                <span id="second-half">Music</span>
                <i id="white-layer" className="fa-sharp fa-solid fa-layer-group"></i>
                </h2>

                {userMusic.map(x =>
                <Music key={`${x._id}-${x.artist}-${x.name}`} {...x} />
                )}

                {userMusic.length === 0 && (
                    <h2>You have no created records. </h2>
                )}  
            </>
            )}
        </section>
    );
}