
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
                        <input type="image" src="../images/garbage-bin-icon-15.jpg" onClick={() => onCommentDelete(_id)} id="garbage"></input>
                    </>
                )}
            </p>
        </li>
    );
};