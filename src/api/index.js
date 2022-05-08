import axios from "axios";

// eslint-disable-next-line no-undef
const API = axios.create({ baseURL: process.env.API });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        let token = JSON.parse(localStorage.getItem('profile')).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    
    return req;
});

// export const signIn = (data) => API.post(`/v1/auth/login`, data);

export default API;