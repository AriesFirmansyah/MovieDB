import axios from 'axios';

export const UserRegister = (data) => {
    // eslint-disable-next-line no-undef
    const url = (`${process.env.API}/v1/user/create`);
    const request = axios.post(url, data);
    return {
        type: 'REGISTER',
        payload: request
    };
};
export const GetUsers = () => {
    // eslint-disable-next-line no-undef
    const url = (`${process.env.API}/v1/user/getusers`);
    const request = axios.get(url);
    return {
        type: 'GET_USERS',
        payload: request
    };
};