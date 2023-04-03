import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        e.preventDefault();
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setValues(initialValues);
        onSubmitHandler(values);
    };

    return {
        values,
        changeHandler,
        onSubmit
    }
};