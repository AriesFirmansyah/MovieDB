import Key from './../../components/Key';
import axios from 'axios';

export const GetGenres = () => {
    const url = (`https://api.themoviedb.org/3/genre/movie/list?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_GENRES',
        payload: request
    };
};