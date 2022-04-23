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
export const AuthOthersLogin = (data) => {
    const url = (`/v1/auth/google-login`);
    const request = API.post(url, data);
    return {
        type: 'GOOGLE_LOGIN',
        payload: request
    };
};
export const AuthFacebookLogin = (profile) => {
    const url = (`/v1/auth/facebook-login`);
    const request = API.post(url, profile);
    return {
        type: 'FACEBOOK_LOGIN',
        payload: request
    };
};
export const AuthLogout = () => {
    return {
        type: 'LOGOUT'
    };
};