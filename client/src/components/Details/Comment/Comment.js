
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
                        <input type="image" src="../images/pencil.png" id="pencil"></input>
                        <input type="image" src="../images/garbage-bin-icon-15.jpg" onClick={() => onCommentDelete(_id)} id="garbage"></input>
                        {/* <img id="pencil" src="/images/pencil.png" alt="pencil" /> */}
                        {/* <img onClick={() => onCommentDelete(_id)} id="garbage"  src="/images/garbage-bin-icon-15.jpg" alt="garbage" /> */}
                    </>
                )}
            </p>
        </li>
    );
};