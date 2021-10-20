import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { PageContext } from "./../contexts/PageContext";
import { GameContext } from "./../contexts/GameContext";

const GameSetting = () => {
    const { setSidebarPage } = useContext(PageContext);

    const {
        dataGame,
        inputSearch,
        setInputSearch,
        setSearchTrigger,
        searchTrigger,
        filter,
        setFilter,
        functionsGame,
    } = useContext(GameContext);

    const {
        fetchDataGame,
        functionEditGame,
        functionDeleteGame,
        functionSearchGame,
        functionFilterGame,
    } = functionsGame;

    setSidebarPage("game-settings");
    useEffect(() => {
        fetchDataGame();
    }, []);

    const handleDelete = (event) => {
        let id = parseInt(event.target.value);
        functionDeleteGame(id);
    };

    const handleEdit = (event) => {
        let id = parseInt(event.target.value);
        functionEditGame(id);
    };

    const handleChangeSearch = (event) => {
        let searchValue = event.target.value;
        setInputSearch(searchValue);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchTrigger(!searchTrigger);
        functionSearchGame();
    };

    const handleChangeFilter = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setFilter({ ...filter, [name]: value });
    };

    const handleFilter = (event) => {
        event.preventDefault();
        setSearchTrigger(!searchTrigger);
        functionFilterGame();
    };

    const data = dataGame;

    const columns = [
        {
            title: "No",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key: "genre",
        },
        {
            title: "Platform",
            dataIndex: "platform",
            key: "platform",
        },
        {
            title: "Release Year",
            dataIndex: "release",
            key: "release",
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: "Single Player",
            render: (text) => <>{text.singlePlayer ? "Yes" : "No"}</>,
        },
        {
            title: "Multi Player",
            render: (text) => <>{text.multiplayer ? "Yes" : "No"}</>,
        },

        {
            title: "Action",
            key: "action",
            render: (data) => (
                <div className="tabel-btn">
                    <button className="btn btn-outline" onClick={handleEdit} value={data.id}>
                        Edit
                    </button>
                    <button className="btn btn-outline" onClick={handleDelete} value={data.id}>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container">
            <div className="container-movie">
                <h2>Game Settings</h2>
                <form onSubmit={handleSearch} className="movie-search">
                    <Link to="/game-settings/add-game">
                        <button className="btn btn-search">Add Game</button>
                    </Link>
                    <input
                        type="text"
                        name="title"
                        placeholder="Search by Name..."
                        className="form-input form-search"
                        value={inputSearch}
                        onChange={handleChangeSearch}
                    />
                    <input type="submit" value="Search" className="btn btn-outline" />
                </form>
                <form onSubmit={handleFilter} className="movie-filter">
                    <input
                        type="text"
                        name="genre"
                        placeholder="Filter by Genre..."
                        className="form-input"
                        value={filter.genre}
                        onChange={handleChangeFilter}
                    />
                    <input
                        type="text"
                        name="platform"
                        placeholder="Filter by Platform..."
                        className="form-input"
                        value={filter.platform}
                        onChange={handleChangeFilter}
                    />
                    <input
                        type="number"
                        name="year"
                        placeholder="Filter by Release Year..."
                        className="form-input"
                        value={filter.year}
                        onChange={handleChangeFilter}
                    />
                    <input type="submit" value="Filter" className="btn btn-outline" />
                </form>
                <div className="movie-table">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    );
};

export default GameSetting;
