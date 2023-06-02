import { useMutation } from "@tanstack/react-query"
import useForm from './useForm';
import { login } from "./api/users"


const LoginPage = () => {

    const createLogin = useMutation({
        mutationFn: login,
        onSuccess: data => {

            console.log(",",data);
        },
    })

    const { values, errors, handleChange, handleSubmit } = useForm(
        { username: '', password: '' },
        (data) => {
            createLogin.mutate({ data });
        },

        (data) => {


        }
    );

    return (
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
    );

};

export default LoginPage;