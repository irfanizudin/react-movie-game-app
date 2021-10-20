import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { MovieContext } from "./../contexts/MovieContext";
import { PageContext } from "./../contexts/PageContext";

const MovieSetting = () => {
    const { setSidebarPage } = useContext(PageContext);

    const {
        dataMovie,
        inputSearch,
        setInputSearch,
        setSearchTrigger,
        searchTrigger,
        filter,
        setFilter,
        functions,
    } = useContext(MovieContext);

    const {
        fetchData,
        functionEditMovie,
        functionDeleteMovie,
        functionSearchMovie,
        functionFilterMovie,
    } = functions;

    setSidebarPage("movie-settings");
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (event) => {
        let id = parseInt(event.target.value);
        functionDeleteMovie(id);
    };

    const handleEdit = (event) => {
        let id = parseInt(event.target.value);
        functionEditMovie(id);
    };

    const handleChangeSearch = (event) => {
        let searchValue = event.target.value;
        setInputSearch(searchValue);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchTrigger(!searchTrigger);
        functionSearchMovie();
    };

    const handleChangeFilter = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setFilter({ ...filter, [name]: value });
    };

    const handleFilter = (event) => {
        event.preventDefault();
        setSearchTrigger(!searchTrigger);
        functionFilterMovie();
    };

    const data = dataMovie;

    const columns = [
        {
            title: "No",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Rating",
            render: (text) => <>{text.rating}/10</>,
        },
        {
            title: "Release Year",
            dataIndex: "year",
            key: "year",
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: "Duration",
            render: (text) => <>{text.duration} min</>,
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key: "genre",
        },
        {
            title: "Description",
            render: (text) => (
                <>
                    <p className="limit-text">{text.description}</p>
                </>
            ),
        },
        {
            title: "Review",
            render: (text) => (
                <>
                    <p className="limit-text">{text.review}</p>
                </>
            ),
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
                <h2>Movie Settings</h2>
                <form onSubmit={handleSearch} className="movie-search">
                    <Link to="/movie-settings/add-movie">
                        <button className="btn btn-search">Add Movie</button>
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
                        type="number"
                        name="year"
                        placeholder="Filter by Year..."
                        className="form-input"
                        value={filter.year}
                        onChange={handleChangeFilter}
                    />
                    <input
                        type="number"
                        name="duration"
                        placeholder="Filter by Duration..."
                        className="form-input"
                        value={filter.duration}
                        onChange={handleChangeFilter}
                    />
                    <input
                        type="number"
                        name="rating"
                        placeholder="Filter by Rating..."
                        className="form-input"
                        value={filter.rating}
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

export default MovieSetting;
