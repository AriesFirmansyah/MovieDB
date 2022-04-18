import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        let token = JSON.parse(localStorage.getItem('profile')).token;
        console.log('auth', token);
        req.headers.Authorization = `Bearer ${token}`;
    }
    
    return req;
});

// export const signIn = (data) => API.post(`/v1/auth/login`, data);

export default API;