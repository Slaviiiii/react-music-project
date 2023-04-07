import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { authServiceFactory } from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage("auth", {});
    const authService = authServiceFactory();

    const onLoginSubmit = async (data) => {
        const result = await authService.login(data);   

        if (result !== `Login or password don't match`) {
            setAuth(result);
            navigate('/');
            return;
        }    
    };

    const onRegisterSubmit = async (data) => {
        const result = await authService.register({email: data.email, password: data.password});   

        if (result.email) {
            setAuth(result);
            navigate('/');
            return;
        }  
    };

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
        localStorage.clear();
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};