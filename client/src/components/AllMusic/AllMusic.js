import { useContext, useState } from "react";

import Music from "./Music";

import { MusicContext } from "../../contexts/MusicContext";
import { useForm } from "react-hook-form";

export const AllMusic = () => {
    const { music } = useContext(MusicContext);
    const [allMusic, setAllMusic] = useState(music);
    let isFiltered = false;
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
            setAllMusic(music.filter(x => x.name.toLowerCase().startsWith(data.search.toLowerCase()) === true));
            isFiltered = true;
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
                <div>
                    <h2>There are no creations on this page.</h2>
                    <img id='no-music' src="/images/no-music.png" alt="no music" />
                </div>              
            )}
        </section>
    );
};