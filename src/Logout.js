import { logOut } from './api/users'
import { useNavigate } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query"

const Logout = () => {

    const navigate = useNavigate();

    const userLogOut = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            localStorage.removeItem('loggedUsername');
            navigate('/Login');
        },
    })
    return userLogOut
};

export default Logout;