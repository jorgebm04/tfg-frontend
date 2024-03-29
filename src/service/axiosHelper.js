import axios from "axios";

axios.defaults.baseURL='http://localhost:8080'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token")
}

export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token",token)
}

export const getUserId = () => {
    return window.localStorage.getItem("user_id")
}

export const setUserId = (userId) => {
    return window.localStorage.setItem("user_id", userId)
}

export const request = (method,url,data) => {
    let headers = {}
    if(getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {"Authorization": `Bearer ${getAuthToken()}`}
    }

    return axios({
        method : method,
        headers : headers,
        url : url,
        data : data
    })
}