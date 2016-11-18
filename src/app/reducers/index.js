import { combineReducers } from 'redux';
import user from './user';
import register from './register';
import team from './team';

const rootReducer = combineReducers({
    register,
    user,
    team
});

export default rootReducer
