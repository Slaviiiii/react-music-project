import { Music } from "./Music";

export const AllMusic = ({
    music
}) => {
    console.log(music);
    return (
        <section id="all-music">
            <h2>All Music</h2>

            {music.map(x =>
                <Music key={`${x._id}-${x.artist}-${x.name}`} {...x} />
            )}

            {music.length === 0 && (
                <h2>There is no music yet.</h2>
            )}
        </section>
    );
};