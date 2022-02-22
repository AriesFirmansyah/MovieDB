let data = {
    data: ''
};

const trendingReducer = (state = data, action) => {
    switch(action.type) {
        case 'GET_TRENDING_FULFILLED' : 
            state.data = action.payload.data.results;
            return state;
            
        default : return state;
    }
}

export default trendingReducer;