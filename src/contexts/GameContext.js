import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const GameContext = createContext();

export const GameProvider = (props) => {
    let history = useHistory();

    const [inputGame, setInputGame] = useState({
        genre: "",
        image_url: "",
        singlePlayer: "",
        multiplayer: "",
        name: "",
        platform: "",
        release: "",
    });

    const [filter, setFilter] = useState({
        genre: "",
        platform: "",
        year: "",
    });

    const [dataGame, setDataGame] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [searchTrigger, setSearchTrigger] = useState(true);
    const [currentId, setCurrentId] = useState(null);
    const [buttonState, setButtonState] = useState("Submit");

    const fetchDataGame = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`);
        let getData = result.data.map((item) => {
            return {
                id: item.id,
                genre: item.genre,
                image_url: item.image_url,
                singlePlayer: item.singlePlayer,
                multiplayer: item.multiplayer,
                name: item.name,
                platform: item.platform,
                release: item.release,
            };
        });
        setDataGame(getData);
    };

    const fetchDataById = async (id) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`).then((res) => {
            let item = res.data;
            setInputGame({
                genre: item.genre,
                image_url: item.image_url,
                singlePlayer: item.singlePlayer,
                multiplayer: item.multiplayer,
                name: item.name,
                platform: item.platform,
                release: item.release,
            });
        });
    };

    let newData = {
        genre: inputGame.genre,
        image_url: inputGame.image_url,
        singlePlayer: inputGame.singlePlayer,
        multiplayer: inputGame.multiplayer,
        name: inputGame.name,
        platform: inputGame.platform,
        release: inputGame.release,
    };

    const functionSubmitGame = () => {
        axios
            .post(`https://backendexample.sanbersy.com/api/data-game`, newData, {
                headers: { Authorization: "Bearer " + Cookies.get("token") },
            })
            .then((res) => {
                let item = res.data;
                let newItem = {
                    id: item.id,
                    genre: item.genre,
                    image_url: item.image_url,
                    singlePlayer: item.singlePlayer,
                    multiplayer: item.multiplayer,
                    name: item.name,
                    platform: item.platform,
                    release: item.release,
                };
                setDataGame([...dataGame, newItem]);
                history.push("/game-settings");
                message.success("Data successfully created!!");
            });
    };

    const functionUpdateGame = () => {
        axios
            .put(`https://backendexample.sanbersy.com/api/data-game/${currentId}`, newData, {
                headers: { Authorization: "Bearer " + Cookies.get("token") },
            })
            .then(() => {
                let data = dataGame.find((item) => item.id === currentId);
                data.genre = inputGame.genre;
                data.image_url = inputGame.image_url;
                data.singlePlayer = inputGame.singlePlayer;
                data.multiplayer = inputGame.multiplayer;
                data.name = inputGame.name;
                data.platform = inputGame.platform;
                data.release = inputGame.release;
                setDataGame([...dataGame]);
                setButtonState("Submit");
                setCurrentId(null);
                history.push("/game-settings");
                message.success("Data Succesfully Updated!!");
            });
    };

    const fetchDataGameById = async (id) => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`).then((res) => {
            let item = res.data;
            setInputGame({
                genre: item.genre,
                image_url: item.image_url,
                singlePlayer: item.singlePlayer,
                multiplayer: item.multiplayer,
                name: item.name,
                platform: item.platform,
                release: item.release,
            });
            setButtonState("Update");
            setCurrentId(item.id);
        });
    };

    const functionSearchGame = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`);
        let getData = result.data.map((item) => {
            return {
                id: item.id,
                genre: item.genre,
                image_url: item.image_url,
                singlePlayer: item.singlePlayer,
                multiplayer: item.multiplayer,
                name: item.name,
                platform: item.platform,
                release: item.release,
            };
        });

        if (inputSearch === undefined) {
            fetchDataGame();
        } else {
            let filter = getData.filter((e) => {
                return Object.values(e).join(" ").toLowerCase().includes(inputSearch.toLowerCase());
            });
            setDataGame([...filter]);
        }
        setInputSearch("");
    };

    const functionFilterGame = async () => {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`);
        let getData = result.data.map((item) => {
            return {
                id: item.id,
                genre: item.genre,
                image_url: item.image_url,
                singlePlayer: item.singlePlayer,
                multiplayer: item.multiplayer,
                name: item.name,
                platform: item.platform,
                release: item.release,
            };
        });

        if (filter.genre === "" && filter.platform === "" && filter.year === "") {
            fetchDataGame();
        } else {
            let filterdata = getData.filter((e) => {
                return (
                    e.genre.toLowerCase() == filter.genre.toLowerCase() ||
                    e.platform.toLowerCase() == filter.platform.toLowerCase() ||
                    e.release == filter.year
                );
            });
            setDataGame([...filterdata]);
        }
    };

    const functionDetailGame = (id) => {
        history.push(`/games/detail/${id}`);
    };

    const functionEditGame = (id) => {
        history.push(`/game-settings/edit-game/${id}`);
    };

    const functionDeleteGame = (id) => {
        axios
            .delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
                headers: { Authorization: "Bearer " + Cookies.get("token") },
            })
            .then(() => {
                let newData = dataGame.filter((item) => {
                    return item.id !== id;
                });
                setDataGame(newData);
                message.success("Data Successfully Deleted!!");
            });
    };

    const functionsGame = {
        fetchDataGame,
        functionDetailGame,
        functionSearchGame,
        functionFilterGame,
        fetchDataById,
        functionEditGame,
        functionDeleteGame,
        fetchDataGameById,
        functionSubmitGame,
        functionUpdateGame,
    };

    return (
        <GameContext.Provider
            value={{
                inputGame,
                setInputGame,
                dataGame,
                setDataGame,
                inputSearch,
                setInputSearch,
                searchTrigger,
                setSearchTrigger,
                filter,
                setFilter,
                functionsGame,
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
};
