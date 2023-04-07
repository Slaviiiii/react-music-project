import { useContext } from "react";

import Music from "../AllMusic/Music";

import { MusicContext } from "../../contexts/MusicContext";
import { AuthContext } from "../../contexts/AuthContext";

export const Profile = () => {
    const { music } = useContext(MusicContext);
    const { userId } = useContext(AuthContext);

    const userMusic = music.filter(m => m._ownerId === userId);

    return (
        <section id="all-music">
            <h2>Your music:</h2>

            {userMusic.map(x =>
                <Music key={`${x._id}-${x.artist}-${x.name}`} {...x} />
            )}

            {userMusic.length === 0 && (
                <h2>You have no created records. </h2>
            )}
        </section>
    );
}