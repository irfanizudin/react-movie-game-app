import React, { createContext, useState } from "react";

export const PageContext = createContext();

export const PageProvider = (props) => {
    const [page, setPage] = useState("home");
    const [sidebarPage, setSidebarPage] = useState("movie-settings");

    return (
        <PageContext.Provider value={{ page, setPage, sidebarPage, setSidebarPage }}>
            {props.children}
        </PageContext.Provider>
    );
};
