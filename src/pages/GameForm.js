import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "./../contexts/GameContext";

const GameForm = () => {
    let { Id } = useParams();

    const { functionsGame, inputGame, setInputGame, buttonState, currentId } =
        useContext(GameContext);

    const { functionSubmitGame, fetchDataGameById, functionUpdateGame } = functionsGame;

    useEffect(() => {
        if (Id !== undefined) {
            fetchDataGameById(Id);
        }
    }, []);

    const handleChangeGame = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInputGame({ ...inputGame, [name]: value });
    };

    const handleSubmitGame = (event) => {
        event.preventDefault();
        if (currentId === null) {
            functionSubmitGame();
        } else {
            functionUpdateGame();
        }
        setInputGame({
            genre: "",
            image_url: "",
            singlePlayer: "",
            multiplayer: "",
            name: "",
            platform: "",
            release: "",
        });
    };

    return (
        <div className="container">
            <div className="container-movie">
                <h2>Add Game</h2>
                <form onSubmit={handleSubmitGame} className="movie-add">
                    <div className="form-control">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-input form-add"
                            required
                            value={inputGame.name}
                            onChange={handleChangeGame}
                        />
                    </div>
                    <div className="form-control-column">
                        <div className="form-control-child">
                            <label htmlFor="genre" className="form-label">
                                Genre
                            </label>
                            <input
                                type="text"
                                name="genre"
                                id="genre"
                                className="form-input form-add"
                                required
                                value={inputGame.genre}
                                onChange={handleChangeGame}
                            />
                        </div>
                        <div className="form-control-child">
                            <label htmlFor="release" className="form-label">
                                Release Year
                            </label>
                            <input
                                type="number"
                                name="release"
                                id="release"
                                className="form-input form-add"
                                min="2000"
                                max="2021"
                                required
                                value={inputGame.release}
                                onChange={handleChangeGame}
                            />
                        </div>
                        <div className="form-control-child">
                            <label htmlFor="platform" className="form-label">
                                Platform
                            </label>
                            <input
                                type="text"
                                name="platform"
                                id="platform"
                                className="form-input form-add"
                                required
                                value={inputGame.platform}
                                onChange={handleChangeGame}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label htmlFor="image_url" className="form-label">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="image_url"
                            id="image_url"
                            className="form-input form-add"
                            required
                            value={inputGame.image_url}
                            onChange={handleChangeGame}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="singlePlayer" className="form-label">
                            Single Player
                        </label>
                        <select
                            name="singlePlayer"
                            id="singlePlayer"
                            value={inputGame.singlePlayer}
                            onChange={handleChangeGame}
                            className="form-input form-add"
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="multiplayer" className="form-label">
                            Multi Player
                        </label>
                        <select
                            name="multiplayer"
                            id="multiplayer"
                            value={inputGame.multiplayer}
                            onChange={handleChangeGame}
                            className="form-input form-add"
                        >
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <input type="submit" value={buttonState} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GameForm;
