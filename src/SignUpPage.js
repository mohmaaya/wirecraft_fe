import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from 'react';
import useForm from './useForm';
import { createUser } from "./api/users";
import { useNavigate } from 'react-router-dom';
import './Designs/SignUpPage.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameTaken, isUsernameTaken] = useState(false);
    const [userCreated, isUserCreated] = useState(false);
    const [loading, isLoading] = useState(false);
   
    const createSignUp = useMutation({
        mutationFn: createUser,
        onSuccess: data => {
            isLoading(false);
            if (usernameTaken) {
                isUsernameTaken(false);
            }
            if (usernameError) {
                setUsernameError(false);
            }
            if (passwordError) {
                setPasswordError(false);
            }
            isUserCreated(true);

            setTimeout(() => {
                navigate('/Login');
            }, 2000);
        },
        onError: error => {
            isLoading(false);
            if (error.response && error.response.status === 400) {
                isUsernameTaken(true);
            }
        },
        
    });

    useEffect(() => {
        if (createSignUp.status === "loading") {
            isLoading(true);
        }
    }, [createSignUp.status]);


    const { values, handleErrors, handleChange, handleSubmit } = useForm(
        { name: '', username: '', password: '', dob: '', city: '', designation: '' },
        (data) => {
            createSignUp.mutate({ data });
        },
        (data) => {
            let errors = {};
            const usernamePattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]+$/i;
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            const validateUsername = usernamePattern.test(data.username);
            const validatePassword = passwordPattern.test(data.password);
            if (!validateUsername)
                errors.username = 'Faulty Username';
            if (!validatePassword)
                errors.password = 'Faulty Password';
            setUsernameError(false);
            setPasswordError(false);
            isUsernameTaken(false);
            return errors;
        }
    );

    useEffect(() => {
        const hasUsernameError = handleErrors.hasOwnProperty('username');
        const hasPasswordError = handleErrors.hasOwnProperty('password');
        setUsernameError(hasUsernameError);
        setPasswordError(hasPasswordError);

        if (!hasUsernameError) {
            setUsernameError(false);
        }
        if (!hasPasswordError) {
            setPasswordError(false);
        }
    }, [handleErrors]);

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
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder="Username"
                    required
                />
                {usernameTaken && <p className="error-message">Username already taken.</p>}

                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder="Password"
                    required
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
                    required
                />

                <input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder="City"
                    required
                />
                <input
                    type="text"
                    name="designation"
                    value={values.designation}
                    onChange={handleChange}
                    className="signup-input"
                    placeholder="Designation"
                    required
                />
                <button type="submit" className="signup-button">Sign Up</button>
                <div className="already-signed-up">Already Signed up?</div>
                <button onClick={() => navigate('/Login')} className="login-button">Log In</button>

                <div>
                    {loading && <p className="loading-message">Loading...</p>}
                    {usernameError && passwordError && <p className="error-message">Username should contain both lowercase letters and numbers. Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character.</p>}
                    {usernameError && !passwordError && <p className="error-message">Username should contain both lowercase letters and numbers.</p>}
                    {!usernameError && passwordError && <p className="error-message">Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character.</p>}
                    {userCreated && <p className="success-message">User successfully Created! Redirecting...</p>}
                </div>
               

                </form>
        </div>
    );
};

export default SignUpPage;
