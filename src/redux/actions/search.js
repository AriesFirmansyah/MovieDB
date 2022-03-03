import Key from './../../components/Key';
import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=';
export const GetSearch = (query) => {
    const url = `${baseUrl}${Key}&language=en-US&query=${query}&page=1&include_adult=fals`;
    const request = axios.get(url);
    return {
        type: 'GET_SEARCH',
        payload: request
    };
};