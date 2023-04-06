import { useContext } from "react";

import { MusicContext } from "../../contexts/MusicContext";

import { useForm } from "react-hook-form";

export const Create = () => {
    const { onMusicCreateSubmit } = useContext(MusicContext);
    const { register, handleSubmit, formState: { errors } } = useForm();



    return (
        <section id="create">
            <div className="form">
                <h2>Create Music</h2>
                <form className="create-form" method="POST" onSubmit={handleSubmit(onMusicCreateSubmit)}>
                    <input type="text" {...register("name", { required: true, minLength: 3, maxLength: 20 })} id="name" placeholder="Name" />
                    <input {...register("imgUrl", { required: true, })} type="text" id="imageUrl" placeholder="Image" />
                    <input {...register("genre", { required: true, minLength: 3, maxLength: 20 })} type="text" id="genre" placeholder="Genre" />
                    <input {...register("artist", { required: true, minLength: 3, maxLength: 20 })} type="text" name="artist" id="artist" placeholder="Artist" />
                    <textarea {...register("description", { required: true, minLength: 10, maxLength: 140 })} id="description" name="description" placeholder="Description" maxLength="140" rows="3" cols="50"></textarea>

                    <button type="submit">send</button>
                </form>
            </div>
        </section >
    );
};