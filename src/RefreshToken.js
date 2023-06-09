import { refreshTokenApi } from './api/users';
import { useMutation } from "@tanstack/react-query";
import LogOut from './Logout';

const GenerateNewToken = () => {
    const userLogOut = LogOut();

    const genNewToken = useMutation({
        mutationFn: refreshTokenApi,
        onSuccess: (data) => {
            localStorage.removeItem('access_token');
            localStorage.setItem('access_token', data.access_token);
        },
        onError: (error) => {
            if (error.response && error.response.status === 403) {
                userLogOut.mutate();
            } 
        }
    });
    
    return genNewToken;
};

export default GenerateNewToken;
