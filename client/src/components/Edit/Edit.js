import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { MusicContext } from "../../contexts/MusicContext";

export const Edit = () => {
    const { musicId } = useParams();
    const [values, setValues] = useState({});
    const musicService = musicServiceFactory();
    const { onMusicEditSubmit } = useContext(MusicContext);

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setValues(result);
            });
    }, [musicId]);

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onMusicEditSubmit(values);
    };

    return (
        <section id="edit">
            <div className="form">
                <Link to={`/details/${musicId}`}>Back</Link>
                <h2>Edit Music</h2>
                <form className="edit-form" method="PUT" onSubmit={onSubmit}>
                    <input defaultValue={values.name} onChange={onChangeHandler} type="text" name="name" id="name" />
                    <input defaultValue={values.imgUrl} onChange={onChangeHandler} type="text" name="imgUrl" id="imageUrl" />
                    <input defaultValue={values.genre} onChange={onChangeHandler} type="text" name="genre" id="genre" />
                    <input defaultValue={values.artist} onChange={onChangeHandler} type="text" name="artist" id="artist" />
                    <textarea defaultValue={values.description} onChange={onChangeHandler} id="description" name="description" rows="3" cols="50" maxLength="140"></textarea>

                    <button type="submit">send</button>
                </form>
            </div>
        </section>
    );
};