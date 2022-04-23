let data = {
    profile: '',
    token: '',
    error: '',
    message: ''
};

const authReducer = (state = data, action) => {
    switch(action.type) {
    case 'LOGIN_FULFILLED' : 
        state.profile = action?.payload?.data?.profile;
        state.token = action?.payload?.data?.token;
        state.message = action?.payload?.data?.message;

        localStorage.setItem('profile', JSON.stringify({...action?.payload?.data}));
        return state;
    case 'LOGIN_REJECTED' : 
        state.error = action?.payload?.response?.data?.message;
        return state;

    case 'LOGIN_PENDING' : 
        return state;

    case 'GOOGLE_LOGIN_FULFILLED' : 
        state.profile = action?.payload?.data?.profile;
        state.token = action?.payload?.data?.token;
        state.message = action?.payload?.data?.message;

        localStorage.setItem('profile', JSON.stringify({...action?.payload?.data}));
        return state;
    case 'GOOGLE_LOGIN_REJECTED' : 
        state.error = action?.payload?.response?.data?.message;
        return state;

    case 'GOOGLE_LOGIN_PENDING' : 
        return state;

    case 'FACEBOOK_LOGIN_FULFILLED' : 
        state.profile = action?.payload?.data?.profile;
        state.token = action?.payload?.data?.token;
        state.message = action?.payload?.data?.message;

        localStorage.setItem(
            'profile', 
            JSON.stringify({...action?.payload?.data?.profile})
        );
        return state;
    case 'FACEBOOK_LOGIN_REJECTED' : 
        state.error = action?.payload?.response?.data?.message;
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