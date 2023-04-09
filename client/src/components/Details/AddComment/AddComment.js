import { useForm } from "react-hook-form";

export const AddComment = ({
    onCommentCreate
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            comment: "",
        }
    })

    
    const clearComment = (e) => {
        e.preventDefault();
        setValue("comment", "");
    };

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
                <button id="add-comment" onClick={clearComment} type="submit">Add Comment</button>
            </form>
        </div>
    );
};