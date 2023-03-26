import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onLoginSubmit);

    return (
        <section id="login" >
            <div className="form">
                <h2>Login</h2>
                <form className="login-form" method="POST" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="email"
                        d="email"
                        placeholder="email"
                        value={values.email}
                        onChange={changeHandler}
                    />

                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={values.password}
                        onChange={changeHandler}
                    />

                    <button type="submit">Login</button>
                    <p className="message">
                        <span>Dont have an account? <Link to={"/register"}>Create one!</Link></span>
                    </p>
                </form>
            </div>
        </section>
    );
};