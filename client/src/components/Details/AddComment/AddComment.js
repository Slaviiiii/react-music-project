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
                <textarea name="comment" placeholder="Comment......" rows="3" maxLength="110" value={values.comment} onChange={changeHandler} />
                <input id="add-comment" type="submit" value="Add Comment" />
            </form>
        </div>
    );
};