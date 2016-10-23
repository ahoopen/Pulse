import * as RegisterEnum from '../constants/register.constants';

export const UserRegisterRequest = () => ({
    type: RegisterEnum.USER_REGISTER_REQUEST
});

export const UserRegisterSuccess = (data) => ({
    type: RegisterEnum.USER_REGISTER_COMPLETED,
    payload: data
});

export const UserRegisterFailed = (error) => ({
    type: RegisterEnum.USER_REGISTER_FAILED,
    payload: {
        status: error
    }
});

export const UserActivated = (data) => ({
    type: RegisterEnum.USER_REGISTER_ACTIVATED,
    payload: data
});

export const UserActivationFailed = (data) => ({
    type: RegisterEnum.USER_REGISTER_ACTIVATE_FAILED,
    payload: data
});

export const UserActivate = (activateCode) => {
    return (dispatch) => {

        return fetch('http://127.0.0.1:1337/api/user/activate', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({activateCode})
        })
        .then(response => response.json())
        .then((response) => {
            if (response.success) {
                dispatch(UserActivated(response));
            } else {
                dispatch(UserActivationFailed(response));
            }
        })
        .catch(json => dispatch(UserActivationFailed(json)))
    }
};


export const UserRegister = (data) => {
    return (dispatch) => {
        dispatch(UserRegisterRequest());

        return fetch('http://127.0.0.1:1337/api/user/register', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((response) => {
            response.success ? dispatch(UserRegisterSuccess(response)) : dispatch(UserRegisterFailed(response))
        })
        .catch(UserRegisterFailed());
    }
};
