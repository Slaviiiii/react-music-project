import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { musicServiceFactory } from "../../services/musicService";
import { commentServiceFactory } from "../../services/commentService";
import { likeServiceFactory } from "../../services/likeService";

import { MusicContext } from "../../contexts/MusicContext";
import { AuthContext } from "../../contexts/AuthContext";

import { Comment } from "./Comment/Comment";
import { AddComment } from "./AddComment/AddComment";

export const Details = () => {
    const { userId, isAuthenticated, userEmail } = useContext(AuthContext);
    const [music, setMusic] = useState({});
    const { musicId } = useParams();
    const { onDelete } = useContext(MusicContext);
    // const isEddited = false; Todo: edit.

    const likeService = likeServiceFactory();
    const musicService = musicServiceFactory();
    const commentService = commentServiceFactory();

    useEffect(() => {
        Promise.all([
            musicService.getOne(musicId),
            commentService.getAll(musicId),
            likeService.getAll(musicId),
        ]).then(([musicData, commentData, likeData]) => {
            setMusic({
                ...musicData,
                comments: commentData,
                likes: likeData
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

    const onCommentDelete = async (commentId) => {
        const result = window.confirm("Are you sure you want to delete this comment?");

        if (result === true) {
            await commentService.deleteFunc(commentId);

            setMusic(state => ({
                ...state,
                comments: [...state.comments.filter(c => c._id !== commentId)]
            }));
        }
    };

    const onLike = async (e) => {
        e.preventDefault();

        if (music.likes.length === 0) {
            const result = await likeService.addLike({ username: userEmail, musicId });
            setMusic(state => ({
                ...state,
                likes: [result]
            }));
        } else {
            const allLikes = music.likes.filter(l => l.username === userEmail);

            if (allLikes.length < 1) {
                const result = await likeService.addLike({ username: userEmail, musicId });
                setMusic(state => ({
                    ...state,
                    likes: [...state.likes, result]
                }));
            } else if (allLikes.length === 1) {
                await likeService.removeLike(allLikes[0]._id);
                setMusic(state => ({
                    ...state,
                    likes: [...state.likes.filter(l => l._id !== allLikes[0]._id)]
                }));
            }
        }
    };

    //Todo edit.
    // const onCommentEdit = async (commentId, data) => {
    //     const result = await commentService.edit(commentId, data);
    //     isEddited = true;

    //     return result;
    // };

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
                        <textarea defaultValue={music.description} id="description" name="description" rows="3" cols="50" maxLength="110" disabled />
                    </div>
                </div>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {music.comments && music.comments.map(x => (
                            <Comment key={`${x.username}--${x._id}`} {...x} userId={userId} onCommentDelete={onCommentDelete} />
                        ))}

                        {!music.comments?.length && (
                            <p className="no-comment">No created comments yet.</p>
                        )}
                    </ul>
                </div>

                {isOwner && (
                    <span id="like-span"><input type="image" src="../images/like.jpg" id="garbage" alt="like" />: {music.likes?.length}</span>
                )}

                {!isOwner && (
                    <span id="like-span"><input onClick={onLike} type="image" src="../images/like.jpg" id="garbage" alt="like" />: {music.likes?.length}</span>
                )}

                {isOwner && (
                    <div id="actions">
                        <span></span>
                        <Link to={`/edit/${musicId}`} id="edit-btn">Edit</Link>
                        <Link onClick={() => onDelete(musicId)}>Delete</Link>
                    </div>
                )}
                {isAuthenticated && !isOwner && (
                    <AddComment onCommentCreate={onCommentCreate} />
                )}
            </div>
        </section>
    );
};