import { acceptRequestApi, declineRequestApi, pendingRequestsApi } from "../api/users"
import PopUp from "../PopUp"
import { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import GenerateNewToken from "../RefreshToken"
import LogOut from '../Logout'

const PendingRequests = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const userLogOut = LogOut();
    const genNewToken = GenerateNewToken();

    const pendingRequests = useQuery({
        queryKey: ["pendingReqs"],
        queryFn: pendingRequestsApi,
        config: {
            credentials: 'include',
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } 
        }, retry: 1,
    })

    const acceptRequest = useMutation({
        mutationFn: acceptRequestApi,
        onSuccess: data => {
            pendingRequests.refetch({ stale: true });
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } 
        },
        retry: 1,
    })

    const declineRequest = useMutation({
        mutationFn: declineRequestApi,
        onSuccess: data => {
          
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            }
        }
    })

    const handleFriendAccept = friendUsername => {
        acceptRequest.mutate({ friendUsername });
    };

    const handleFriendReject = friendUsername => {
        declineRequest.mutate({ friendUsername });
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
            <h1 className="friends-title">Add or Reject Friend Requests</h1>

            <div className="friend-list-container">
                {pendingRequests.data && pendingRequests.data.length > 0 ? (
                    pendingRequests.data.map(request => (
                        <div key={request.username} className="friend-item">
                           
                            {request.name}
                            
                            <button  onClick={() => handleFriendAccept(request.username)}>
                                Accept
                            </button>
                           
                            <button className="second-button" onClick={() => handleFriendReject(request.username)}>
                                Reject
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-friends-message">No pending requests.</p>
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

export default PendingRequests;
