
export const Comment = ({
    username,
    comment,
    userId,
    _ownerId,
    _id,
    onCommentDelete
}) => {
    const isOwner = userId === _ownerId;

    return (
        <li className="comment">
            <p>
                <span>{username}: </span>
                <input type="text" value={comment} size="60" disabled />
                {isOwner && (
                    <>
                        <button id="pencil"></button>
                        <button onClick={() => onCommentDelete(_id)} id="garbage"></button>
                        {/* <img id="pencil" src="/images/pencil.png" alt="pencil" /> */}
                        {/* <img onClick={() => onCommentDelete(_id)} id="garbage"  src="/images/garbage-bin-icon-15.jpg" alt="garbage" /> */}
                    </>
                )}
            </p>
        </li>
    );
};