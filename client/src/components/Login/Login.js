import "./Login.css";
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
            <img src="/images/login1.png" alt="login now" />
            <div className="form-login">
                <h2>Login</h2>
                <form className="login-form" method="POST" onSubmit={handleSubmit(onLoginSubmit)} >
                    <input type="text"
                        {...register("email", {
                            required: "This field is required!",
                            pattern: {
                                value: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/,
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
                        <span><b>Dont have an account?</b><Link to={"/register"}><b>Create One <i className="fa-solid fa-plus"></i></b></Link></span>
                    </p>
                </form>
            </div>
        </section>
    );
};