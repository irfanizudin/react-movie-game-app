import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
    let history = useHistory();

    const [input, setInput] = useState({
        description: "",
        duration: "",
        genre: "",
        image_url: "",
        rating: "",
        review: "",
        title: "",
        year: "",
    });

    const [filter, setFilter] = useState({
        duration: "",
        rating: "",
        year: "",
    });

    const [dataMovie, setDataMovie] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [buttonState, setButtonState] = useState("Submit");
    const [inputSearch, setInputSearch] = useState("");
    const [searchTrigger, setSearchTrigger] = useState(true);

    const fetchData = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`);
        let getData = result.data.map((item) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                duration: item.duration,
                genre: item.genre,
                image_url: item.image_url,
                rating: item.rating,
                review: item.review,
                year: item.year,
            };
        });
        setDataMovie(getData);
    };

    const fetchDataById = async (id) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`).then((res) => {
            let item = res.data;
            setInput({
                description: item.description,
                duration: item.duration,
                genre: item.genre,
                image_url: item.image_url,
                rating: item.rating,
                review: item.review,
                title: item.title,
                year: item.year,
            });
        });
    };

    const fetchDataMovieById = async (id) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`).then((res) => {
            let item = res.data;
            setInput({
                description: item.description,
                duration: item.duration,
                genre: item.genre,
                image_url: item.image_url,
                rating: item.rating,
                review: item.review,
                title: item.title,
                year: item.year,
            });
            setButtonState("Update");
            setCurrentId(item.id);
        });
    };

    let newData = {
        description: input.description,
        duration: parseInt(input.duration),
        genre: input.genre,
        image_url: input.image_url,
        rating: parseInt(input.rating),
        review: input.review,
        title: input.title,
        year: parseInt(input.year),
    };

    const functionSubmitMovie = () => {
        axios
            .post(`https://backendexample.sanbersy.com/api/data-movie`, newData, {
                headers: { Authorization: "Bearer " + Cookies.get("token") },
            })
            .then((res) => {
                let item = res.data;
                let newItem = {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    duration: item.duration,
                    genre: item.genre,
                    image_url: item.image_url,
                    rating: item.rating,
                    review: item.review,
                    year: item.year,
                };
                setDataMovie([...dataMovie, newItem]);
                history.push("/movie-settings");
                message.success("Data successfully created!!");
            });
    };

    const functionUpdateMovie = () => {
        axios
            .put(`https://backendexample.sanbersy.com/api/data-movie/${currentId}`, newData, {
                headers: { Authorization: "Bearer " + Cookies.get("token") },
            })
            .then(() => {
                let data = dataMovie.find((item) => item.id === currentId);
                data.description = input.description;
                data.duration = parseInt(input.duration);
                data.genre = input.genre;
                data.image_url = input.image_url;
                data.rating = parseInt(input.rating);
                data.review = input.review;
                data.title = input.title;
                data.year = parseInt(input.year);
                setDataMovie([...dataMovie]);
                setButtonState("Submit");
                setCurrentId(null);
                history.push("/movie-settings");
                message.success("Data Succesfully Updated!!");
            });
    };

    const functionSearchMovie = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`);
        let getData = result.data.map((item) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                duration: item.duration,
                genre: item.genre,
                image_url: item.image_url,
                rating: item.rating,
                review: item.review,
                year: item.year,
            };
        });

        if (inputSearch === undefined) {
            fetchData();
        } else {
            let filter = getData.filter((e) => {
                return Object.values(e).join(" ").toLowerCase().includes(inputSearch.toLowerCase());
            });
            setDataMovie([...filter]);
        }
        setInputSearch("");
    };

    const functionFilterMovie = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`);
        let getData = result.data.map((item) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                duration: item.duration,
                genre: item.genre,
                image_url: item.image_url,
                rating: item.rating,
                review: item.review,
                year: item.year,
            };
        });

        if (filter.duration === "" && filter.rating === "" && filter.year === "") {
            fetchData();
        } else {
            let filterdata = getData.filter((e) => {
                return (
                    e.year === filter.year ||
                    e.duration === filter.duration ||
                    e.rating === filter.rating
                );
            });
            setDataMovie([...filterdata]);
        }
    };

    const functionDetailMovie = (id) => {
        history.push(`/movies/detail/${id}`);
    };

    const functionEditMovie = (id) => {
        history.push(`/movie-settings/edit-movie/${id}`);
    };

    const functionDeleteMovie = (id) => {
        axios
            .delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
                headers: { Authorization: "Bearer " + Cookies.get("token") },
            })
            .then(() => {
                let newData = dataMovie.filter((item) => {
                    return item.id !== id;
                });
                setDataMovie(newData);
                message.success("Data Successfully Deleted!!");
            });
    };

    const functions = {
        fetchData,
        functionDetailMovie,
        functionSubmitMovie,
        functionEditMovie,
        functionDeleteMovie,
        fetchDataMovieById,
        functionUpdateMovie,
        functionSearchMovie,
        functionFilterMovie,
        fetchDataById,
    };

    return (
        <MovieContext.Provider
            value={{
                input,
                setInput,
                dataMovie,
                setDataMovie,
                buttonState,
                setButtonState,
                currentId,
                setCurrentId,
                inputSearch,
                setInputSearch,
                setSearchTrigger,
                searchTrigger,
                filter,
                setFilter,
                functions,
            }}
        >
            {props.children}
        </MovieContext.Provider>
    );
};
