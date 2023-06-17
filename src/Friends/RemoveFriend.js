import { removeFriendApi, myFriendsApi } from "../api/users"
import PopUp from "../PopUp"
import { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import GenerateNewToken from "../RefreshToken"
import LogOut from '../Logout'

const RemoveFriend = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const userLogOut = LogOut();
    const genNewToken = GenerateNewToken();

    const allFriends = useQuery({
        queryKey: ["friendToDelete"],
        queryFn: myFriendsApi,
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
        mutationFn: removeFriendApi,
        onSuccess: data => {
            allFriends.refetch({ stale: true });
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
            <h1 className="friends-title">Delete a Friend</h1>

            <div className="friend-list-container">
                {allFriends.data && allFriends.data.length > 0 ? (
                    allFriends.data.map(friend => (
                        <div key={friend.username} className="friend-item">
                      
                        {friend.name}
                        <button onClick={() => handleFriendClick(friend.username)}>Remove friend</button>
                        </div>
                     ))
            ) : (
                            <p className="no-friends-message">No friends to remove.</p>
                )}
            </div>

            {showPopUp && (
                <PopUp
                    onYes={handlePopupYesClick}
                    onNo={handlePopupNoClick}
                />
            )}
        </div>
    )
};

export default RemoveFriend;
