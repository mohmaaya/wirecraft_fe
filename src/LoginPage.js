import { useMutation } from "@tanstack/react-query";
import useForm from "./useForm";
import { login } from "./api/users";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Designs/LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, isLoading] = useState(false);

    const createLogin = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            isLoading(false);
            localStorage.setItem("loggedUsername", data.username);
            localStorage.setItem("access_token", data.access_token);
            navigate("/Home");
        },
        onError: (error) => {
            isLoading(false);
            if (error.response && error.response.status === 400 && error.response.data.error === 'User not found') {
                setUsernameError(true);
            }
            if (error.response && error.response.status === 400 && error.response.data.error === 'Wrong password') {
                setPasswordError(true);
            }
          
        },
        config: {
            credentials: "include",
        },

    });

    const { values, handleChange, handleSubmit } = useForm(
        { username: "", password: "" },
        (data) => {
            createLogin.mutate({ data });
        },
        (data) => {

            setUsernameError(false);
            setPasswordError(false);
        }
    );

    useEffect(() => {
        if (createLogin.status === "loading") {
            isLoading(true);
        }
    }, [createLogin.status]);


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login to the Friends' App</h2>
                <input
                    className="login-input"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    

                />
                <input
                    className="login-input"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button className="login-button" type="submit">Submit</button>
                <div className="sign-up"> New User? Sign up</div>
                <button className="login-button" onClick={() => navigate("/SignUp")}>Sign Up</button>

                <div>
                    {loading && <p className="loading-message">Loading...</p>}
                    {usernameError && <p className="error-message">Username not found. Please check the username.</p>}
                    {passwordError && <p className="error-message">Wrong password. Please check the password.</p>}
                </div>

            </form>

        </div>
    );
};

export default LoginPage;
