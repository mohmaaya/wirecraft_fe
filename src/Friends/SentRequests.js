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
            } else {
                console.log("Something went Wrong!")
            }
        },
        retry: 1,
    })

    const cancelRequest = useMutation({
        mutationFn: cancelSentRequestApi,
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
        <div>
            <h1>Sent Requests</h1>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {sentRequests.data ? sentRequests.data.map(req => (
                    <li
                        key={req.username}
                        style={{ marginBottom: '1rem' }}
                    >
                        {req.name}
                        <br />
                        <button onClick={() => handleRequestCancel(req.username)}>
                        Cancel Request
                    </button>
                       
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

export default SentRequests;
