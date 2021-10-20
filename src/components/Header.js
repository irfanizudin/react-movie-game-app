import React, { useContext } from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { PageContext } from "../contexts/PageContext";

const Header = () => {
    const { page } = useContext(PageContext);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="navbar-link">
                <Link to="/" className={page == "home" && "active-page"}>
                    HOME
                </Link>
                <Link to="/movies" className={page == "movies" && "active-page"}>
                    MOVIES
                </Link>
                <Link to="/games" className={page == "games" && "active-page"}>
                    GAMES
                </Link>
                {Cookies.get("token") !== undefined && (
                    <div className="navbar-username">Hi, {Cookies.get("user")}</div>
                )}
                {Cookies.get("token") === undefined && (
                    <>
                        <Link to="/login">
                            <button className="btn btn-nav-outline">LOGIN</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn btn-nav-primary">REGISTER</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
