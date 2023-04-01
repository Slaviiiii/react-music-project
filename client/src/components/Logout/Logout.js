import { Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Logout = () => {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => {
        onLogout();
    }, []);

    return <Navigate to='/' />;
};