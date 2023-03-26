import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        're-password': '',
    }, onRegisterSubmit);

    return (
        <section id="register">
            <div className="form">
                <h2>Register</h2>
                <form className="login-form" method="POST" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="email"
                        id="register-email"
                        placeholder="email"
                        value={values.email}
                        onChange={changeHandler}
                    />

                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="password"
                        value={values.password}
                        onChange={changeHandler}
                    />

                    <input
                        type="password"
                        name="re-password"
                        id="repeat-password"
                        placeholder="repeat password"
                        value={values['re-password']}
                        onChange={changeHandler}
                    />

                    <button type="submit">Register</button>
                    <p className="message">
                        <span>Already have an account? <Link to={"/login"}>Log in now!</Link></span>
                    </p>
                </form>
            </div>
        </section>
    );
};