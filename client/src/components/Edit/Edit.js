import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as musicService from "../../services/musicService";

export const Edit = ({
    onMusicEditSubmit
}) => {
    const navigate = useNavigate();
    const { musicId } = useParams();
    const [values, setValues] = useState({});

    useEffect(() => {
        musicService.getOne(musicId)
            .then(result => {
                setValues(result);
            });
    }, [musicId]);

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onMusicEditSubmit(values);
    };

    const onBack = (e) => {
        navigate('/details/' + values._id);
    };

    return (
        <section id="edit">
            <div className="form">
                <Link to={`/details/${musicId}`}>Back</Link>
                <h2>Edit Music</h2>
                <form className="edit-form" method="POST" onSubmit={onSubmit}>
                    <input defaultValue={values.name} onChange={onChangeHandler} type="text" name="name" id="name" />
                    <input defaultValue={values.imgUrl} onChange={onChangeHandler} type="text" name="imgUrl" id="imageUrl" />
                    <input defaultValue={values.genre} onChange={onChangeHandler} type="text" name="genre" id="genre" />
                    <input defaultValue={values.artist} onChange={onChangeHandler} type="text" name="artist" id="artist" />
                    <textarea defaultValue={values.description} onChange={onChangeHandler} id="description" name="description" rows="4" cols="50"></textarea>

                    <button type="submit">send</button>
                </form>
            </div>
        </section>
    );
};