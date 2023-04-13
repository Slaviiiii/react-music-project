import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return (
        <header>
            {/* <!-- Navigation --> */}
            <Link to="/"><img id="logo-img" src="/images/logo.png" alt="Site logo" /></Link>

            <nav>   
                {isAuthenticated && (
                    <div className="user">
                        <Link to="/profile">{userEmail}</Link>
                        <Link to="/allMusic"><i className="fa-sharp fa-solid fa-music"></i> All Music</Link>
                        <Link to="/create"><i className="fa-sharp fa-solid fa-circle-plus"></i> Create Music</Link>
                        <Link to="/logout"><i className="fa-sharp fa-solid fa-right-from-bracket"></i> Logout</Link>
                    </div>
                )}


                {!isAuthenticated && (
                    <div className="guest">
                        <Link to="/allMusic"><i className="fa-sharp fa-solid fa-music"></i> All Music</Link>
                        <Link to="/login"><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
                        <Link to="/register"><i className="fa-solid fa-user-plus"></i> Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};