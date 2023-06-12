import { findFriendsApi, friendRequestApi } from "../api/users"
import PopUp from "../PopUp"
import { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import GenerateNewToken from "../RefreshToken"
import LogOut from '../Logout'

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
            } else {
                console.log("Something went Wrong!")
            }
        },
        retry: 1,
    })

    const sendFriendRequest = useMutation({
        mutationFn: friendRequestApi,
        onSuccess: data => {
            console.log(data)
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

    const handleFriendClick = friendUsername => {
        console.log("Friend in handleClick", friendUsername)
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
        <div>
            <h1>Add Friends</h1>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {findFriends.data ? findFriends.data.map(friend => (
                    <li
                        key={friend.username}
                        style={{ cursor: 'pointer', marginBottom: '1rem' }}
                        onClick={() => handleFriendClick(friend.username)}
                    >
                        {friend.name}
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

export default AddFriends;
