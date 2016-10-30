import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_PASSWORD_RESET_SUCCESS,
    USER_PASSWORD_RESET_FAILURE,
    USER_LOGOUT
} from '../constants/user.constants';

const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

const LoginReducer = ( (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticating: true,
                statusText: null
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload,
                statusText: null
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                userName: null,
                statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`

            };

        case USER_PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                isPasswordReset: true
            };
        case USER_PASSWORD_RESET_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isAuthenticating: false
            };
        default:
            return state;
    }
});

export default LoginReducer;
