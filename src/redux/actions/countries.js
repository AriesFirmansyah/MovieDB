import Key from '../../components/Key';
import axios from 'axios';

export const GetCountries = () => {
    const url = (`https://api.themoviedb.org/3/configuration/countries?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_COUNTRIES',
        payload: request
    };
};