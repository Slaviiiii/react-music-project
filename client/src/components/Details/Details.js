import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { commentServiceFactory } from "../../services/commentService";

import { MusicContext } from "../../contexts/MusicContext";
import { AuthContext } from "../../contexts/AuthContext";

import { Comment } from "./Comment/Comment";
import { AddComment } from "./AddComment/AddComment";

export const Details = () => {
    const { userId, isAuthenticated, userEmail } = useContext(AuthContext);
    const [music, setMusic] = useState({});
    const { musicId } = useParams();
    const { onDelete } = useContext(MusicContext);

    const musicService = musicServiceFactory();
    const commentService = commentServiceFactory();

    useEffect(() => {
        Promise.all([
            musicService.getOne(musicId),
            commentService.getAll(musicId)
        ]).then(([musicData, commentData]) => {
            setMusic({
                ...musicData,
                comments: commentData
            });
        });
    }, [musicId]);

    const onCommentCreate = async (values) => {
        const result = await commentService.create(musicId, values.comment, userEmail);

        setMusic(state => ({
            ...state,
            comments: [...state.comments, result]
        }));
    };

    const isOwner = userId === music._ownerId;

    return (
        <section id="details">
            <div id="details-wrapper">
                <div className="back-div">
                    <Link to={`/allMusic`}>Back</Link>
                </div>

                <img id="details-img" src={music.imgUrl} alt={`${music.artist}--${music.name}`} />

                <div id="content">
                    <p id="details-name">
                        Name: <span id="name">{music.name}</span>
                    </p>

                    <p id="details-artist">
                        Artist: <span id="artist">{music.artist}</span>
                    </p>

                    <p id="details-genre">
                        Genre: <span id="genre">{music.genre}</span>
                    </p>
                </div>


                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Description:</h4>
                        <textarea defaultValue={music.description} id="description" name="description" rows="3" cols="50" maxLength="103" disabled />
                    </div>
                </div>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {music.comments && music.comments.map(x => (
                            <Comment key={`${x.username}--${x._id}`} {...x} />
                        ))}

                        {!music.comments?.length && (
                            <p className="no-comment">No created comments yet.</p>
                        )}
                    </ul>
                </div>

                {isOwner && (
                    <div id="actions">
                        <Link to={`/edit/${musicId}`} id="edit-btn">Edit</Link>
                        <Link onClick={() => onDelete(musicId)}>Delete</Link>
                    </div>
                )}
            </div>

            {isAuthenticated && !isOwner && (
                <AddComment onCommentCreate={onCommentCreate} />
            )}
        </section>
    );
};