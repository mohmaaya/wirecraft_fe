import SignUpPage from "./SignUpPage"
import LoginPage from "./LoginPage"
import UserIndex from './UserIndex'
import { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

export default function App() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('loggedUsername');
        const shouldRedirect = ['/SignUp', '/Login'].includes(location.pathname);

        if (isAuthenticated && (shouldRedirect || location.pathname === '/')) {
            navigate('/Home', { replace: true });
        }
        if (location.pathname === '/') navigate('/Login', { replace: true });
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
