// import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useForm } from "react-hook-form";

import { authServiceFactory } from "../../services/authService";

export const Login = () => {
    // const { onLoginSubmit } = useContext(AuthContext);
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage("auth", {});
    const authService = authServiceFactory();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            loginError: "",
        }
    });

    const onLoginSubmit = async (data) => {
        const result = await authService.login(data);

        if (result.accessToken) {
            setAuth(result);
            navigate('/');
            return;
        }

        if (result === "Login or password don't match") {
            setError('loginError', {
                type: "custom",
                message: "Login or password don't match!"
            });
        }
    };

    return (
        <section id="login" >
            <div className="form">
                <h2>Login</h2>
                <form className="login-form" method="POST" onSubmit={handleSubmit(onLoginSubmit)}>
                    <p id="error-p">{errors.loginError?.message}</p>
                    <input type="text"
                        {...register("email", {
                            required: "This field is required!",
                            pattern: {
                                // value: /^[a-zA-z]{3,}+@[[a-zA-z]+\.[a-zA-z]+$/,
                                message: "Your email is incorrect!"
                            }
                        })}
                        id="email"
                        placeholder="email"
                    />
                    {errors.email?.message}
                    <input type="password"
                        {...register("password", {
                            required: "This field is required!",
                        })}
                        id="password"
                        placeholder="password"
                    />
                    {errors.password?.message}
                    <button type="submit">Login</button>
                    <p className="message">
                        <span>Dont have an account? <Link to={"/register"}>Create one!</Link></span>
                    </p>
                </form>
            </div>
        </section>
    );
};