import { useMutation } from "@tanstack/react-query";
import useForm from "./useForm";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";
import "./Designs/LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();

    const createLogin = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("loggedUsername", data.username);
            localStorage.setItem("access_token", data.access_token);
            navigate("/Home");
        },
        config: {
            credentials: "include",
        },
    });

    const { values, errors, handleChange, handleSubmit } = useForm(
        { username: "", password: "" },
        (data) => {
            createLogin.mutate({ data });
        },
        (data) => { }
    );

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
                />
                <input
                    className="login-input"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button className="login-button" type="submit">Submit</button>
                <div className="sign-up"> New User? Sign up</div>
                <button className="login-button" onClick={() => navigate("/SignUp")}>Sign Up</button>
            </form>

        </div>
    );
};

export default LoginPage;
