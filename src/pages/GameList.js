import React, { useContext, useEffect } from "react";
import { PageContext } from "../contexts/PageContext";
import { GameContext } from "./../contexts/GameContext";

const GameList = () => {
    const { setPage } = useContext(PageContext);

    const { dataGame, functionsGame } = useContext(GameContext);

    const { fetchDataGame, functionDetailGame } = functionsGame;

    setPage("games");
    useEffect(() => {
        fetchDataGame();
    }, []);

    const handleDetailGame = (event) => {
        let idGame = parseInt(event.target.value);
        functionDetailGame(idGame);
    };

    return (
        <div className="container">
            <div className="container-game">
                <h2>Game Lists</h2>
                <div className="text-link">
                    <p>Explore popular games here</p>
                </div>
                <div className="container-card">
                    {dataGame.map((item, index) => {
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

export default GameList;
