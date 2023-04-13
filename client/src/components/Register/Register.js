import "./Register.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            "re-password": ""
        }
    })

    return (
        <section id="register">
            <img src="/images/register.png" alt="register now" />
            <div className="form-register">
                <h2>Register</h2>
                <form className="register-form" method="POST" onSubmit={handleSubmit(onRegisterSubmit)}>
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
                            minLength: {
                                value: 6,
                                message: "Min length is 6."
                            },
                            maxLength: {
                                value: 18,
                                message: "Max length is 18."
                            }
                        })}
                        id="password"
                        placeholder="password"
                    />
                    <p>{errors.password?.message}</p>
                    <input
                        {...register("re-password", {
                            required: "This field is reuqired!",
                            minLength: {
                                value: 6,
                                message: "Min length is 6."
                            },
                            maxLength: {
                                value: 18,
                                message: "Max length is 18."
                            },
                            validate: (value) => { 
                                const { password } = getValues(); 
                                return password === value || "Passwords must match!"; 
                            },
                            })}
                        type="password"
                        name="re-password"
                        id="repeat-password"
                        placeholder="repeat password"
                    />
                    <p>{errors['re-password']?.message}</p>
                    
                    <button type="submit">Register</button>
                    <p className="message">
                        <span>Already have an account? <Link to={"/login"}>Log in now!</Link></span>
                    </p>
                </form>
            </div>
        </section>
    );
};