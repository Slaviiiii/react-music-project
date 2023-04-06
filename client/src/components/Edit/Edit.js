import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { MusicContext } from "../../contexts/MusicContext";

import { useForm } from "react-hook-form";

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

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: values.name,
            imgUrl: values.imgUrl,
            genre: values.genre,
            artist: values.artist,
            description: values.description,
        }
    });
    // const onChangeHandler = (e) => {
    //     setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    // };

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     onMusicEditSubmit(values);
    // };

    return (
        <section id="edit">
            <div className="form">
                <Link to={`/details/${musicId}`}>Back</Link>
                <h2>Edit Music</h2>
                <form className="edit-form" method="PUT" onSubmit={handleSubmit(onMusicEditSubmit)}>
                    <input type="text" {...register("name", {
                        required: "This field is required!",
                        minLength: {
                            value: 3,
                            message: "Min length is 3."
                        },
                        maxLength: {
                            value: 20,
                            message: "Max length is 20."
                        },
                    })} id="name" placeholder="Name" />
                    <p>{errors.name?.message}</p>

                    <input {...register("imgUrl",
                        {
                            required: "This field is required!",
                            pattern: {
                                value: /^https?:\/\//,
                                message: "The imgUrl should start with http:// or https:// !"
                            }
                        })}
                        type="text" id="imageUrl" placeholder="Image" />
                    <p>{errors.imgUrl?.message}</p>

                    <input {...register("genre", {
                        required: "This field is required!",
                        minLength: {
                            value: 3,
                            message: "Min length is 3."
                        }, maxLength: {
                            value: 20,
                            message: "Max length is 20."
                        }
                    })} type="text" id="genre" placeholder="Genre" />
                    <p>{errors.genre?.message}</p>

                    <input {...register("artist", {
                        required: "This field is required!",
                        minLength: {
                            value: 3,
                            message: "Min length is 3."
                        }, maxLength: {
                            value: 20,
                            message: "Max length is 20."
                        }
                    })} type="text" id="artist" placeholder="Artist" />
                    <p>{errors.artist?.message}</p>

                    <input {...register("description", {
                        required: "This field is required!",
                        minLength: {
                            value: 3,
                            message: "Min length is 3."
                        }, maxLength: {
                            value: 140,
                            message: "Max length is 140."
                        }
                    })} id="description" placeholder="Description" maxLength="140" rows="3" cols="50"></input>
                    <p>{errors.description?.message}</p>

                    <button type="submit">send</button>
                </form>
            </div>
        </section>
    );
};