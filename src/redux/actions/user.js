import axios from 'axios';

export const UserRegister = (data) => {
    const url = (`http://localhost:4000/v1/user/create`);
    const request = axios.post(url, data);
    return {
        type: 'REGISTER',
        payload: request
    };
};
export const GetUsers = () => {
    const url = (`localhost:4000/v1/user/getusers`);
    const request = axios.get(url);
    return {
        type: 'GET_USERS',
        payload: request
    };
};