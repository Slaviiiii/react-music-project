import { Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Logout = () => {
    const { onLogout, token } = useContext(AuthContext);

    useEffect(() => {
        onLogout(token);
    }, [onLogout]);

    return <Navigate to='/' />;
};