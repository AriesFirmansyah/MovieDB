import Key from './../../components/Key';
import axios from 'axios';


export const GetTrendingData = () => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${Key}`;
    const request = axios.get(url);
    return {
        type: 'GET_TRENDING',
        payload: request
    };
};