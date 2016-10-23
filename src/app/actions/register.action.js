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
            .then(json => dispatch(UserRegisterSuccess(json)))
            .catch(UserRegisterFailed());
    }
};
