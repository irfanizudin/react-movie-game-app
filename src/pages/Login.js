import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext";
import { PageContext } from "./../contexts/PageContext";

const Login = () => {
    const { setSidebarPage } = useContext(PageContext);

    const { inputAuth, setInputAuth, functionsAuth } = useContext(AuthContext);

    const { functionLogin } = functionsAuth;

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInputAuth({ ...inputAuth, [name]: value });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(inputAuth);
        functionLogin();
        setSidebarPage("movie-settings");
        setInputAuth({ email: "", password: "" });
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-group">
                    <h2>Login Form</h2>
                    <form onSubmit={handleLogin} className="form-control">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={inputAuth.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={inputAuth.password}
                            onChange={handleChange}
                            required
                        />
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </form>
                    <p>Don't have account?</p>
                    <Link to="/register">
                        <button className="btn btn-outline">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
