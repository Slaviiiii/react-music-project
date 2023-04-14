import "./AddComment.css";
import { useForm } from "react-hook-form";

export const AddComment = ({
    commentService,
    setMusic,
    musicId,
    userEmail
}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm({
        defaultValues: {
            comment: "",
        }
    })

    const onCommentCreate = async (values) => {
        const result = await commentService.create(musicId, values.comment, userEmail);

        setMusic(state => ({
            ...state,
            comments: [...state.comments, result]
        }));

        setValue("comment", "");
    };

    return (
        <div>
            <form className="form-comment" onSubmit={handleSubmit(onCommentCreate)}>
                <span id="add-span">Add comment</span>
                <textarea
                    {...register("comment", {
                        required: "This field is required!", 
                    })}
                    rows="3"
                    maxLength="110"
                    placeholder="Comment" 
                />
                <p>{errors.comment?.message}</p>
                
                <button id="add-comment" type="submit">Add Comment</button>
            </form>
        </div>
    );
};