import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(initialValue);

    const setLocalStorageState = (value) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));
    };

    return [
        state,
        setLocalStorageState
    ]
};