import axios from "axios"

export function createUser({ data }) {
    return axios
        .post("http://localhost:5000/users/signup", {
          data
        })
        .then(res => res.data)
}

export function login({ data }) {
    return axios
        .post("http://localhost:5000/users/login", {
            data
        })
        .then(res => res.data)
}