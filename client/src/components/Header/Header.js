import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <header>
            {/* <!-- Navigation --> */}
            <Link to="/"><img id="logo-img" src="/images/logo.jpg" alt="Site logo" /></Link>

            <nav>   
                {isAuthenticated && (
                    <div className="user">
                        <Link to="/profile">{userEmail}</Link>
                        <Link to="/allMusic">All Music</Link>
                        <Link to="/create">Create Music</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                )}


                {!isAuthenticated && (
                    <div className="guest">
                        <Link to="/allMusic">All Music</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};