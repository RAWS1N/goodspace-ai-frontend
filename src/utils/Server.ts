import axios from 'axios'


// header information to the auth middleware
const headerData = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
}


// server instance to communicate with backend server
const backendUrl = import.meta.env.VITE_BASE_URL
export const Server = axios.create({
    baseURL : backendUrl,
    headers : headerData
})