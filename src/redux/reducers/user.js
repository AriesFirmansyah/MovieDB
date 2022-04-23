let data = {
    data: ''
};

const userReducer = (state = data, action) => {
    switch(action.type) {
    case 'REGISTER_FULFILLED' : 
        state.data = action.payload;
        return state;

    case 'GET_USERS_FULFILLED' : 
        state.data = action;
        return state;
            
    default : return state;
    }
};

export default userReducer;