import moviesReducer from "./movies";
import trendingReducer from "./trending";
import genresReducer from "./genres";
import countriesReducer from "./countries";
import discoverReducer from "./discover";
import searchReducer from "./search";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    movies : moviesReducer,
    trending : trendingReducer,
    genres : genresReducer,
    countries: countriesReducer,
    discover: discoverReducer,
    search: searchReducer,
});

export default allReducers;
