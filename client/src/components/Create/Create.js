import { useState } from "react";

export const Create = ({
    onMusicCreateSubmit
}) => {
    const [values, setValues] = useState({
        name: '',
        imgUrl: '',
        genre: '',
        artist: '',
        description: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onMusicCreateSubmit(values);
    }

    return (
        <section id="create">
            <div className="form">
                <h2>Create Music</h2>
                <form className="create-form" method="POST" onSubmit={onSubmit}>
                    <input value={values.name} onChange={onChangeHandler} type="text" name="name" id="name" placeholder="Name" />
                    <input value={values.imgUrl} onChange={onChangeHandler} type="text" name="imgUrl" id="imageUrl" placeholder="Image" />
                    <input value={values.genre} onChange={onChangeHandler} type="text" name="genre" id="genre" placeholder="Genre" />
                    <input value={values.artist} onChange={onChangeHandler} type="text" name="artist" id="artist" placeholder="Artist" />
                    <textarea value={values.description} onChange={onChangeHandler} id="description" name="description" placeholder="Description" rows="4" cols="50"></textarea>

                    <button type="submit">send</button>
                </form>
            </div>
        </section>
    );
};