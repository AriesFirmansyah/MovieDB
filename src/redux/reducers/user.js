let data = {
    data: '',
    message: '',
    error: ''
};

const userReducer = (state = data, action) => {
    switch(action.type) {
    case 'REGISTER_FULFILLED' : 
        state.message = action?.payload?.message;
        state.data = action?.payload;
        state.error = '';
        return state;

    case 'REGISTER_REJECTED' : 
        state.error = action?.payload?.response?.data?.message;
        return state;

    case 'REGISTER_PENDING' : 
        return state;

    case 'GET_USERS_FULFILLED' : 
        state.data = action;
        return state;
            
    default : return state;
    }
};

export default userReducer;