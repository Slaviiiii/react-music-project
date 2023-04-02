import { useContext } from "react";
import { Music } from "./Music";
import { MusicContext } from "../../contexts/MusicContext";

export const AllMusic = () => {
    const { music } = useContext(MusicContext);

    return (
        <section id="all-music">
            <h2>All Created Music</h2>

            {music.map(x =>
                <Music key={`${x._id}-${x.artist}-${x.name}`} {...x} />
            )}

            {music.length === 0 && (
                <h2>There are no creations on this page.</h2>
            )}
        </section>
    );
};