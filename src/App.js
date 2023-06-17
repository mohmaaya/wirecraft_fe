import SignUpPage from "./SignUpPage"
import LoginPage from "./LoginPage"
import Navbar from './userIndex'
import { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import GenerateNewToken from './RefreshToken'
import { FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa';
import MyFriends from "./Friends/MyFriends"
import FriendsNearby from "./Friends/NearbyFriends"
import PendingRequests from "./Friends/PendingRequests"
import SentRequests from "./Friends/SentRequests"
import RemoveFriend from "./Friends/RemoveFriend"
import AddFriends from "./Friends/AddFriends"
import UserProfile from "./UserProfile"
import About from "./About"

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
        const shouldRedirect = ['/SignUp', '/Login', '/About'].includes(location.pathname);

        if (isAuthenticated && (shouldRedirect || location.pathname === '/')) {
            navigate('/Home', { replace: true });
        }
        if (!isAuthenticated && !shouldRedirect) navigate('/Login', { replace: true });
    }, [navigate, location]);


    return (

        <div className='App'>

        <Navbar />

        <div className="github-links">
                <a href="https://github.com/mohmaaya/wirecraft_be" target="_blank" rel="noopener noreferrer">
            <span className="link-icon">
                <FaGithub size={24} />
            </span>
            BackEnd Code
        </a>

                <a href="https://github.com/mohmaaya/wirecraft_fe" target="_blank" rel="noopener noreferrer">
            <span className="link-icon">
                <FaGithub size={24} />
            </span>
            FrontEnd Code
        </a>
        </div>

            <Routes>
                <Route path="/" />
                <Route path="/SignUp" element={<SignUpPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/About" element={<About />} />
                <Route path="/Home/*">
                    <Route index element={<About />} />
                    <Route path="AddFriends" element={<AddFriends />} />
                    <Route path="MyFriends" element={<MyFriends />} />
                    <Route path="NearbyFriends" element={<FriendsNearby />} />
                    <Route path="PendingRequests" element={<PendingRequests />} />
                    <Route path="SentRequests" element={<SentRequests />} />
                    <Route path="RemoveFriend" element={<RemoveFriend />} />
                    <Route path="MyProfile" element={<UserProfile />} />
                </Route>
            </Routes>


            <div className='footer'>
                <span className="footer-text">
                    This Friends' web app is developed by Mohammed Ughratdar as a portfolio work.
                    Mohammed is looking for a fulltime position as a Developer.
                    He is skilled in both backend and frontend.
                    You may reach out to him using the contact details given below.
                </span>
            </div>

            <div className="contact-icons">
                
                <a href="mailto:mohammed.ughratdar@fau.de">
                    <FaEnvelope size={24} />
                    mohammed.ughratdar@fau.de
                </a>

                <span>
                    <FaPhone size={24} />
                    +49 151 6868 0236
                </span>

                <a href="https://www.linkedin.com/in/mohammed-ughratdar" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin"></i>
                    Linkedin Profile
                </a>
            </div>

        </div>
    );
}
