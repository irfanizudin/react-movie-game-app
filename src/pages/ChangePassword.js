import React, { useContext } from "react";
import { AuthContext } from "./../contexts/AuthContext";
import { PageContext } from "./../contexts/PageContext";

const ChangePassword = () => {
    const { setSidebarPage } = useContext(PageContext);

    const { inputAuth, setInputAuth, functionsAuth } = useContext(AuthContext);

    const { functionPassword } = functionsAuth;

    setSidebarPage("change-password");
    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setInputAuth({ ...inputAuth, [name]: value });
    };

    const handlePassword = (event) => {
        event.preventDefault();
        functionPassword();
        setInputAuth({ current_password: "", new_password: "", new_confirm_password: "" });
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-group">
                    <h2>Change Password</h2>
                    <form onSubmit={handlePassword} className="form-control">
                        <label htmlFor="current_password" className="form-label">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            className="form-input"
                            value={inputAuth.current_password}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="new_password" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new_password"
                            name="new_password"
                            className="form-input"
                            value={inputAuth.new_password}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="new_confirm_password" className="form-label">
                            New Confirm Password
                        </label>
                        <input
                            type="password"
                            id="new_confirm_password"
                            name="new_confirm_password"
                            className="form-input"
                            value={inputAuth.new_confirm_password}
                            onChange={handleChange}
                            required
                        />
                        <input type="submit" value="Change Password" className="btn btn-primary" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
