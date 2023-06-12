import { myFriendsApi, closestFriendsApi } from "../api/users";
import PopUp from "../PopUp";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
            } else {
                console.log("Something went Wrong!");
            }
        },
        retry: 1,
      
    });

    const closestFriends = useMutation({
        mutationFn: closestFriendsApi,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } else {
                console.log("Something went Wrong!");
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
        <div>
            <h1>Nearby Friends</h1>

            <select onChange={handleSelect}>
                <option value="">Select closest friends</option>
                {friendOptions.map((friendNumber) => (
                    <option key={friendNumber} value={friendNumber}>
                        {friendNumber}
                    </option>
                ))}
            </select>

            {closestFriends.data && <h3>My city: {closestFriends.data.city}</h3>}

            <ul style={{ listStyleType: "none", padding: 0 }}>
                {closestFriends.data
                    ? closestFriends.data.closestFriends.map((friend) => (
                        <li key={friend.username} style={{ marginBottom: "1rem" }}>
                            {friend.name}
                            <br />
                            {friend.city}
                            <br />
                            {friend.distance} km by Air.
                        </li>
                    ))
                    : []}
            </ul>

            {showPopUp && (
                <PopUp onYes={handlePopupYesClick} onNo={handlePopupNoClick} />
            )}
        </div>
    );
};

export default FriendsNearby;
