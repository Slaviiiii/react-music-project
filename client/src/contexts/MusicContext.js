import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { musicServiceFactory } from "../services/musicService";

export const MusicContext = createContext();

export const MusicProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [music, setMusic] = useLocalStorage("music", []);
    const { token } = useContext(AuthContext);

    const musicService = musicServiceFactory(token);

    useEffect(() => {
        musicService.getAll()
            .then(result => {
                setMusic(result);
            })
    }, [musicService]);

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

    const contextvalues = {
        onMusicCreateSubmit,
        onMusicEditSubmit,
        music,
        setMusic
    };

    return (
        <MusicContext.Provider value={contextvalues}>
            {children}
        </MusicContext.Provider>
    );
}