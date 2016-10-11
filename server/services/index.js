import UserService from './user/index';
import InternService from './intern';

export default (app) => {
    InternService(app);
    UserService(app);
};
