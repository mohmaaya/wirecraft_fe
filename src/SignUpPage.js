import { useMutation } from "@tanstack/react-query"
import useForm from './useForm';
import { createUser } from "./api/users"

const SignUpPage = () => {


    const createSignUp = useMutation({
        mutationFn: createUser,
        onSuccess: data => {
        
            console.log(data);
        },
    })


    const { values, errors, handleChange, handleSubmit } = useForm(
        { username: '', password: '', name: '', dob: '', address: '', description: ''},
        (data) => {
            console.log(data);
            createSignUp.mutate({ data });
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
            <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
            />
            <input
                type="date"
                name="dob"
                value={values.dob}
                onChange={handleChange}
            />
            <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
            
        </form>
    );

};

export default SignUpPage;