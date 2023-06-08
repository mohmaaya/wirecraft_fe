import { useMutation } from "@tanstack/react-query"
import AddFriends from './Friends/AddFriends'
import DeleteFriend from './Friends/DeleteFriend'
import MyFriends from './Friends/MyFriends'
import NearbyFriends from './Friends/NearbyFriends'
import PendingRequests from './Friends/PendingRequests'
import { useState } from 'react'
import { logOut } from './api/users'

const UserIndex = ({username}) => {


    const [currTabRender, setCurrTab] = useState(null);

    const userlogOut = useMutation({
        mutationFn: logOut,
        onSuccess: () => {

            console.log("Looged Out");
        },
    })

    return (
        
        <div>
            <h2> Welcome {username} </h2>
            <br/>
            <button onClick={() => { setCurrTab(<AddFriends username={username} />) }}>
                Add Friends
            </button>
            <button onClick={() => { setCurrTab(<MyFriends username={username} />) }}>
                My Friends
            </button>
            <button onClick={() => { setCurrTab(<PendingRequests username={username} />) }}>
                Pending Requests
            </button>
            <button onClick={() => { setCurrTab(<DeleteFriend username={username} />) }}>
                Delete a friend
            </button>
            <button onClick={() => { setCurrTab(<NearbyFriends username={username} />) }}>
                Friends nearby
            </button>

            <button onClick={() => { userlogOut.mutate() }}>Log Out</button>

            {currTabRender}

        </div>
        
        
        
        );


};

export default UserIndex;