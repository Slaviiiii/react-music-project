
export const Comment = ({
    username,
    comment
}) => {
    return (
        <li className="comment">
            <p>{username}: {comment}</p>
        </li>
    );
};