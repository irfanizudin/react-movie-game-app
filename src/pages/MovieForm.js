import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "./../contexts/MovieContext";

const MovieForm = () => {
    let { Id } = useParams();

    const { functions, input, setInput, buttonState, currentId } = useContext(MovieContext);

    const { functionSubmitMovie, fetchDataMovieById, functionUpdateMovie } = functions;

    useEffect(() => {
        if (Id !== undefined) {
            fetchDataMovieById(Id);
        }
    }, []);

    const handleChangeMovie = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInput({ ...input, [name]: value });
    };

    const handleSubmitMovie = (event) => {
        event.preventDefault();
        // console.log(input);
        // functionSubmitMovie();
        if (currentId === null) {
            functionSubmitMovie();
        } else {
            functionUpdateMovie();
        }
        setInput({
            description: "",
            duration: "",
            genre: "",
            image_url: "",
            rating: "",
            review: "",
            title: "",
            year: "",
        });
        // if (currentId === null) {
        //     functionSubmit();
        // } else {
        //     functionUpdate();
        // }
        // setName('');
        // setCategory('');
        // setDescription('');
        // setReleaseYear(2007);
        // setSize('');
        // setPrice('');
        // setRating('');
        // setImageUrl('');
    };

    return (
        <div className="container">
            <div className="container-movie">
                <h2>Add Movie</h2>
                <form onSubmit={handleSubmitMovie} className="movie-add">
                    <div className="form-control">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="form-input form-add"
                            required
                            value={input.title}
                            onChange={handleChangeMovie}
                        />
                    </div>
                    <div className="form-control-column">
                        <div className="form-control-child">
                            <label htmlFor="rating" className="form-label">
                                Rating
                            </label>
                            <input
                                type="number"
                                name="rating"
                                id="rating"
                                className="form-input form-add"
                                min="0"
                                max="10"
                                required
                                value={input.rating}
                                onChange={handleChangeMovie}
                            />
                        </div>
                        <div className="form-control-child">
                            <label htmlFor="year" className="form-label">
                                Year
                            </label>
                            <input
                                type="number"
                                name="year"
                                id="year"
                                className="form-input form-add"
                                min="1980"
                                max="2021"
                                required
                                value={input.year}
                                onChange={handleChangeMovie}
                            />
                        </div>
                        <div className="form-control-child">
                            <label htmlFor="duration" className="form-label">
                                Duration
                            </label>
                            <input
                                type="number"
                                name="duration"
                                id="duration"
                                className="form-input form-add"
                                required
                                value={input.duration}
                                onChange={handleChangeMovie}
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label htmlFor="genre" className="form-label">
                            Genre
                        </label>
                        <input
                            type="text"
                            name="genre"
                            id="genre"
                            className="form-input form-add"
                            required
                            value={input.genre}
                            onChange={handleChangeMovie}
                        />
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
                            value={input.image_url}
                            onChange={handleChangeMovie}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            className="form-input form-text-area"
                            required
                            value={input.description}
                            onChange={handleChangeMovie}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="review" className="form-label">
                            Review
                        </label>
                        <textarea
                            name="review"
                            id="review"
                            className="form-input form-text-area"
                            required
                            value={input.review}
                            onChange={handleChangeMovie}
                        />
                    </div>
                    <div className="form-control">
                        <input type="submit" value={buttonState} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieForm;
