import React, { useContext, useEffect } from "react";
import { StarFilled, ClockCircleFilled } from "@ant-design/icons";
import { MovieContext } from "./../contexts/MovieContext";
import { PageContext } from "../contexts/PageContext";

const MovieList = () => {
    const { setPage } = useContext(PageContext);

    const { dataMovie, functions } = useContext(MovieContext);

    const { fetchData, functionDetailMovie } = functions;

    setPage("movies");
    useEffect(() => {
        fetchData();
    }, []);

    const handleDetailMovie = (event) => {
        let idMovie = parseInt(event.target.value);
        functionDetailMovie(idMovie);
    };

    return (
        <div className="container">
            <div className="container-movie">
                <h2>Movie Lists</h2>
                <div className="text-link">
                    <p>Find your favorite movies here</p>
                </div>
                <div className="container-card">
                    {dataMovie.map((item, index) => {
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
        </div>
    );
};

export default MovieList;
