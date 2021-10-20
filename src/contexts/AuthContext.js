import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    let history = useHistory();

    const [inputAuth, setInputAuth] = useState({
        name: "",
        email: "",
        password: "",
        current_password: "",
        new_password: "",
        new_confirm_password: "",
    });

    const functionLogin = async () => {
        axios
            .post("https://backendexample.sanbersy.com/api/user-login", {
                email: inputAuth.email,
                password: inputAuth.password,
            })
            .then((res) => {
                let user = res.data.user;
                let token = res.data.token;
                Cookies.set("user", user.name, { expires: 1 });
                Cookies.set("email", user.email, { expires: 1 });
                Cookies.set("token", token, { expires: 1 });
                history.push("/");
                message.success("Login Success!!");
            })
            .catch((err) => {
                alert(err);
            });
    };

    const functionRegister = async () => {
        axios
            .post("https://backendexample.sanbersy.com/api/register", {
                name: inputAuth.name,
                email: inputAuth.email,
                password: inputAuth.password,
            })
            .then(() => {
                history.push("/login");
                message.success("Congratulations your account has been created!!");
            })
            .catch((err) => {
                alert(err);
            });
    };

    const functionPassword = async () => {
        axios
            .post(
                "https://backendexample.sanbersy.com/api/change-password",
                {
                    current_password: inputAuth.current_password,
                    new_password: inputAuth.new_password,
                    new_confirm_password: inputAuth.new_confirm_password,
                },
                {
                    headers: { Authorization: "Bearer " + Cookies.get("token") },
                }
            )
            .then(() => {
                message.success("Congratulations your password has been updated!!");
            })
            .catch((err) => {
                alert(err);
            });
    };

    const functionsAuth = {
        functionLogin,
        functionRegister,
        functionPassword,
    };

    return (
        <AuthContext.Provider
            value={{
                inputAuth,
                setInputAuth,
                functionsAuth,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
