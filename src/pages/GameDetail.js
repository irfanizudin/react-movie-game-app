import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "./../contexts/GameContext";

const GameDetail = () => {
    const { functionsGame, inputGame } = useContext(GameContext);

    const { fetchDataById } = functionsGame;

    let { Id } = useParams();

    useEffect(() => {
        if (Id !== undefined) {
            fetchDataById(Id);
        }
    }, []);

    return (
        <div className="container">
            <div className="container-detail">
                <h2>Game Details</h2>
                <div className="detail-group">
                    <div className="detail-img">
                        <img src={inputGame.image_url} alt="img-detail" />
                    </div>
                    <div className="detail-info">
                        <h3>{inputGame.name}</h3>
                        <p>
                            <strong>Release : </strong>
                            {inputGame.release}
                        </p>
                        <p>
                            <strong>Genre : </strong>
                            {inputGame.genre}
                        </p>
                        <p>
                            <strong>Platform : </strong>
                            {inputGame.platform}
                        </p>
                        <p>
                            <strong>Single Player : </strong>
                            {inputGame.singlePlayer ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>Multi Player : </strong>
                            {inputGame.multiplayer ? "Yes" : "No"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetail;
