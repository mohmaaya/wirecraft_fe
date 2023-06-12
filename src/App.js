import SignUpPage from "./SignUpPage"
import LoginPage from "./LoginPage"
import UserIndex from './UserIndex'
import { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import GenerateNewToken from './RefreshToken'

export default function App() {

    const navigate = useNavigate();
    const location = useLocation();
    const genNewToken = GenerateNewToken();

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('refreshing', 'true');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const isRefreshing = localStorage.getItem('refreshing');
        if (isRefreshing === 'true') {
            genNewToken.mutate();
            localStorage.removeItem('refreshing');
        }
    }, []);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('loggedUsername');
        const shouldRedirect = ['/SignUp', '/Login'].includes(location.pathname);

        if (isAuthenticated && (shouldRedirect || location.pathname === '/')) {
            navigate('/Home', { replace: true });
        }
        if (!isAuthenticated && !shouldRedirect) navigate('/Login', { replace: true });
    }, [navigate, location]);


    return (
        <Routes>
            <Route path='/' />
            <Route path='/SignUp' element={<SignUpPage />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/Home' element={<UserIndex />} />
        </Routes>
    );
}
