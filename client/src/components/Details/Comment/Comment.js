
export const Comment = ({
    username,
    comment
}) => {
    return (
        <li className="comment">
            <p><span>{username}: {comment} </span><img src="/images/pencil.png" alt="pencil" /></p>
        </li>
    );
};