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
            } else {
                console.log("Something went Wrong!")
            }
        }, retry: 1,
    })

    const acceptRequest = useMutation({
        mutationFn: acceptRequestApi,
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

    const declineRequest = useMutation({
        mutationFn: declineRequestApi,
        onSuccess: data => {
            console.log(data)
        },
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                setShowPopUp(true);
            } else {
                console.log("Something went Wrong!")
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
        <div>
            <h1>Add or Reject Friend Requests</h1>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {pendingRequests.data
                    ? pendingRequests.data.map(request => (
                        <li
                            key={request.username}
                            style={{ cursor: 'pointer', marginBottom: '1rem' }}
                        >
                            {request.name}
                            <br />
                            <button onClick={() => handleFriendAccept(request.username)}>
                                Accept
                            </button>
                           
                            <button onClick={() => handleFriendReject(request.username)}>
                                Reject
                            </button>
                        </li>
                    ))
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

export default PendingRequests;
