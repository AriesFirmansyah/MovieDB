import moviesReducer from './movies';
import trendingReducer from './trending';
import genresReducer from './genres';
import countriesReducer from './countries';
import discoverReducer from './discover';
import searchReducer from './search';
import authReducer from './auth';
import userReducer from './user';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    movies : moviesReducer,
    trending : trendingReducer,
    genres : genresReducer,
    countries: countriesReducer,
    discover: discoverReducer,
    search: searchReducer,
    auth: authReducer,
    user: userReducer,
});

export default allReducers;
