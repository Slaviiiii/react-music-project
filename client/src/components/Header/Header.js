import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            {/* <!-- Navigation --> */}
            <Link to="/"><img id="logo-img" src="/images/logo.jpg" alt="Site logo" /></Link>

            <nav>
                <div>
                    <Link to="/allMusic">All Music</Link>
                </div>

                {/* <!-- Logged-in users --> */}
                <div className="user">
                    <Link to="/create">Create Music</Link>
                    <Link to="/logout">Logout</Link>
                </div>

                {/* <!-- Guest users --> */}
                <div className="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
};