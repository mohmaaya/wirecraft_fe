import { myDetailsApi } from "./api/users"
import PopUp from "./PopUp"
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import GenerateNewToken from "./RefreshToken"
import LogOut from './Logout'

const UserProfile = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const userLogOut = LogOut();
    const genNewToken = GenerateNewToken();

    const myDetails = useQuery({
        queryKey: ["myDetails"],
        queryFn: myDetailsApi,
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
            <h1>My Details</h1>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {myDetails.data ?
                    <li
                        key={myDetails.data.name}
                        style={{ marginBottom: '1rem' }}
                    >
                        Name: {myDetails.data.name}
                        <br />
                        Date of Birth:{myDetails.data.dob}
                        <br/>
                        City: {myDetails.data.city}
                        <br />
                        Latitude: {myDetails.data.latitude} Longitude: {myDetails.data.longitude}
                        <br />
                        Description: {myDetails.data.desciption}
                        <br />
                        Friends: {myDetails.data.friends}
                        <br />
                    </li>

                 : []}
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

export default UserProfile;
