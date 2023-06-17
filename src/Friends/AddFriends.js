import { findFriendsApi, friendRequestApi } from "../api/users"
import PopUp from "../PopUp"
import { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import GenerateNewToken from "../RefreshToken"
import LogOut from '../Logout'
import '../Designs/FriendsAPI.css'

const AddFriends = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const userLogOut = LogOut();
    const genNewToken = GenerateNewToken();

    const findFriends = useQuery({
        queryKey: ["findFriends"],
        queryFn: findFriendsApi,
        config: {
            credentials: 'include',
            
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } 
        },
        retry: 1,
    })

    const sendFriendRequest = useMutation({
        mutationFn: friendRequestApi,
        onSuccess: data => {
            findFriends.refetch({ stale: true });
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } 
        },
        retry: 1,
    })

    const handleFriendClick = friendUsername => {
        sendFriendRequest.mutate({ friendUsername });
    };

    const handlePopupYesClick = () => {
        genNewToken.mutate();
        setShowPopUp(false);
    };

    const handlePopupNoClick = () => {
        userLogOut.mutate();
        setShowPopUp(false);
    };

    return (
        <div className="friends-container">
            <h1 className="friends-title">Add Friends</h1>

            <div className="friend-list-container">
                {findFriends.data && findFriends.data.length > 0 ? (
                    findFriends.data.map(friend => (
                        <div key={friend.username} className="friend-item">
                            {friend.name} {friend.city && `from ${friend.city}`}
                            <button onClick={() => handleFriendClick(friend.username)}>Add friend</button>
                        </div>
                    ))
                ) : (
                    <p className="no-friends-message">No friends to add.</p>
                )}
            </div>


            {showPopUp && (
                <PopUp
                    onYes={handlePopupYesClick}
                    onNo={handlePopupNoClick}
                />
            )}
        </div>
    );
};

export default AddFriends;
