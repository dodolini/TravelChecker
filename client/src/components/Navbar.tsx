import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

export const Navbar: React.FC = () => {

    const {user, setUser} = useContext(UserContext)

    const HandleLogout = () => {
        setUser(null);
    }

    return (
        <nav id="navigation">
            <Link className="link" to="/">Home</Link>
            {user ? 
            <>
                <Link className="link" to="/" onClick={HandleLogout}>Logout</Link>
                <Link className="link" to="/dashboard">Map</Link>
            </>
                :
            <>
                <Link className="link" to="/login">Login</Link>
                <Link className="link" to="/register">Register</Link>
            </>
            }
        </nav>
    )
}