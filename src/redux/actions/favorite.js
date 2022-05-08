import API from '../../api';

export const AddFavorite= (data) => {
    const url = (`/v1/movie/favorite`);
    const request = API.post(url, data);
    return {
        type: 'ADD_FAVORITE',
        payload: request
    };
};
export const GetAllFavorite = () => {
    const url = (`/v1/movie/favorite`);
    const request = API.get(url);
    return {
        type: 'GET_ALL_FAVORITE',
        payload: request
    };
};
export const GetUserFavorite = (uid) => {
    const url = (`/v1/movie/userfavorite`);
    const request = API.post(url, uid);
    return {
        type: 'GET_USER_FAVORITE',
        payload: request
    };
};
export const DeleteFavorite = (data) => {
    const url = (`/v1/movie/favorite`);
    const request = API.delete(url, data);
    return {
        type: 'DELETE_FAVORITE',
        payload: request
    };
};