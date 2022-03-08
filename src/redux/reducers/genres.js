let data = {
    data: ''
};

const genresReducer = (state = data, action) => {
    switch(action.type) {
    case 'GET_GENRES_FULFILLED' : 
        state.data = action.payload.data.genres;
        return state;
            
    default : return state;
    }
};

export default genresReducer;