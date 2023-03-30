import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { authServiceFactory } from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const navigate = useNavigate();

    const authService = authServiceFactory(auth.accessToken);

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);
            navigate('/');
        } catch (err) {
            console.log('Login problem!');
        }
    };

    const onRegisterSubmit = async (data) => {
        const { 're-password': repeatPassword, ...registerData } = data;
        if (repeatPassword !== registerData.password) {
            return;
        }

        try {
            const result = await authService.register(registerData);

            setAuth(result);
            navigate('/');
        } catch (err) {
            console.log('Register problem!');
        }
    };

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const contextvalues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={contextvalues}>
            {children}
        </AuthContext.Provider>
    );
};