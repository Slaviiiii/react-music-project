import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { MusicContext } from "../../contexts/MusicContext";

export const Create = () => {
    const { onMusicCreateSubmit } = useContext(MusicContext);
    const { values, changeHandler, onSubmit } = useForm({
        name: '',
        imgUrl: '',
        genre: '',
        artist: '',
        description: '',
        likes: 0,
    }, onMusicCreateSubmit);

    return (
        <section id="create">
            <div className="form">
                <h2>Create Music</h2>
                <form className="create-form" method="POST" onSubmit={onSubmit}>
                    <input value={values.name} onChange={changeHandler} type="text" name="name" id="name" placeholder="Name" />
                    <input value={values.imgUrl} onChange={changeHandler} type="text" name="imgUrl" id="imageUrl" placeholder="Image" />
                    <input value={values.genre} onChange={changeHandler} type="text" name="genre" id="genre" placeholder="Genre" />
                    <input value={values.artist} onChange={changeHandler} type="text" name="artist" id="artist" placeholder="Artist" />
                    <textarea value={values.description} onChange={changeHandler} id="description" name="description" placeholder="Description" rows="4" cols="50"></textarea>

                    <button type="submit">send</button>
                </form>
            </div>
        </section>
    );
};