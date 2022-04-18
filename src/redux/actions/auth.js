// import axios from 'axios';
import API from '../../api';

export const AuthLogin = (data) => {
    const url = (`/v1/auth/login`);
    const request = API.post(url, data);
    return {
        type: 'LOGIN',
        payload: request
    };
};
export const AuthLogout = () => {
    return {
        type: 'LOGOUT'
    };
};