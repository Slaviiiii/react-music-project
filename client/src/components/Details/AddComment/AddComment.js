import { useForm } from "../../../hooks/useForm";

export const AddComment = ({
    onCommentCreate
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        comment: '',
    }, onCommentCreate);

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <label>Add a comment:</label>
                <textarea name="comment" rows="3" maxLength="110" value={values.comment} onChange={changeHandler} placeholder="Comment" />
                <button id="add-comment" type="submit">Add Comment</button>
            </form>
        </div>
    );
};