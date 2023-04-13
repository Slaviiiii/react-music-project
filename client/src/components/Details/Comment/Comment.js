import "../Comment.css";

export const Comment = ({
    username,
    comment,
    userId,
    _ownerId,
    _id,
    onCommentDelete,
}) => {
    const isOwner = userId === _ownerId;

    return (
        <li className="comment">
            <p>
                <span>{username}: </span>
                <input type="text" value={comment} size="62" disabled />
                {isOwner && (
                    <>
                        {/* Todo edit: <input type="image" src="../images/pencil.png" onClick={() => onCommentEdit(_id, { comment, username })} id="pencil"></input>  */}
                        <i onClick={() => onCommentDelete(_id)} id="garbage" className="fa-solid fa-trash"></i>
                    </>
                )}
            </p>
        </li>
    );
}; 