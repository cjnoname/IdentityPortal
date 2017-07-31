import React from "react";
import { Link, IndexLink } from 'react-router';

const Header = props => {
    return (
        <div className="text-center">
            <nav className="navbar navbar-default">
                <IndexLink activeClassName="active" to="login" >Login</IndexLink>
                {" | "}
                <Link to="register" activeClassName="active">Register</Link>
            </nav>
        </div>
    )
}

export default Header;