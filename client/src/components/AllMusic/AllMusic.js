import { useContext, useState } from "react";

import Music from "./Music";

import { MusicContext } from "../../contexts/MusicContext";
import { useForm } from "react-hook-form";

export const AllMusic = () => {
    const { music } = useContext(MusicContext);
    const [allMusic, setAllMusic] = useState(music);
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValue: {
            search: ""
        }
    })

    const onSearchSubmit = async (data) => {
        if(data.search.length === 0) {
            setAllMusic(music);
        } else {
            setAllMusic(allMusic.filter(x => x.name.toLowerCase().startsWith(data.search) === true))
        }
    };

    return (
        <section id="all-music">
            <form id="search" onSubmit={handleSubmit(onSearchSubmit)}> 
                <input
                {...register("search", {
                    required: false,
                })}
                 type="text"
                 placeholder="Search..."
                 maxLength="20" name="search" /> 
                <button type="submit"><i className="fa-sharp fa-solid fa-magnifying-glass"></i> Search</button> 
            </form>
            <h2>All Created Music</h2>     

            {allMusic.map(x =>
                <Music key={`${x._id}-${x.artist}-${x.name}`} {...x} />
            )}

            {allMusic.length === 0 && (
                <h2>There are no creations on this page.</h2>
            )}
        </section>
    );
};