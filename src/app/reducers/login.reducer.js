import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE
} from '../constants/login.constants';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

const LoginReducer = ( (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null
            });
        case USER_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload,
                userName: jwtDecode(action.payload).username,
                statusText: 'You have been successfully logged in.'

            });
        case USER_LOGIN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                userName: null,
                statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`

            });
        default:
            return state;
    }
});

export default LoginReducer;
