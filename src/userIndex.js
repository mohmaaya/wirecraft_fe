import AddFriends from './Friends/AddFriends'
import RemoveFriend from './Friends/RemoveFriend'
import MyFriends from './Friends/MyFriends'
import NearbyFriends from './Friends/NearbyFriends'
import SentRequests from './Friends/SentRequests'
import PendingRequests from './Friends/PendingRequests'
import UserProfile from './UserProfile'
import { useState } from 'react'
import LogOut  from './Logout'

const UserIndex = () => {

    const username = localStorage.getItem('loggedUsername');
    const [currTabRender, setCurrTab] = useState(null);
    const userLogOut = LogOut();

    return (
        
        <div>
            <h2> Welcome {username} </h2>
            <br/>
            <button onClick={() => { setCurrTab(<AddFriends />) }}>
                Add Friends
            </button>
            <button onClick={() => { setCurrTab(<MyFriends />) }}>
                My Friends
            </button>
            <button onClick={() => { setCurrTab(<PendingRequests  />) }}>
                Pending Requests
            </button>
            <button onClick={() => { setCurrTab(<SentRequests />) }}>
                Sent Requests
            </button>
            <button onClick={() => { setCurrTab(<RemoveFriend />) }}>
                Remove a friend
            </button>
            <button onClick={() => { setCurrTab(<NearbyFriends />) }}>
                Friends nearby
            </button>
            <button onClick={() => { setCurrTab(<UserProfile />) }}>
                My Profile
            </button>
            <button onClick={() => { userLogOut.mutate() }}>Log Out</button>

            {currTabRender}

        </div>
        
        
        
        );


};

export default UserIndex;