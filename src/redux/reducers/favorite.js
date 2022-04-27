let data = {
    data: '',
    error: '',
    message:''
};

const favoriteReducer = (state = data, action) => {
    switch(action.type) {
    case 'ADD_FAVORITE_FULFILLED' : 
        state.data = action?.payload?.data;
        state.message = action?.payload?.data?.message;
        return state;

    case 'ADD_FAVORITE_REJECTED' : 
        state.error = action?.payload?.response?.data?.message;
        return state;

    case 'ADD_FAVORITE_PENDING' : 
        return state;

    case 'GET_ALL_FAVORITE_FULFILLED' :
        state.data = action?.payload?.data;
        return state;

    case 'DELETE_FAVORITE_FULFILLED' :
        state.message = action?.payload?.data?.message;
        return state;

    default : return state;
    }
};

export default favoriteReducer;