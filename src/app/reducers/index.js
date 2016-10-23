import { combineReducers } from 'redux';
import login from './login.reducer';
import register from './register';

const rootReducer = combineReducers({
    register,
    login
});

export default rootReducer
