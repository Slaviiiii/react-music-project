import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { useForm } from "react-hook-form";

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

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
                    <p>{errors.email?.message}</p>
                    <input type="password"
                        {...register("password", {
                            required: "This field is required!",
                        })}
                        id="password"
                        placeholder="password"
                    />
                    <p>{errors.password?.message}</p>
                    <button type="submit">Login</button>
                    <p className="message">
                        <span>Dont have an account? <Link to={"/register"}>Create one!</Link></span>
                    </p>
                </form>
            </div>
        </section>
    );
};