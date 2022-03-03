import Key from './../../components/Key';
import axios from 'axios';

export const GetPopular = ()  => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${Key}`;
    const request = axios.get(url);
    return {
        type: 'GET_POPULAR',
        payload: request
    };
};

export const GetNowPlaying = () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${Key}`;
    const request = axios.get(url);
    return {
        type: 'GET_PLAYING',
        payload: request
    };
};

export const GetMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_MOVIE_DETAILS',
        payload: request
    };
};
export const GetVideoMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_VIDEO_MOVIE_DETAILS',
        payload: request
    };
};
export const GetImageMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}/images?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_IMAGE_MOVIE_DETAILS',
        payload: request
    };
};
export const GetCreditMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_CREDIT_MOVIE_DETAILS',
        payload: request
    };
};
export const GetSocialMediaMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_SOCIAL_MEDIA_MOVIE_DETAILS',
        payload: request
    };
};
export const GetKeywordMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_KEYWORD_MOVIE_DETAILS',
        payload: request
    };
};
export const GetReviewMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_REVIEW_MOVIE_DETAILS',
        payload: request
    };
};
export const GetRecomendationMovieDetails = (id) => {
    const url = (`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${Key}`);
    const request = axios.get(url);
    return {
        type: 'GET_RECOMENDATION_MOVIE_DETAILS',
        payload: request
    };
};
export const GetAllMovie = () => {
    const url = (`https://api.themoviedb.org/3/discover/movie?api_key=${Key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
    const request = axios.get(url);
    return {
        type: 'GET_ALL_MOVIE',
        payload: request
    };
};

