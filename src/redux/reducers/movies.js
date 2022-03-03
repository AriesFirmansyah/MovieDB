let data = {
    all_movie: '',
    popular: '',
    now_playing: '',
    details: '',
    details_backdrop: '',
    details_genre: '',
    details_video: '',
    details_image: '',
    details_credit: '',
    details_social_media: '',
    details_keyword: '',
    details_review: '',
    details_recommendation: '',
};


const moviesReducer = (state = data, action) => {
    switch(action.type) {
    case 'GET_POPULAR_FULFILLED' :
        state.popular = action.payload.data.results;
        return state;

    case 'GET_PLAYING_FULFILLED' :
        state.now_playing = action.payload.data.results;
        return state;

    case 'GET_MOVIE_DETAILS_FULFILLED' :
        if(action.payload.data.belongs_to_collection != null) {
            state.details_backdrop = action.payload.data
                .belongs_to_collection.backdrop_path;
        } else if (action.payload.data.backdrop_path != null){
            state.details_backdrop = action.payload.data.backdrop_path;
        } else {
            state.details_backdrop = action.payload.data.poster_path;
        }
        state.details_genre = action.payload.data.genres;

        state.details = action.payload.data;
        return state;
    
    case 'GET_VIDEO_MOVIE_DETAILS_FULFILLED' :
        state.details_video = action.payload.data.results;
        return state;

    case 'GET_IMAGE_MOVIE_DETAILS_FULFILLED' :
        state.details_image = action.payload.data.posters;
        return state;
            
    case 'GET_CREDIT_MOVIE_DETAILS_FULFILLED' :
        state.details_credit = action.payload.data;
        return state;

    case 'GET_SOCIAL_MEDIA_MOVIE_DETAILS_FULFILLED' :
        state.details_social_media = action.payload.data;
        return state;

    case 'GET_KEYWORD_MOVIE_DETAILS_FULFILLED' :
        state.details_keyword = action.payload.data;
        return state;
        
    case 'GET_REVIEW_MOVIE_DETAILS_FULFILLED' :
        state.details_review = action.payload.data.results;
        return state;

    case 'GET_RECOMENDATION_MOVIE_DETAILS_FULFILLED' :
        state.details_recommendation = action.payload.data.results;
        return state;

    case 'GET_ALL_MOVIE_FULFILLED' :
        state.all_movie = action.payload.data.results;
        return state;

    default : return state;
    }
};

export default moviesReducer;