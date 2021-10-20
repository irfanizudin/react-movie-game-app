import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext";

const Register = () => {
    const { inputAuth, setInputAuth, functionsAuth } = useContext(AuthContext);

    const { functionRegister } = functionsAuth;

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInputAuth({ ...inputAuth, [name]: value });
    };

    const handleRegister = (event) => {
        event.preventDefault();
        console.log(inputAuth);
        functionRegister();
        setInputAuth({ name: "", email: "", password: "" });
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-group">
                    <h2>Registration Form</h2>
                    <form onSubmit={handleRegister} className="form-control">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={inputAuth.name}
                            onChange={handleChange}
                            required
                        />
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
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </form>
                    <p>Already have account?</p>
                    <Link to="/login">
                        <button className="btn btn-outline">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
