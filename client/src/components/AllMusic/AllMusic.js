import { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Music from "./Music";

import { MusicContext } from "../../contexts/MusicContext";
import { useForm } from "react-hook-form";
import { musicServiceFactory } from "../../services/musicService";

export const AllMusic = () => {
    const [allMusic, setAllMusic] = useState([]);
    const musicService = musicServiceFactory();

    useEffect(() => {
        musicService.getAll()
            .then(result => {
                setAllMusic(result);
            })
    }, []);

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValue: {
            search: ""
        }
    })

    const onSearchSubmit = async (data) => {      
        if(data.search.length > 0) {
            setAllMusic(allMusic.filter(x => x.name.toLowerCase().startsWith(data.search.toLowerCase()) === true));
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
            <h2>
                <i className="fa-solid fa-layer-group"></i>
                <span id="first-half">All </span>
                <span id="second-half">Music</span>
                <i id="white-layer" className="fa-sharp fa-solid fa-layer-group"></i>
            </h2>     
            {allMusic.length === 0 && (
                <>
                    <h2>There are no creations on this page.</h2>
                    <Link to="/create" id="be-first">Be the first who created one <i className="fa-solid fa-plus"></i></Link>  
                </>    
            )}

            {allMusic.map(x =>
                <Music key={`${x._id}-${x.artist}-${x.name}`} {...x} />
            )}

            {allMusic.length === 0 && (
                <div>
                    <img id='no-music' src="/images/no-music.png" alt="no music" />
                </div>              
            )}
        </section>
    );
};