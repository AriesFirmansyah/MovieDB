let data = {
    profile: '',
    token: '',
    error: ''
};

const authReducer = (state = data, action) => {
    switch(action.type) {
    case 'LOGIN_FULFILLED' : 
        // console.log(action)
        state.profile = action?.payload?.data?.profile;
        state.token = action?.payload?.data?.token;

        localStorage.setItem('profile', JSON.stringify({...action?.payload?.data}));
        return state;
    case 'LOGIN_REJECTED' : 
        state.error = action?.payload?.response?.data?.message;
        return state;

    case 'LOGIN_PENDING' : 
        return state;

    case 'OTHERS_LOGIN_FULFILLED' : 
        state.profile = action?.payload?.data?.profile;
        state.token = action?.payload?.data?.token;

        localStorage.setItem('profile', JSON.stringify({...action?.payload?.data}));
        return state;
    case 'OTHERS_LOGIN_REJECTED' : 
        state.error = action?.payload?.response?.data?.message;
        return state;

    case 'OTHERS_LOGIN_PENDING' : 
        return state;

    case 'FACEBOOK_LOGIN_FULFILLED' : 
        // console.log(action.payload.data);
        state.profile = action?.payload?.data;
        // state.token = action?.payload?.data?.token;

        // localStorage.setItem('profile', JSON.stringify({...action?.payload?.data}));
        return state;
    case 'FACEBOOK_LOGIN_REJECTED' : 
        // state.error = action?.payload?.response?.data?.message;
        return state;

    case 'FACEBOOK_LOGIN_PENDING' : 
        return state;

    case 'LOGOUT' : 
        localStorage.clear();
        state = null;
        return state;
            
    default : return state;
    }
};

export default authReducer; 