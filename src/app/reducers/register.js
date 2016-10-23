import {
    USER_REGISTER_ACTIVATED,
    USER_REGISTER_ACTIVATE_FAILED
} from '../constants/register.constants';

const RegisterReducer = ( (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_ACTIVATED:
            return {
                ...state,
                errorMessage: null,
                token: action.payload.token,
            };
        case USER_REGISTER_ACTIVATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload.errorMessage

            };
        default:
            return state;
    }
});

export default RegisterReducer;
