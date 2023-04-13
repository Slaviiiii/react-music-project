import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { MusicContext } from "../../contexts/MusicContext";

import { useForm } from "react-hook-form";

export const Edit = () => {
    const { musicId } = useParams();
    const musicService = musicServiceFactory();
    const { onMusicEditSubmit } = useContext(MusicContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            name: "",
            imgUrl: "",
            genre: "",
            artist: "",
            description: "",
            _id: "",
        }
    });

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setValue('name', result.name);
                setValue('imgUrl', result.imgUrl);
                setValue('genre', result.genre);
                setValue('artist', result.artist);
                setValue('description', result.description);
                setValue('_id', result._id);
            });
    }, [musicId]);

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
                            value: 90,
                            message: "Max length is 90."
                        }
                    })} id="description" placeholder="Description" maxLength="90" rows="3" cols="50"></input>
                    <p>{errors.description?.message}</p>

                    <button type="submit">edit</button>
                </form>
            </div>
        </section>
    );
};