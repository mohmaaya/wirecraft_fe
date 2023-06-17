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
            <h1 className="friends-title">My Details</h1>
            <div className="friend-list-container">
                {myDetails.data ?
                    <div className="friend-item">

                        <div className="info-row">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{myDetails.data.name}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Date of Birth:</span>
                            <span className="info-value">{formatDate(myDetails.data.dob)}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">City:</span>
                            <span className="info-value">{myDetails.data.city}</span>
                        </div>
                        
                        <div className="info-row">
                            <span className="info-label">Latitude:</span>
                            <span className="info-value">{myDetails.data.latitude}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Longitude:</span>
                            <span className="info-value">{myDetails.data.longitude}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Designation:</span>
                            <span className="info-value">{myDetails.data.designation}</span>
                        </div>

                        <div className="info-row">
                            <span className="info-label">Friends:</span>
                            <span className="info-value">{myDetails.data.friends}</span>
                        </div>
                       
                    </div>

                 : []}
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

export default UserProfile;
