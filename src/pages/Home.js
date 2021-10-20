import React, { useContext, useEffect } from "react";
import { StarFilled, ClockCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MovieContext } from "./../contexts/MovieContext";
import { GameContext } from "./../contexts/GameContext";
import { PageContext } from "../contexts/PageContext";

const Home = () => {
    const { setPage } = useContext(PageContext);

    const { dataMovie, functions } = useContext(MovieContext);
    const { dataGame, functionsGame } = useContext(GameContext);

    const { fetchData, functionDetailMovie } = functions;
    const { fetchDataGame, functionDetailGame } = functionsGame;

    setPage("home");
    useEffect(() => {
        fetchData();
        fetchDataGame();
    }, []);

    const handleDetailMovie = (event) => {
        let idMovie = parseInt(event.target.value);
        functionDetailMovie(idMovie);
    };

    const handleDetailGame = (event) => {
        let idGame = parseInt(event.target.value);
        functionDetailGame(idGame);
    };

    return (
        <div className="container">
            <div className="container-movie">
                <h2>Popular Movies</h2>
                <div className="text-link">
                    <p>Find your favorite movies here</p>
                    <Link to="/movies">See All</Link>
                </div>
                <div className="container-card">
                    {dataMovie.slice(0, 5).map((item, index) => {
                        return (
                            <div key={index} className="card">
                                <div className="card-img">
                                    <img src={item.image_url} alt="img-card" />
                                    <p className="card-rating">
                                        <StarFilled /> {item.rating}/10
                                    </p>
                                    <p className="card-duration">
                                        <ClockCircleFilled /> {item.duration}min
                                    </p>
                                </div>
                                <div className="card-info">
                                    <h3>
                                        {item.title} ({item.year})
                                    </h3>
                                    <div className="card-genre">
                                        <span>{item.genre}</span>
                                    </div>
                                    <button
                                        className="btn btn-detail"
                                        onClick={handleDetailMovie}
                                        value={item.id}
                                    >
                                        DETAIL
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="container-game">
                <h2>Popular Games</h2>
                <div className="text-link">
                    <p>Explore popular games here</p>
                    <Link to="/games">See All</Link>
                </div>
                <div className="container-card">
                    {dataGame.slice(0, 5).map((item, index) => {
                        return (
                            <div key={index} className="card">
                                <div className="card-img">
                                    <img src={item.image_url} alt="img-card" />
                                </div>
                                <div className="card-info">
                                    <h3>
                                        {item.name} ({item.release})
                                    </h3>
                                    <div className="card-genre">
                                        <span>{item.genre}</span>
                                    </div>
                                    <button
                                        className="btn btn-detail"
                                        onClick={handleDetailGame}
                                        value={item.id}
                                    >
                                        DETAIL
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
