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
            } else {
                console.log("Something went Wrong!")
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

    return (
        <div>
            <h1>My Friends</h1>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {myFriends.data ? myFriends.data.map(friend => (
                    <li
                        key={friend.username}
                        style={{ marginBottom: '1rem' }}
                    >
                        {friend.name}
                        <br/>
                        {friend.dob}
                    </li>

                )) : []}
            </ul>

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
