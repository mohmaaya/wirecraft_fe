import axios from "axios"

export function createUser({ data }) {
    return axios
        .post("http://51.20.115.23:5000/signup", {
          data
        })
        .then(res => res.data)
}

export function login({ data }) {
    return axios
        .post("http://51.20.115.23:5000/login", {
            data
        })
        .then(res => res.data)
}

export function logOut() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .delete("http://51.20.115.23:5000/logout", { headers: headers })
        .then(res => res.data)
}

export function findFriendsApi() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .get("http://51.20.115.23:4000/addfriends", { headers: headers })
        .then(res => res.data)
}

export function pendingRequestsApi() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .get("http://51.20.115.23:4000/checkpending", { headers: headers })
        .then(res => res.data)
}

export function myFriendsApi() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .get("http://51.20.115.23:4000/myfriends", { headers: headers })
        .then(res => res.data)
}

export function friendRequestApi({ friendUsername }) {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .post("http://51.20.115.23:4000/sendrequest",
            { friendUsername },
            { headers: headers }
        )
        .then(res => res.data)
}

export function acceptRequestApi({ friendUsername }) {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .post("http://51.20.115.23:4000/acceptfriend",
            { friendUsername },
            { headers: headers }
        )
        .then(res => res.data)
}

export function declineRequestApi({ friendUsername }) {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .post("http://51.20.115.23:4000/declinerequest",
            { friendUsername },
            { headers: headers }
        )
        .then(res => res.data)
}

export function cancelSentRequestApi({ friendUsername }) {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .post("http://51.20.115.23:4000/cancelrequest",
            { friendUsername },
            { headers: headers }
        )
        .then(res => res.data)
}

export function closestFriendsApi({ selectedFriendNum }) {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .get(`http://51.20.115.23:4000/friends/closest/${selectedFriendNum}`,
            { headers: headers }
        )
        .then(res => res.data)
}

export function removeFriendApi({ friendUsername }) {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .post("http://51.20.115.23:4000/removefriend",
            { friendUsername },
            { headers: headers }
        )
        .then(res => res.data)
}

export function myDetailsApi() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .get("http://51.20.115.23:4000/myprofile",
            { headers: headers }
        )
        .then(res => res.data)
}

export function sentRequestsApi() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .get("http://51.20.115.23:4000/sentrequests",
            { headers: headers }
        )
        .then(res => res.data)
}

export function refreshTokenApi() {
    const access_token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${access_token}`
    };
    return axios
        .get("http://51.20.115.23:5000/refreshtoken", { headers: headers })
        .then(res => res.data);
}
