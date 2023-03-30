import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authServiceFactory } from "./services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const authService = authServiceFactory(auth.accessToken);

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data, auth.accessToken);

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
            const result = await authService.register(registerData, auth.accessToken);

            setAuth(result);
            navigate('/');
        } catch (err) {
            console.log('Register problem!');
        }
    };

    const onLogout = async () => {
        await authService.logout(auth.accessToken);

        setAuth({});
    };

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
}