import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import MovieList from "./pages/MovieList";
import GameList from "./pages/GameList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { MovieProvider } from "./contexts/MovieContext";
import MovieDetail from "./pages/MovieDetail";
import { GameProvider } from "./contexts/GameContext";
import GameDetail from "./pages/GameDetail";
import { AuthProvider } from "./contexts/AuthContext";
import MovieSetting from "./pages/MovieSetting";
import MovieForm from "./pages/MovieForm";
import GameSetting from "./pages/GameSetting";
import { PageProvider } from "./contexts/PageContext";
import ChangePassword from "./pages/ChangePassword";
import GameForm from "./pages/GameForm";

const Routes = () => {
    return (
        <Router>
            <PageProvider>
                <AuthProvider>
                    <MovieProvider>
                        <GameProvider>
                            <Switch>
                                <Route path="/" exact>
                                    <Layout content={<Home />} />
                                </Route>
                                <Route path="/movies" exact>
                                    <Layout content={<MovieList />} />
                                </Route>
                                <Route path="/movies/detail/:Id" exact>
                                    <Layout content={<MovieDetail />} />
                                </Route>
                                <Route path="/movie-settings" exact>
                                    <Layout content={<MovieSetting />} />
                                </Route>
                                <Route path="/movie-settings/add-movie" exact>
                                    <Layout content={<MovieForm />} />
                                </Route>
                                <Route path="/movie-settings/edit-movie/:Id" exact>
                                    <Layout content={<MovieForm />} />
                                </Route>
                                <Route path="/games" exact>
                                    <Layout content={<GameList />} />
                                </Route>
                                <Route path="/games/detail/:Id" exact>
                                    <Layout content={<GameDetail />} />
                                </Route>
                                <Route path="/game-settings" exact>
                                    <Layout content={<GameSetting />} />
                                </Route>
                                <Route path="/game-settings/add-game" exact>
                                    <Layout content={<GameForm />} />
                                </Route>
                                <Route path="/game-settings/edit-game/:Id" exact>
                                    <Layout content={<GameForm />} />
                                </Route>
                                <Route path="/login" exact>
                                    <Layout content={<Login />} />
                                </Route>
                                <Route path="/register" exact>
                                    <Layout content={<Register />} />
                                </Route>
                                <Route path="/change-password" exact>
                                    <Layout content={<ChangePassword />} />
                                </Route>
                            </Switch>
                        </GameProvider>
                    </MovieProvider>
                </AuthProvider>
            </PageProvider>
        </Router>
    );
};

export default Routes;
