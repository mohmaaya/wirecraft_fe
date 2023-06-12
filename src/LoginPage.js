import { useMutation } from "@tanstack/react-query";
import useForm from "./useForm";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

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
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>

            <button onClick={() => navigate("/SignUp")}>Sign Up</button>
        </>
    );
};

export default LoginPage;
