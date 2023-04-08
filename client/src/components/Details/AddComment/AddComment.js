import { useForm } from "react-hook-form";

export const AddComment = ({
    onCommentCreate
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            comment: "",
        }
    })

    return (
        <div>
            <form className="form" onSubmit={handleSubmit(onCommentCreate)}>
                <span id="add-span">Add comment</span>
                <textarea
                    {...register("comment", {
                        required: "This field is required!", 
                    })}
                    rows="3"
                    maxLength="110"
                    placeholder="Comment" 
                />
                <button id="add-comment" type="submit">Add Comment</button>
            </form>
        </div>
    );
};