import * as loginEnum from '../constants/login.constants';
import {browserHistory} from 'react-router';

export const UserLoginRequest = () => ({
    type: loginEnum.USER_LOGIN_REQUEST
});

export const UserLoginSuccess = (response) => ({
    type: loginEnum.USER_LOGIN_SUCCESS,
    payload: response
});

export const UserLoginFailed = (error) => ({
    type: loginEnum.USER_LOGIN_FAILURE,
    payload: {
        status: error.response.status
    }
});

const isValidResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
};

export const UserLogin = function (email, password) {
    return (dispatch) => {
        dispatch(UserLoginRequest());

        return fetch('http://127.0.0.1:1337/api/user/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        // .then(isValidResponse)
            .then(response => response.json())
            .then((response) => {
                if (response.success) {
                    dispatch(UserLoginSuccess(response.token));
                } else {
                    dispatch(UserLoginFailed({
                        response: {
                            status: 403,
                            statusText: response.statusText
                        }
                    }));
                }
            })
            .catch(() => {
                dispatch(UserLoginFailed({
                    response: {
                        status: 403,
                        statusText: 'Invalid token'
                    }
                }));
            });
    };
};
