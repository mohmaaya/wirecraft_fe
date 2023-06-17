import { sentRequestsApi, cancelSentRequestApi } from "../api/users"
import PopUp from "../PopUp"
import { useState } from 'react'
import { useQuery, useMutation } from "@tanstack/react-query"
import GenerateNewToken from "../RefreshToken"
import LogOut from '../Logout'

const SentRequests = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const userLogOut = LogOut();
    const genNewToken = GenerateNewToken();

    const sentRequests = useQuery({
        queryKey: ["sentRequests"],
        queryFn: sentRequestsApi,
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

    const cancelRequest = useMutation({
        mutationFn: cancelSentRequestApi,
        onSuccess: data => {
            sentRequests.refetch({ stale: true });
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } 
        }
    })

    const handleRequestCancel = friendUsername => {
        cancelRequest.mutate({ friendUsername });
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
            <h1 className="friends-title">Sent Requests</h1>

            <div className="friend-list-container">
                {sentRequests.data && sentRequests.data.length > 0 ? (
                    sentRequests.data.map(req => (
                        <div key={req.username} className="friend-item">

                        {req.name}
                      
                        <button onClick={() => handleRequestCancel(req.username)}>
                        Cancel Request
                    </button>
                        </div>
                    ))
                ) : (
                    <p className="no-friends-message">No sent requests.</p>
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

export default SentRequests;
