import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "./../contexts/MovieContext";

const MovieDetail = () => {
    const { functions, input } = useContext(MovieContext);

    const { fetchDataById } = functions;

    let { Id } = useParams();

    useEffect(() => {
        if (Id !== undefined) {
            fetchDataById(Id);
        }
    }, []);

    return (
        <div className="container">
            <div className="container-detail">
                <h2>Movie Details</h2>
                <div className="detail-group">
                    <div className="detail-img">
                        <img src={input.image_url} alt="img-detail" />
                    </div>
                    <div className="detail-info">
                        <h3>{input.title}</h3>
                        <p>
                            <strong>Rating : </strong>
                            {input.rating}/10
                        </p>
                        <p>
                            <strong>Release : </strong>
                            {input.year}
                        </p>
                        <p>
                            <strong>Duration : </strong>
                            {input.duration} min
                        </p>
                        <p>
                            <strong>Genre : </strong>
                            {input.genre}
                        </p>
                        <strong>Description :</strong>
                        <p>{input.description}</p>
                        <strong>Review :</strong>
                        <p>{input.review}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
