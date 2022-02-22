let data = {
    data: ''
};

const discoverReducer = (state = data, action) => {
    switch(action.type) {
        case 'GET_DISCOVER_FULFILLED' : 
            state.data = action.payload.data;
            return state;
            
        default : return state;
    }
}

export default discoverReducer;