import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { authServiceFactory } from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { useForm } from "react-hook-form";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage("auth", {});
    const authService = authServiceFactory();
    const { setError } = useForm();

    const onLoginSubmit = async (data) => {
        const result = await authService.login(data);

        if (result) {
            setAuth(result);
            navigate('/');
            return;
        }

        setError('loginError', {
            type: "custom",
            message: "Login or password don't match!"
        });
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