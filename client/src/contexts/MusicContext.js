import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { musicServiceFactory } from "../services/musicService";

export const MusicContext = createContext();

export const MusicProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const [music, setMusic] = useState([]);
    const musicService = musicServiceFactory();

    useEffect(() => {
        musicService.getAll()
            .then(result => {
                setMusic(result);
            })
    }, []);

    const onDelete = async (musicId) => {
        const result = window.confirm("Are you sure you want to delete this music?");

        if (result === true) {
            await musicService.deleteFunc(musicId);

            setMusic(state => state.filter(x => x._id !== musicId));
            navigate('/allMusic');
        }
    };

    const onMusicCreateSubmit = async (data) => {
        const newMusic = await musicService.create(data);

        navigate('/allMusic');
        setMusic(state => [...state, newMusic]);
    };

    const onMusicEditSubmit = async (data) => {
        const editedMusic = await musicService.edit(data._id, data);

        navigate(`/details/${data._id}`);
        setMusic(state => state.filter(x => x._id !== editedMusic._id));
        setMusic(state => [...state, editedMusic]);
    };

    const contextValues = {
        music,
        onDelete,
        onMusicCreateSubmit,
        onMusicEditSubmit,
    }

    return (
        <MusicContext.Provider value={contextValues} >
            {children}
        </MusicContext.Provider>
    )
};