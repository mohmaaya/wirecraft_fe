import { useState } from 'react';

const useForm = (initialValues, onSubmit, validation) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validation(values); 
        setErrors(validationErrors);

        if (!validationErrors) {
            onSubmit(values);
        }
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useForm;
