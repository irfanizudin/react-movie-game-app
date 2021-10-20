import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import IconFilm from "../assets/icons/IconFilm";
import IconCamera from "./../assets/icons/IconCamera";
import IconPuzzle from "./../assets/icons/IconPuzzle";
import IconKey from "./../assets/icons/IconKey";
import IconLogout from "../assets/icons/IconLogout";
import Cookies from "js-cookie";
import { PageContext } from "./../contexts/PageContext";

const Sidebar = () => {
    const { sidebarPage } = useContext(PageContext);

    let history = useHistory();

    const handleLogout = () => {
        Cookies.remove("email");
        Cookies.remove("user");
        Cookies.remove("token");
        history.push("/");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <IconFilm className="icon-logo" />
            </div>
            <div className="sidebar-menu">
                <Link to="/movie-settings">
                    <div
                        className={`sidebar-item ${
                            sidebarPage == "movie-settings" && "active-sidebar"
                        }`}
                    >
                        <IconCamera className="icon-menu" />
                        <div className="sidebar-link">Movie Settings</div>
                    </div>
                </Link>
                <Link to="/game-settings">
                    <div
                        className={`sidebar-item ${
                            sidebarPage == "game-settings" && "active-sidebar"
                        }`}
                    >
                        <IconPuzzle className="icon-menu" />
                        <div className="sidebar-link">Game Settings</div>
                    </div>
                </Link>
                <Link to="/change-password">
                    <div
                        className={`sidebar-item ${
                            sidebarPage == "change-password" && "active-sidebar"
                        }`}
                    >
                        <IconKey className="icon-menu" />
                        <div className="sidebar-link">Change Password</div>
                    </div>
                </Link>

                <div className="sidebar-item btn-logout" onClick={handleLogout}>
                    <IconLogout className="icon-menu" />
                    <div className="sidebar-link">Logout</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
