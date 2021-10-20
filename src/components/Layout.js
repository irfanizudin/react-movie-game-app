import Cookies from "js-cookie";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
    return (
        <div>
            <Header />
            {Cookies.get("token") !== undefined && (
                <div className="sidebar-content">
                    <Sidebar />
                    {props.content}
                </div>
            )}
            {Cookies.get("token") === undefined && <>{props.content}</>}
            <Footer />
        </div>
    );
};

export default Layout;
