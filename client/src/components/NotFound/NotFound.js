import "./NotFound.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div id="NotFound-page">
            <img src="/images/404.png" alt="404" />
            
            <p>We couldn't find the page you were trying to visit.</p>
            <Link to="/">Maybe you should start over on the home page <i className="fa-solid fa-house"></i></Link>
        </div>
    )
};