
export const Comment = ({
    username,
    comment
}) => {
    return (
        <li className="comment">
            <p>
                <span>{username}: </span>
                <textarea name="comment-text" id="comment-text" value={comment} maxLength="103" cols="30" rows="1" disabled />
                <img src="/images/pencil.png" alt="pencil" />
                <img src="/images/garbage-bin-icon-15.jpg" alt="garbage" />
            </p>
        </li>
    );
};