import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const localStorageState = localStorage.getItem(key);
        if (localStorageState) {
            const parsedState = JSON.parse(localStorageState);

            return parsedState;
        }

        return initialValue;
    });

    const setLocalStorageState = (value) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));
    };

    return [
        state,
        setLocalStorageState
    ]
};