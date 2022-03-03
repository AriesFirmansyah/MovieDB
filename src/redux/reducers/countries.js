let data = {
    data: ''
};

const countriesReducer = (state = data, action) => {
    switch(action.type) {
    case 'GET_COUNTRIES_FULFILLED' : 
        state.data = action.payload.data;
        return state;
            
    default : return state;
    }
};

export default countriesReducer;