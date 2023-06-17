import {  myFriendsApi } from "../api/users"
import PopUp from "../PopUp"
import { useState } from 'react'
import {  useQuery } from "@tanstack/react-query"
import GenerateNewToken from "../RefreshToken"
import LogOut from '../Logout'

const MyFriends = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const userLogOut = LogOut();
    const genNewToken = GenerateNewToken();

    const myFriends = useQuery({
        queryKey: ["myFriends"],
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

    const handlePopupYesClick = () => {
        genNewToken.mutate();
        setShowPopUp(false);
    };

    const handlePopupNoClick = () => {
        userLogOut.mutate();
        setShowPopUp(false);
    };

    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className="friends-container">
            <h1 className="friends-title">My Friends</h1>

            <div className="friend-list-container">
                {myFriends.data && myFriends.data.length > 0 ? (
                    myFriends.data.map(friend => (
                        <div key={friend.username} className="friend-item">
            
                            <div className="info-row">
                                <span className="info-label">Name:</span>
                                <span className="info-value">{friend.name}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">Date of Birth:</span>
                                <span className="info-value">{formatDate(friend.dob)}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">City:</span>
                                <span className="info-value">{friend.city}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-friends-message">No friends. Add some friends.</p>
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

export default MyFriends;
