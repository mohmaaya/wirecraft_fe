import { myFriendsApi, closestFriendsApi } from "../api/users";
import PopUp from "../PopUp";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import GenerateNewToken from "../RefreshToken";
import LogOut from "../Logout";

const FriendsNearby = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const userLogOut = LogOut();
    const genNewToken = GenerateNewToken();
   

    const myFriends = useQuery({
        queryKey: ["nearbyFriends"],
        queryFn: myFriendsApi,
        config: {
     
            credentials: "include",
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            }
        },
        retry: 1,
      
    });

    const closestFriends = useMutation({
        mutationFn: closestFriendsApi,
        onSuccess: (data) => {
            myFriends.refetch({ stale: true });
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } 
        },
        retry: 1,
    });

    const friendOptions = Array.from(
        { length: myFriends.data?.length || 0 },
        (_, index) => index + 1
    );

    const handlePopupYesClick = () => {
        genNewToken.mutate();
        setShowPopUp(false);
    };

    const handlePopupNoClick = () => {
        userLogOut.mutate();
        setShowPopUp(false);
    };

    const handleSelect = (event) => {
        const selectedFriendNum = parseInt(event.target.value);
        closestFriends.mutate({ selectedFriendNum });
    };

    useEffect(() => {
       
        myFriends.refetch();
    }, []);


    return (
        <div className="friends-container">
            <h1 className="friends-title">Nearby Friends</h1>
            <div className="friend-list-container">
            <select onChange={handleSelect}>
                <option value="">Select closest friends</option>
                {friendOptions.map((friendNumber) => (
                    <option key={friendNumber} value={friendNumber}>
                        {friendNumber}
                    </option>
                ))}
            </select>

                {closestFriends.data  &&
                    <h3>My city: {closestFriends.data.city}</h3>}

           
                {closestFriends.data && closestFriends.data.closestFriends.length > 0 ? (
                    closestFriends.data.closestFriends.map(friend => (
                        <div key={friend.username} className="friend-item">
                            <div className="info-row">
                                <span className="info-label">Name:</span>
                                <span className="info-value">{friend.name}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">City:</span>
                                <span className="info-value">{friend.city}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">Distance by Air:</span>
                                <span className="info-value">{friend.distance} km</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-friends-message">No friends selected.</p>
                )}
            </div>

            {showPopUp && (
                <PopUp onYes={handlePopupYesClick} onNo={handlePopupNoClick} />
            )}
        </div>
    );
};

export default FriendsNearby;
