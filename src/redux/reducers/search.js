let data = {
    data: ''
};

const searchReducer = (state = data, action) => {
    switch(action.type) {
        case 'GET_SEARCH_FULFILLED' : 
            state.data = action.payload.data;
            return state;
            
        default : return state;
    }
}

export default searchReducer;