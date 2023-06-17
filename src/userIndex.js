
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import LogOut  from './Logout'

export default function Navbar() {
    const username = localStorage.getItem('loggedUsername');
    const userLogOut = LogOut();

    return (

            <nav className="nav">
            <div >
            <ul>
                {username && (
                    <>
                        <CustomLink to="/Home/AddFriends">Add Friends</CustomLink>
                        <CustomLink to="/Home/MyFriends">My Friends</CustomLink>
                        <CustomLink to="/Home/NearbyFriends">Nearby Friends</CustomLink>
                        <CustomLink to="/Home/PendingRequests">Pending Requests</CustomLink>
                        <CustomLink to="/Home/RemoveFriend">Remove Friend</CustomLink>
                        <CustomLink to="/Home/SentRequests">Sent Requests</CustomLink>
                      
                    </>
                )}
                    <CustomLink to="/About">About</CustomLink>
                    {!username && (<CustomLink to="/Login">Login</CustomLink>)}
                    {username && (<CustomLink to="/Home/MyProfile">My Profile</CustomLink>)}
                    {username && (<li className="logout-btn"
                        onClick={() => { userLogOut.mutate() }}>Log Out
                    </li>)}
                </ul>
                </div>
            </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}