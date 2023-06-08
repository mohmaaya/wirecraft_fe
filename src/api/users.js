import axios from "axios"

export function createUser({ data }) {
    return axios
        .post("http://localhost:5000/signup", {
          data
        })
        .then(res => res.data)
}

export function login({ data }) {
    return axios
        .post("http://localhost:5000/login", {
            data
        })
        .then(res => res.data)
}

export function logOut() {
    return axios
        .delete("http://localhost:5000/logout")
        .then(res => res.data)
}