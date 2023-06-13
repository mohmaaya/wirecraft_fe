import { useMutation } from "@tanstack/react-query";
import useForm from './useForm';
import { createUser } from "./api/users";
import { useNavigate } from 'react-router-dom';
import './Designs/SignUpPage.css';

const SignUpPage = () => {
    const navigate = useNavigate();

    const createSignUp = useMutation({
        mutationFn: createUser,
        onSuccess: data => {
            console.log(data);
            navigate('/Login');
        },
    });

    const { values, errors, handleChange, handleSubmit } = useForm(
        { name: '', username: '', password: '', dob: '', city: '', designation: '' },
        (data) => {
            console.log(data);
            createSignUp.mutate({ data });
        },
        (data) => { }
        );

        return (
            <div className="signup-container">
                <form onSubmit={handleSubmit} className="signup-form">
                    <h2 className="signup-title">Sign Up for Friends' App</h2>

                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="signup-input"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            className="signup-input"
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className="signup-input"
                            placeholder="Password"
                        />
                    <input
                        type="text"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        className="signup-input"
                        placeholder="Date of Birth (dd/mm/yyyy)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                    />
                    
                        <input
                            type="text"
                            name="City"
                            value={values.address}
                            onChange={handleChange}
                            className="signup-input"
                            placeholder="City"
                        />
                        <input
                            type="text"
                            name="designation"
                            value={values.description}
                            onChange={handleChange}
                            className="signup-input"
                            placeholder="Designation"
                        />
                        <button type="submit" className="signup-button">Sign Up</button>
                           <div className="already-signed-up"> Already Signed up? </div>
                        <button onClick={() => navigate('/Login')} className="login-button">Log In</button>
                 </form>

             </div>
      
    );
};

export default SignUpPage;
