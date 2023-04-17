import "./AllMusic.css";
import "./Music.css";
import "./Search.css";

import { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Music from "./Music";
import { Spinner } from "../Spinner/Spinner";

import { MusicContext } from "../../contexts/MusicContext";
import { useForm } from "react-hook-form";
import { musicServiceFactory } from "../../services/musicService";

export const AllMusic = () => {
    const [allMusic, setAllMusic] = useState([]);
    const [music, setMusic] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const musicService = musicServiceFactory();

    useEffect(() => {
        musicService.getAll()
            .then(result => {
                setIsLoaded(true);
                setAllMusic(result);
                setMusic(result);
            })
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm({
        defaultValue: {
            search: "",
            artist: "",
        }
    })

    const onSearchSubmit = async (data) => {  
        if(isSearched === false) {
            setIsSearched(true);
        } else {
            setIsSearched(false);
        }

        if(data.search.length === 0 && data.artist.length === 0) {
            setMusic(allMusic);
            return;
        }
            let searchedMusic = [];
         if(data.search.length > 0) {
            searchedMusic = allMusic.filter(x => x.name.toLowerCase().startsWith(data.search.toLowerCase()) === true); 
        }
         if(data.artist.length > 0 && searchedMusic.length > 0) {
            searchedMusic = searchedMusic.filter(x => x.artist.toLowerCase().startsWith(data.artist.toLowerCase()) === true);
        } else if(data.artist.length > 0 && searchedMusic.length === 0){
            searchedMusic = allMusic.filter(x => x.artist.toLowerCase().startsWith(data.artist.toLowerCase()) === true);
        }  
            setValue("search", "");
            setValue("artist", "");
            setMusic(searchedMusic);
    }

    return (
        <section id="all-music">
            {isLoaded === false && <Spinner />}

            {isLoaded === true && (
            <>
            <form id="search" onSubmit={handleSubmit(onSearchSubmit)}> 
                <input
                {...register("search", {
                    required: false,
                })}
                    type="text"
                    placeholder="Name"
                    maxLength="20"
                 /> 
                <input
                {...register("artist", {
                    required: false,
                })}
                    type="text"
                    placeholder="Artist"
                    maxLength="20"
                 /> 
                <button type="submit"><i className="fa-sharp fa-solid fa-magnifying-glass"></i> Search</button> 
            </form>
            
            <h2>
                <i id="yellow-layer" className="fa-solid fa-layer-group"></i>
                <span id="first-half">All </span>
                <span id="second-half">Music</span>
                <i id="white-layer" className="fa-sharp fa-solid fa-layer-group"></i>
            </h2>     

            {allMusic.length === 0 && isSearched === false &&  (
                <>
                    <h2>There are no creations on this page.</h2>
                    <Link to="/create" id="be-first">Be the first who created one <i className="fa-solid fa-plus"></i></Link>  
                </>    
            )}

            {music.length === 0 && isSearched === true && (
                <>
                    <h2>There are no matches.</h2>
                </>    
            )}

            <div className="all-music-wrapper">
                {music.map(x =>
                <Music key={`${x._id}-${x.artist}-${x.name}`} {...x} />
                )}   
            </div>
            
            {music.length === 0 && (
                <div>
                    <img id='no-music' src="/images/no-music.png" alt="no music" />
                </div>              
            )}
            </>
            )}
        </section>
    );
};