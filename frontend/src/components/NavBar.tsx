import { Link } from "react-router-dom";
import Build_a_Team from "../assets/Build-a-team-logo.png";
import { useState } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <nav className="navbarContainer">
            <img src={Build_a_Team} alt="Logo" className="navbarLogo" />
            <div className="Hamburger-Cross-Icons" onClick={handleClick}>
                <i className={open ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={open ? "menuItems active" : "menuItems"}>
                <li>
                    <Link to="/" className="navbarLinks">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/create-team" className="navbarLinks">
                        Create Team
                    </Link>
                </li>
                <li>
                    <Link to="/my-team" className="navbarLinks">
                        My Team
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
