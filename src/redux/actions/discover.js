import Key from './../../components/Key';
import axios from 'axios';
const baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=";

export const GetMoviesCountry = (countryCode) => {
    const url = (`${baseURL}${Key}&language=en-US&region=${countryCode}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
    const request = axios.get(url);
    return {
        type: "GET_DISCOVER",
        payload: request
    };
}
export const GetMoviesYear = (Year) => {
    const url = (`${baseURL}${Key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${Year}&with_watch_monetization_types=flatrate`);
    const request = axios.get(url);
    return {
        type: "GET_DISCOVER",
        payload: request
    };
}
export const GetMoviesGenre = (genreId) => {
    const url = (`${baseURL}${Key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`);
    const request = axios.get(url);
    return {
        type: "GET_DISCOVER",
        payload: request
    };
}
export const GetMovies = () => {
    const url = (`${baseURL}${Key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
    const request = axios.get(url);
    return {
        type: "GET_DISCOVER",
        payload: request
    };
}
export const GetMoviesTrending = () => {
    const url = (`https://api.themoviedb.org/3/trending/movie/day?api_key=${Key}&language=en-US&page=1`);
    const request = axios.get(url);
    return {
        type: "GET_DISCOVER",
        payload: request
    };
}
export const GetMoviesNowPlaying = () => {
    const url = (`https://api.themoviedb.org/3/movie/now_playing?api_key=${Key}&language=en-US&page=1`);
    const request = axios.get(url);
    return {
        type: "GET_DISCOVER",
        payload: request
    };
}
export const GetMoviesPopular = () => {
    const url = (`https://api.themoviedb.org/3/movie/popular?api_key=${Key}&language=en-US&page=1`);
    const request = axios.get(url);
    return {
        type: "GET_DISCOVER",
        payload: request
    };
}
